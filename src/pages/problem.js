import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import OutputConsole from '../../components/OutputConsole';
import Header from '../../components/ProblemHeader';

// components
import LeftSidebar from '../../components/LeftSideBar';
import DifficultyChip from '../../components/DifficultyChip';
import RightSideBar from '../../components/RightSideBar';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

// mui components
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';

// mui icons
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShareIcon from '@mui/icons-material/Share';
import FlagIcon from '@mui/icons-material/Flag';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';



export default function ProblemPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [language, setLanguage] = useState('python'); // default value is Python
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allDifficulties, setAllDifficulties] = useState([]);

  // move divider refs
  const dividerRef = useRef(null);
  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);

  // mouse move event end
  const handleDividerMouseDown = (e) => {
    e.preventDefault();
    const tab = e.target;
    const leftContainer = tab.previousSibling;
    const rightContainer = tab.nextSibling;
  
    const handleMouseMove = (e) => {
      e.preventDefault();
      const { clientX } = e;
      let { left: leftLeft } = leftContainer.getBoundingClientRect();
      let { right: rightRight } = rightContainer.getBoundingClientRect();
      rightRight -= 48;
      leftLeft += 48;
      const newLeftWidth = clientX - leftLeft;
      const newRightWidth = rightRight - clientX;
    
      if (newLeftWidth < 250 || newRightWidth < 250) {
        return;
      }
      leftContainer.style.width = `${newLeftWidth}px`;
      rightContainer.style.width = `${newRightWidth}px`;
    };
  
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // fetch questions from backend
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/questions');
      const data = await res.json();
      setQuestions(data);
      setAllDifficulties(() => {
        let difficulties = [];
        data.forEach((question) => {
          if (!difficulties.includes(question.difficulty)) {
            difficulties.push(question.difficulty);
          }
        });
        return difficulties;
      })
      setLoading(false);
    }
    fetchData();
  }, []);

  // switch to next question
  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex === 0) {
        return questions.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };
  
  // switch to next question
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex === questions.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  // submit code to backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/submitCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
      if (response.ok) {
        console.log('Code submitted successfully!');
        let data = await response.json()
        setCodeOutput(data.output)
      } else {
        console.error('Failed to submit code');
      }
    } catch (error) {
      console.error('An error occurred while submitting code', error);
    }
  };

  return (
      <div className="flex h-full w-full" data-id="problem-page">
        <LeftSidebar data-id="problem-left-sidebar"></LeftSidebar>
         
        <div className="flex flex-col h-full w-full overflow-y-auto" data-id="problem-middle-section" >
          <Header difficulties={allDifficulties}></Header>

          <div className="flex h-screen" ref={leftContainerRef} data-id="problem-screen-split-container">
            <div className="grow w-1/2 border-r border-r-gray-200 max-w-full" data-id="problem-left-screen">
              <div className="flex border-b py-3 border-b-gray-200" data-id="problem-tab-selector">
                <div className="truncate bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
                  Problem
                </div>
                <div className="truncate bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
                  Submissions
                </div>
                <div className="truncate bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
                  Editorials
                </div>
              </div>

              <div className="px-3 pt-3" data-id="problem-information-container">
                  {loading ? (<Skeleton className="mb-2" width="90%"  animation="wave"/>) :
                  <div className="flex flex-rows mb-2" data-id="problem-title-container">
                      <h2 className="text-xl font-bold truncate max-w-l" data-id="problem-title">
                        {questions[currentQuestionIndex]?.title}
                      </h2>

                      <DifficultyChip 
                        difficulty={questions[currentQuestionIndex]?.difficulty} 
                        data-id="problem-difficulty"
                      />

                      <p className="font-medium truncate text-sm text-slate-500 mb-2 self-center ml-auto" data-id="problem-count">
                        Problem {currentQuestionIndex + 1}/4
                      </p>
                  </div>}

                  <div className="flex justify-between pr-2 whitespace-nowrap" data-id="problem-icons-container">
                      <div>
                        <IconButton size="small">
                          <ThumbUpAltIcon fontSize="inherit" style={{fill: '#94a3b8'}}/>
                        </IconButton>
                        <IconButton size="small">
                          <StarBorderIcon fontSize="inherit" style={{fill: '#94a3b8'}}/>
                        </IconButton>
                        <IconButton size="small">
                          <ShareIcon fontSize="inherit" style={{fill: '#94a3b8'}}/>
                        </IconButton>
                        <IconButton size="small">
                          <FlagIcon fontSize="inherit" style={{fill: '#94a3b8'}}/>
                        </IconButton>
                      </div>

                      <div data-id="problem-selector">
                        <div className="border border-slate-200 mx-2 inline-block rounded">
                          <IconButton size="small" onClick={handlePrevQuestion}>
                            <ArrowBackIosNewIcon fontSize="inherit" style={{fill: '#94a3b8'}}/>
                          </IconButton>
                        </div>
                        
                          <div className="border border-slate-200 mx-2 inline-block rounded">
                        <IconButton size="small" onClick={handleNextQuestion}>
                          <ArrowForwardIosIcon fontSize="inherit" style={{fill: '#94a3b8'}}/>
                        </IconButton>
                        </div>
                      </div>
                  </div>

                  <div className="flex flex-rows mt-2" data-id="problem-used-by-container">
                    <div className="flex flex-rows" data-id="problem-used-by-list">
                      {loading ?
                      (<React.Fragment>
                        <Skeleton animation="wave"  width={120}/>
                      </React.Fragment>) :
                      questions[currentQuestionIndex]?.usedBy.map((company, index) => {
                        if (index > 2) {
                          return null;
                        }
                        return (
                          <div className="flex flex-rows" data-id="problem-used-by-list-item">
                            <p className="font-medium opacity-80 truncate bg-sky-200 px-2 py-1 rounded text-sm text-sky-800 mx-2 self-center ml-auto hover:opacity-100" data-id="problem-used-by">
                              {company}
                            </p>
                          </div>
                        )
                      })}
                      {(questions[currentQuestionIndex]?.usedBy.length > 3) ? (
                        <p className="font-medium opacity-80 truncate bg-sky-200 px-2 py-1 rounded text-sm text-sky-800 mx-2 self-center ml-auto hover:opacity-100" data-id="problem-used-by">
                          ...
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <p className="text-gray-700 mt-4" data-id="problem-description">
                    {loading ? 
                    (<React.Fragment>
                      <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                      <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                      <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                      <Skeleton animation="wave" height={15} width="80%" />
                    </React.Fragment>) :
                    questions[currentQuestionIndex]?.description}
                  </p>

                  <h2 className="font-bold my-4" data-id="problem-input-format-header">
                    Input Format
                  </h2>

                  <p data-id="problem-input-format-sample">
                    {loading ? 
                        (
                        <React.Fragment>
                          <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                          <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                          <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                          <Skeleton animation="wave" height={15} width="80%" />
                        </React.Fragment>
                        )
                       : 
                      questions[currentQuestionIndex]?.inputFormat}
                  </p>

                  <h2 className="font-bold my-4" data-id="problem-example-header">
                    Example
                  </h2>

                  <h2 className="my-4" data-id="problem-input-header">
                    Input
                  </h2>
                  
                  {loading ?
                  (<React.Fragment>
                    <Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={15} width="60%" />
                  </React.Fragment>) :
                  <p className="text-gray-700 bg-sky-100 py-2 px-3 rounded border-solid border inline-block" data-id="problem-input-sample">
                    {questions[currentQuestionIndex]?.inputExample}
                  </p>
                  }

                  <h2 className="my-4" data-id="problem-output-header">
                    Output
                  </h2>
                  
                  {loading ?
                    (<React.Fragment>
                      <Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 6 }} />
                      <Skeleton animation="wave" height={15} width="60%" />
                    </React.Fragment>) :
                    <p className="text-gray-700 bg-sky-100 py-2 px-3 rounded border-solid border inline-block" data-id="problem-output-sample">
                      {questions[currentQuestionIndex]?.outputExample}
                    </p>
                  }
                  
                  <h2 className="font-bold my-4" data-id="problem-constraints-header">
                    Constraints
                  </h2>
                  
                  <p className="text-gray-700 mt-4" data-id="problem-constraints-sample">
                    {loading ? 
                    (<React.Fragment>
                      <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                      <Skeleton animation="wave" height={15} width="80%" />
                    </React.Fragment>) : questions[currentQuestionIndex]?.constraints}
                  </p>

              </div>
            </div>

            <div
              className="shrink-0 border border-sky-400 self-center w-0 h-16 cursor-ew-resize rounded hover:border-sky-500"
              onMouseDown={handleDividerMouseDown}
              data-id="screen-divider"
            >
            </div>

            <div className="grow w-1/2 max-w-full" ref={rightContainerRef} data-id="problem-right-screen">
              <div className="max-w-full flex py-3 border-b border-b-gray-200" data-id="friend-tab">
                  <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 truncate hover:opacity-100">
                    Me
                  </div>
                  <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 truncate hover:opacity-100">
                    Friend #1
                  </div>
                  <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 truncate hover:opacity-100">
                    Friend #2
                  </div>
                  <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 truncate hover:opacity-100">
                    Friend #3
                  </div>
                  <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 truncate hover:opacity-100">
                    Friend #4
                  </div>
              </div>

              <div className="w-full" data-id="problem-terminal">
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="w-full h-96 pl-3 pt-2 rounded-md mb-4 focus:outline-none"
                    rows="10"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                  />

                  <div className="flex justify-between border-t border-t-gray-200 py-2 px-2">

                    <FormControl variant="outlined">
                      <InputLabel>Language</InputLabel>
                      <Select
                        data-id="select-language"
                        value={language}
                        label="Lanaguage"
                        onChange={(event) => setLanguage(event.target.value)}
                      >
                        <MenuItem value="python">Python</MenuItem>
                        <MenuItem value="javascript">JavaScript</MenuItem>
                      </Select>
                    </FormControl>

                    <div className="self-center" data-id="terminal-buttons">
                      <Button className="bg-sky-200 text-sky-700 px-3 mx-1 my-auto" variant="outlined">
                        Run
                      </Button>
                      <Button className="bg-sky-600 text-white px-3 mx-1 my-auto hover:bg-sky-500" type="submit" color="primary" endIcon={<SendIcon />}>
                        Submit
                      </Button>
                    </div>
                  </div>

                </form>
                <OutputConsole codeOutput={codeOutput} onSubmit={handleSubmit} />
              </div>
            </div>

          </div>
        </div>
        
        <RightSideBar/>
      </div>
  );
}
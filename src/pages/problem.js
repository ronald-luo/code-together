import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OutputConsole from '../../components/OutputConsole';
import Header from '../../components/ProblemHeader';

// components
import LeftSidebar from '../../components/LeftSideBar';
import DifficultyChip from '../../components/DifficultyChip';

// mui components
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// mui icons
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShareIcon from '@mui/icons-material/Share';
import FlagIcon from '@mui/icons-material/Flag';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';


export default function ProblemPage() {
  const router = useRouter();

  const [code, setCode] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [language, setLanguage] = useState('python'); // default value is Python
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/questions');
      const data = await res.json();
      setQuestions(data);
    }
    fetchData();
  }, []);

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex === 0) {
        return questions.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };
  
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex === questions.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

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
      <div className="flex h-full w-full">
        <LeftSidebar data-id="problem-left-sidebar"></LeftSidebar>
         
        <div className="flex flex-col h-full w-full" data-id="problem-middle-section">
          <Header></Header>

          <div className="flex h-full" data-id="problem-screen-split-container">
            <div className="border-r border-r-gray-200 w-full" data-id="problem-left-screen">
              <div className="flex border-b py-3 border-b-gray-200" data-id="problem-tab-selector">
                <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
                  Problem
                </div>
                <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
                  Submissions
                </div>
                <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
                  Editorials
                </div>
              </div>

              <div className="px-3 pt-3" data-id="problem-information-container">
                  <div className="flex flex-rows" data-id="problem-title-container">
                      <h2 className="text-xl font-bold mb-2" data-id="problem-title">
                        {questions[currentQuestionIndex]?.title}
                      </h2>

                      <DifficultyChip 
                        difficulty={questions[currentQuestionIndex]?.difficulty} 
                        data-id="problem-difficulty"
                      />

                      <p className="font-medium text-sm text-slate-500 mb-2 self-center ml-auto" data-id="problem-count">
                        Problem {currentQuestionIndex + 1}/4
                      </p>
                  </div>

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
                        <IconButton size="small" onClick={handlePrevQuestion}>
                          <ArrowBackIosIcon fontSize="inherit" style={{fill: '#94a3b8'}}/>
                        </IconButton>
                        <IconButton size="small" onClick={handleNextQuestion}>
                          <ArrowForwardIosIcon fontSize="inherit" style={{fill: '#94a3b8'}}/>
                        </IconButton>
                      </div>
                  </div>

                  <p className="text-gray-700 mt-4" data-id="problem-description">
                    {questions[currentQuestionIndex]?.description}
                  </p>

                  <h2 className="font-bold my-4" data-id="problem-input-format-header">
                    Input Format
                  </h2>

                  <p data-id="problem-input-format-sample">
                    {questions[currentQuestionIndex]?.inputFormat}
                  </p>

                  <h2 className="font-bold my-4" data-id="problem-example-header">
                    Example
                  </h2>

                  <h2 className="my-4" data-id="problem-input-header">
                    Input
                  </h2>

                  <p className="text-gray-700 bg-sky-100 py-2 px-3 rounded border-solid border inline-block" data-id="problem-input-sample">
                    {questions[currentQuestionIndex]?.inputExample}
                  </p>

                  <h2 className="my-4" data-id="problem-output-header">
                    Output
                  </h2>

                  <p className="text-gray-700 bg-sky-100 py-2 px-3 rounded border-solid border inline-block" data-id="problem-output-sample">
                    {questions[currentQuestionIndex]?.outputExample}
                  </p>
                  
                  <h2 className="font-bold my-4" data-id="problem-constraints-header">
                    Constraints
                  </h2>


                  <p className="text-gray-700 mt-4" data-id="problem-constraints-sample">
                    {questions[currentQuestionIndex]?.constraints}  
                  </p>

              </div>
            </div>

            <div className="w-full" data-id="problem-right-screen">
              <div className="flex py-3 border-b border-b-gray-200" data-id="friend-tab">
                  <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
                    Me
                  </div>
                  <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
                    Friend #1
                  </div>
                  <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
                    Friend #2
                  </div>
                  <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
                    Friend #3
                  </div>
                  <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
                    Friend #4
                  </div>
              </div>

              <div data-id="problem-terminal">
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="w-full h-96 pl-3 pt-2 rounded-md mb-4 focus:outline-none"
                    rows="10"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                  />

                  <div className="flex justify-between border-t border-t-gray-200 py-2 px-2">
                    <select
                      id="language"
                      value={language}
                      onChange={(event) => setLanguage(event.target.value)}
                      className="border border-gray-400 rounded-md my-auto"
                      >
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                    </select> 

                    <div data-id="terminal-buttons">
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

        <div className="flex w-20 border-l border-l-gray-200" data-id="problem-right-sidebar">
          {/* <ChatBubbleIcon/> */}
        </div>
      </div>
  );
}
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import OutputConsole from '../../components/OutputConsole';
import Header from '../../components/ProblemHeader';
import LeftSidebar from '../../components/LeftSideBar';

export default function ProblemPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [language, setLanguage] = useState('python'); // default value is Python

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
    <div className="flex">
      <LeftSidebar></LeftSidebar>
      <div className="w-full">
        <Header></Header>
        <div className="flex w-auto h-auto">
          
          <div className="border-r border-r-gray-200 h-96">

            <div className="flex border-b py-3 border-b-gray-200">
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

            <div className="pl-3 pt-3">
              <h1 className="text-2xl font-bold mb-2">
                Problem Statement
              </h1>
              <p className="text-gray-700">
                Here is the problem statement...
              </p>
            </div>
          </div>

          <div className="w-full h-full border-r border-r-gray-200">

            <div className="flex py-3 border-b border-b-gray-200">
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

            <div className="h-full">
              <form onSubmit={handleSubmit} className="h-full">
                <textarea
                  className="w-full pl-3 pt-2 rounded-md mb-4"
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

                  <button type="submit" className="bg-sky-200 text-sky-700 font-medium rounded-md py-1 px-3 my-auto mx-1 opacity-80 hover:opacity-100">
                    Run
                  </button>
                </div>
              </form>
              <OutputConsole codeOutput={codeOutput} onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
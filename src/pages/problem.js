import React, { useState } from 'react';
import { useRouter } from 'next/router';
import OutputConsole from '../../components/OutputConsole';
import Header from '../../components/Header';
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
    <div className="mx-auto">
    <Header></Header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Problem Statement</h1>
          <p className="text-gray-700">Here is the problem statement...</p>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">Write your code here</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="language" className="mr-2">
                Programming language:
                </label>
                <select
                id="language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="border border-gray-400 rounded-md mb-4"
                >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                </select>
            <textarea
              className="w-full px-3 py-2 border border-gray-400 rounded-md mb-4"
              rows="10"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </form>
          <OutputConsole codeOutput={codeOutput} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
    </div>
  );
}
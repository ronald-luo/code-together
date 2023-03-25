import React, { useState } from 'react';

const OutputConsole = ({ codeOutput, onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(input);
  };

  return (
    <div className="bg-white-200 p-4 flex flex-col justify-start items-start">
      <label className="text-black-400 font-medium mb-2">Stdout:</label>
      <textarea
        className="w-full h-32 bg-slate-100 text-black focus:outline-none rounded p-2 mb-4"
        value={codeOutput}
        readOnly
      />
      <form onSubmit={handleSubmit} className="w-full">
        {/* <label className="text-gray-400">Input:</label> */}
        {/* <input
          className="w-full h-8 bg-gray-700 text-white p-2 mb-4"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        /> */}
        {/* <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default OutputConsole;

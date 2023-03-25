import React from 'react';
import BackArrow from './svgs/BackArrow';

const Header = () => {
  return (
    <header className="flex px-2 sm:px-4 lg:px-4 max-h-20 bg-white-800 py-3 justify-between border-b border-b-gray-200">

        {/* <BackArrow className="w-15 h-15 hover:cursor-pointer my-auto fill-zinc-400"/> */}

        <h1 className="text-xl font-bold text-slate-800 mr-5 my-auto">
          Array of Hope
        </h1>

        <div className="flex">
          <div className="bg-emerald-200 text-cyan-700 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 opacity-75 hover:opacity-100">
            easy
          </div>

          <div className="bg-orange-200 text-orange-700 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 opacity-75 hover:opacity-100">
            medium
          </div>

          <div className="bg-rose-200 text-rose-700 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 opacity-75 hover:opacity-100">
            hard
          </div>
        </div>

        <div className="bg-slate-200 text-slate-500 text-sm font-bold rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
          5 Players 
        </div>

        <div className="bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 ml-5 opacity-80 hover:opacity-100">
          Invite
        </div>

        <div className="rounded-md border-2 py-1 text-sm px-3 font-medium border-gray-300">
          28:12
        </div>

    </header>
  );
};

export default Header;
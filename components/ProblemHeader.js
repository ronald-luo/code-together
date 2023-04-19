import React from 'react';
import DifficultyChip from './DifficultyChip';

// mui icons
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TimerIcon from '@mui/icons-material/Timer';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';



const Header = ({difficulties}) => {
  return (
    <header className="flex flex-row px-2 sm:px-4 lg:px-4 max-h-20 bg-white-800 py-3 justify-between border-b border-b-gray-200">       
        <div className="flex flex-row" data-id="left">
          <IconButton href="/" className="mr-4">
            <KeyboardBackspaceIcon/>
          </IconButton>

          <h1 className="text-xl truncate font-bold text-slate-800 self-center">
            Array of Hope
          </h1>

          <div className="self-center truncate mx-3">
            {difficulties.map((difficulty, index) => {
              return (
                <DifficultyChip key={index} difficulty={difficulty}/>
              )
            })}
          </div>

          <div className="truncate text-slate-400 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 opacity-80 hover:opacity-100">
            5 Players 
          </div>
        </div>

        <div className="flex flex-row" data-id="right">
          <div className="mx-2 bg-blue-200 text-blue-800 text-sm font-medium rounded-md py-1 px-3 my-auto mx-1 opacity-80 hover:opacity-100">
            Invite
          </div>

          <div className="mx-2 rounded-md border py-2 text-sm px-3 border-gray-300">
            <TimerIcon style={{ color: '#6b7280'}}/>
            28:12
          </div>

          <IconButton className="mx-2">
            <MoreVertIcon className="self-center"/>
          </IconButton>
        </div>
        
    </header>
  );
};

export default Header;
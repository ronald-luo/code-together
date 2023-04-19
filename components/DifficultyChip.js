import React from 'react';

import Chip from '@mui/material/Chip';

const DifficultyChip = ({difficulty}) => {
    if (difficulty === 'Hard') {
        return (
            <Chip className="opacity-75 truncate font-bold bg-rose-300 text-rose-700 ml-3 mr-2 self-center hover:cursor-pointer hover:opacity-100 lowercase" label="hard"/>
        );
    }
    if (difficulty === 'Medium') {
        return (
            <Chip className="opacity-75 truncate font-bold bg-orange-300 text-orange-700 ml-3 mr-2 self-center hover:cursor-pointer hover:opacity-100 lowercase" label="medium"/>
        );
    }
    if (difficulty === 'Easy') {
        return (
            <Chip className="opacity-75 truncate font-bold bg-emerald-200 text-cyan-700 ml-3 mr-2 self-center hover:cursor-pointer hover:opacity-100 lowercase" label="easy"/>
        );
    }
};

export default DifficultyChip;

import React from 'react';

import Chip from '@mui/material/Chip';

const DifficultyChip = ({difficulty}) => {
    console.log(difficulty)
    if (difficulty === 'Hard') {
        return (
            <Chip className="opacity-75 font-bold bg-rose-300 text-rose-700 ml-3 mr-2 self-center hover:opacity-100" label="hard"/>
        );
    }
    if (difficulty === 'Medium') {
        return (
            <Chip className="opacity-75 font-bold bg-orange-300 text-orange-700 ml-3 mr-2 self-center hover:opacity-100" label="medium"/>
        );
    }
    if (difficulty === 'Easy') {
        return (
            <Chip className="opacity-75 font-bold bg-emerald-200 text-cyan-700 ml-3 mr-2 self-center hover:opacity-100" label="easy"/>
        );
    }
};

export default DifficultyChip;

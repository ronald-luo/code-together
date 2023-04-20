import React from 'react';
import Chip from '@mui/material/Chip';

const DifficultyChip = ({difficulty}) => {
    if (difficulty === 'Hard') {
        return (
            <Chip className="opacity-75 truncate font-bold bg-rose-300 text-rose-700 self-center hover:cursor-pointer hover:opacity-100 lowercase row-start-2" label="hard"/>
        );
    }
    if (difficulty === 'Medium') {
        return (
            <Chip className="opacity-75 truncate font-bold bg-orange-300 text-orange-700 self-center hover:cursor-pointer hover:opacity-100 lowercase row-start-2 " label="medium"/>
        );
    }
    if (difficulty === 'Easy') {
        return (
            <Chip className="opacity-75 truncate font-bold bg-emerald-200 text-cyan-700 self-center hover:cursor-pointer hover:opacity-100 lowercase row-start-2" label="easy"/>
        );
    }
};

export default DifficultyChip;

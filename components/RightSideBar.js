import React, { useState, useEffect } from 'react';

// mui components
import IconButton from '@mui/material/IconButton';

// mui icons
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const RightSideBar = () => {
    return (
        <div className="flex flex-col py-6 justify-center items-center w-20 border-l border-l-gray-200" data-id="problem-right-sidebar">
            <IconButton>
                <KeyboardDoubleArrowLeftIcon/>
            </IconButton>
            
            <IconButton className="align-auto hover:bg-emerald-100 my-1">
                <ChatBubbleIcon className="fill-sky-500 m-1 hover:fill-sky-600"/>
            </IconButton>  
        </div>
    )
}

export default RightSideBar;
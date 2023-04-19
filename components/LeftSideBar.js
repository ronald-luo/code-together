import React from 'react';
import Image from 'next/image';

// mui components
import IconButton from '@mui/material/IconButton';

// mui icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CommentIcon from '@mui/icons-material/Comment';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RocketIcon from '@mui/icons-material/Rocket';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const LeftSidebar = () => {
  return (
    <div className="flex flex-col h-screen w-16 border-r border-b-gray-200">
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* <p className="text-gray-500">Left Sidebar Content</p> */}
        <IconButton className="hover:bg-sky-100 my-1">
          <AddCircleIcon className="fill-slate-400"/>
        </IconButton>
        
        <IconButton className="hover:bg-sky-100 my-1">
          <CommentIcon className="fill-slate-400"/>
        </IconButton>
        
        <IconButton className="hover:bg-sky-100 my-1">
          <NoteAddIcon className="fill-slate-400"/>
        </IconButton>
        
        <IconButton className="hover:bg-sky-100 my-1">
          <EmojiEventsIcon className="fill-slate-400"/>
        </IconButton>

        <IconButton className="hover:bg-sky-100 my-1">
          <RocketIcon className="fill-slate-400"/>
        </IconButton>

        <IconButton className="hover:bg-sky-100 my-1">
          <BookmarksIcon className="fill-slate-400"/>
        </IconButton>
      </div>
    </div>
  );
};

export default LeftSidebar;

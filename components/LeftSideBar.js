import React from 'react';
import Image from 'next/image';

const LeftSidebar = () => {
  return (
    <div className="flex flex-col h-screen w-1/5 bg-gray-100">
      <div className="h-16 flex items-center justify-center">
        {/* <Image src="/logo.png" alt="LeetCode Logo" height={32} width={32} /> */}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-gray-500">Left Sidebar Content</p>
      </div>
    </div>
  );
};

export default LeftSidebar;

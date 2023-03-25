import React from 'react';

function BackArrow(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M20.3 11H7.7l3.3-3.3a1 1 0 0 0-1.4-1.4l-5 5a1 1 0 0 0 0 1.4l5 5a1 1 0 0 0 1.4-1.4L7.7 13h12.6a1 1 0 0 0 0-2z"/>
    </svg>
  );
}

export default BackArrow;
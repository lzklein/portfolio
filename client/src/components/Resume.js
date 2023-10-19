import React, { useEffect } from 'react';
import MyResume from "../Resume.pdf";

const Resume = () => {

  // later attach this to "about" page
  return (
    <div>
        <a href={MyResume} target="_blank"
            rel="noreferrer">
            Resume
        </a> 
    </div>
  );
}

export default Resume;

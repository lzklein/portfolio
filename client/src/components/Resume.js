import React, { useEffect } from 'react';
import MyResume from "../Resume.pdf";

const Resume = () => {

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

import React from 'react';
import MyResume from "../Resume.pdf";

const Resume = () => {
  // later attach this to "about" page
  return (
    <div>
        <embed src={MyResume} type="application/pdf" width="75%" height="1000px" />

        <a href={MyResume} target="_blank"
            rel="noreferrer">
            Resume
        </a> 
    </div>
  );
}

export default Resume;

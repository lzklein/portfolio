import React from 'react'
import MyResume from "../assets/files/Resume.pdf";
import JavaCert from '../assets/files/JavaCert.pdf'
import { useIsMobile } from '../hooks/useIsMobile';

const Resume = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
  return (
    <div className="page">
      <p>Download or view my resume:</p>
      <a 
        href={MyResume} 
        target="_blank" 
        rel="noopener noreferrer"
        className="download-link"
      >
        Open Resume
      </a>
    </div>
  );
}

  return (
    <div className="page">
        <h2>Resume</h2>
        <embed src={MyResume} type="application/pdf" width="75%" height="1100px" />
        <h1>Certifications</h1>
        <embed src={JavaCert} type="application/pdf" width="75%" height="700px"/>
    </div>
  )
}

export default Resume
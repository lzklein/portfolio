import React from 'react'
import MyResume from "../assets/files/Resume.pdf";
import JavaCert from '../assets/files/JavaCert.pdf'
const Resume = () => {
  return (
    <div className="resume-page">
        <h2>Resume</h2>
        <embed src={MyResume} type="application/pdf" width="75%" height="1100px" />
        <h1>Certifications</h1>
        <embed src={JavaCert} type="application/pdf" width="75%" height="700px"/>
    </div>
  )
}

export default Resume
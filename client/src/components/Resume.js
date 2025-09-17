import React from 'react'
import MyResume from "../files/Resume.pdf";
import JavaCert from '../files/JavaCert.pdf'
const Resume = () => {
  return (
    <div>
        <h1>Resume</h1>
        <embed src={MyResume} type="application/pdf" width="75%" height="1100px" />
        <h1>Certifications</h1>
        <embed src={JavaCert} type="application/pdf" width="75%" height="700px"/>
    </div>
  )
}

export default Resume
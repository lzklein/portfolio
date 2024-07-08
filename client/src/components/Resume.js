import React from 'react'
import MyResume from "../Resume.pdf";

const Resume = () => {
  return (
    <div>
        <h1>Resume</h1>
        <embed src={MyResume} type="application/pdf" width="75%" height="1000px" />
    </div>
  )
}

export default Resume
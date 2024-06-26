import React from 'react'

// favicon icons
import linkedinIcon from '../favicons/linkedin.png';
import githubIcon from '../favicons/github.png';
import emailIcon from '../favicons/email.png';

const Links = () => {
  // maybe favicon images instead of text links
  return (
    <div>
      <a href="https://www.linkedin.com/in/louis-klein-audio/" target="_blank" rel="noreferrer">
        <img src={linkedinIcon} alt="LinkedIn" className='favicon'/>
      </a>
      <a href="https://github.com/lzklein" target="_blank" rel="noreferrer">
        <img src={githubIcon} alt="GitHub"  className='favicon'/>
      </a>
      <a href="mailto:louisklein71@gmail.com" target="_blank" rel="noreferrer">
        <img src={emailIcon} alt="Email"  className='favicon'/>
      </a>
    </div>

    // <div>
    // <a href="https://www.linkedin.com/in/louis-klein-audio/" target="_blank" rel="noreferrer" className='contact-link'>LinkedIn</a>
    // <a href="https://github.com/lzklein" target="_blank" rel="noreferrer" className='contact-link'>GitHub</a>
    // <a href="mailto:louisklein71@gmail.com" target="_blank" rel="noreferrer" className='contact-link'>Send Email</a>
    // </div>
  )
}

export default Links
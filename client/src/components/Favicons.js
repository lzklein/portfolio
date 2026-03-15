import React from 'react'

// favicon icons
import linkedinIcon from '../assets/favicons/linkedin.png';
import githubIcon from '../assets/favicons/github.png';
import emailIcon from '../assets/favicons/email.png';

const Favicons = () => {
  //! add bg color or white outline or something, cant see against dark bg
  return (
    <div>
      <a href="https://www.linkedin.com/in/louis-klein-audio/" target="_blank" rel="noreferrer" className='icon-container'>
        <img src={linkedinIcon} alt="LinkedIn" className='favicon'/>
      </a>
      <a href="https://github.com/lzklein" target="_blank" rel="noreferrer" className='icon-container'>
        <img src={githubIcon} alt="GitHub"  className='favicon'/>
      </a>
      <a href="mailto:louisklein71@gmail.com" target="_blank" rel="noreferrer" className='icon-container'>
        <img src={emailIcon} alt="Email"  className='favicon'/>
      </a>
    </div>
  )
}

export default Favicons
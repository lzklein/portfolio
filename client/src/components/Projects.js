import React from 'react'
import DiscordBot from '../images/Wangusbot.png';
// maybe add arcade easter egg here
// have side nav thing to jump around the page with project name, https://brittanychiang.com/ like this thing
// 3d effect, put projects in cards and hover moves card forward?
const projects = () => {

  return (
    <div>
      <h1>Projects</h1>
      <div className='project-card'>
        <h2>SmokePlus Online Storefront</h2>
        <a href="https://smokeplus.onrender.com/" target="_blank" rel="noreferrer">https://smokeplus.onrender.com/</a>
        {/* replace a with screenshot image, links to site */}
        <ul>
          <li>ReactJS ExpressJS</li>
        </ul>
        {/* 3 bullet points of site function, technology used */}
        {/* maybe technology used as separate thing */}
        {/* hard code or auto components? */}
      </div>
      <div  className='project-card'>
        <h2>WangusBot</h2>
        <img src={DiscordBot}/>
        <p>Discord Music Bot</p>
        <p>Downloads and plays audio via Youtube link</p>
        <p>DiscordJS</p>
      </div>
    </div>
  )
}

export default projects
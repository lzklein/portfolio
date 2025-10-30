import React from 'react'
import DiscordBot from '../images/Wangusbot.png';
import DiscordBot2 from '../images/Wangusbot-2.png';
import Smokeplus from '../images/Smokeplus.png';
import PlaylistCrusader from '../images/PlaylistCrusader.png';

// have side nav thing to jump around the page with project name, https://brittanychiang.com/ like this thing
// 3d effect, put projects in cards and hover moves card forward?
const projects = () => {

  return (
    <div>
      <h1>Projects</h1>
      <div className='project-card'>
        <h2>Playlist Crusader</h2>
        <img src={PlaylistCrusader} style={{maxWidth:"60%"}}/>
        <h4>ReactJS - Java</h4>
        <p>Music Playlist Social Platform</p>
        <p>Fully customizeable playlists to share with 'like' functionality</p>
      </div>
      <div className='project-card'>
        <h2>SmokePlus Online Storefront</h2>
        <a href="https://smokeplus.onrender.com/" target="_blank" rel="noreferrer">
          <img src={Smokeplus} style={{width:'800px'}}/>
        </a>
        <h4>ReactJS - ExpressJS</h4>
        <p>Set up pickup orders</p>
        <p>Manage inventory as an employee</p>
        {/* 3 bullet points of site function, technology used */}
        {/* maybe technology used as separate thing */}
        {/* hard code or auto components? */}
      </div>
      <div  className='project-card'>
        <h2>WangusBot</h2>
        <img src={DiscordBot}/> 
        <br/>
        <img src={DiscordBot2} style={{maxWidth:"50%"}}/>
        <h4>DiscordJS</h4>
        <p>Discord Music Bot</p>
        <p>Downloads and plays audio via Youtube link</p>
      </div>
    </div>
  )
}

export default projects
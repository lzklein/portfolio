import React from 'react'
import Navbar from './Navbar'
import  Game from '../games/Game.js';

const home = () => {
  // navbar on left vertical => update with scroll?
  return (
    <div>
      <Navbar/>
      Home
      <Game/>
    </div>
  )
}

export default home
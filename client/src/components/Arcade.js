import React from 'react'
import  Game from '../games/Game.js';

const Arcade = () => {
    const done = false;

  return (
    <div>

        {done? <Game/> : null}

    </div>
  )
}

export default Arcade
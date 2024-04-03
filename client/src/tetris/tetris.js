import React from 'react'
import {useGameOver} from '../hooks/useGameOver';

const tetris = () => {
    // plan:
    // main page: name and title (Louis Klein - Software Engineer)
    // letters clickable => click letters to spell T E T R I S to engage tetris mode
    // include hint somewhere somehow of this

    const [gameOver, setGameOver, resetGameOver] = useGameOver();

  return (
    <div>tetris</div>
  )
}

export default tetris
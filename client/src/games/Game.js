import React from 'react';
import { useGameOver } from '../hooks/useGameOver';
import Tetris from './Tetris/Tetris.js';
import Menu from './Tetris/Menu.js';

const Game = () => {
    // plan:
    // main page: name and title (Louis Klein - Software Engineer)
    // letters clickable => click letters to spell T E T R I S to engage tetris mode
    // include hint somewhere somehow of this

    const [gameOver, setGameOver, resetGameOver] = useGameOver();

    const start = () => {
        resetGameOver();
    };

    return (
        <div className="Game">
            {gameOver ?
             <Menu start={start}/> 
             : <Tetris rows={10} columns={20} setGameOver={setGameOver} />}
        </div>
    );
};

export default Game;

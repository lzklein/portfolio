import React from 'react';
import Board from './Board.js';
import useBoard from '../../hooks/useBoard.js';
import GameStats from '../GameStats.js';

const Tetris = ({ rows, columns, setGameOver }) => {
    const [board, setBoard] = useBoard({ rows, columns });

    return (
        <div className='Tetris'>
            <Board board={board} /> 
            <GameStats gameStats={gameStats}/>
        </div>
    );
};

export default Tetris;
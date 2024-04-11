import React from 'react';
import Board from './Board.js';
import useBoard from '../../hooks/useBoard.js'; 
import GameStats from '../GameStats.js';
import {useGameStats} from '../../hooks/useGameStats.js';
import Previews from './Previews.js';

const Tetris = ({ rows, columns, setGameOver }) => {
    const [board, setBoard] = useBoard({ rows, columns });
    const [gameStats, addLinesCleared] = useGameStats();
    const player = {tetrominoes: []}
    return (
        <div className='Tetris'>
            <GameStats gameStats={gameStats}/>
            <Board board={board} /> 
            <Previews shapes = {player.tetrominoes}/>
        </div>
    );
};

export default Tetris;
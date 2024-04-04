import React from 'react';
import Board from './Board.js';
import useBoard from '../../hooks/useBoard.js'; 

const Tetris = ({ rows, columns, setGameOver }) => {
    const [board, setBoard] = useBoard({ rows, columns });

    return (
        <div>
            <Board board={board} /> 
        </div>
    );
};

export default Tetris;
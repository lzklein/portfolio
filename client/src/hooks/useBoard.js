import { useState } from 'react';
import { buildBoard } from '../Business/Board.js';

export const useBoard = ({ rows, columns }) => {
    const [board, setBoard] = useState(buildBoard({ rows, columns }));

    return [board, setBoard];
};

export default useBoard;
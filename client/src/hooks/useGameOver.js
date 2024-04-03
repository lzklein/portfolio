import {useState} from 'react';

export const useGameOver = () => {
    const [gameOver, setGameOver] = useState(true);

    const resetGameOver = useCallBack(() => {
        setGameOver(false);
    });

    return [gameOver, setGameOver, resetGameOver];
}
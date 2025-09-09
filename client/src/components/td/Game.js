import { useRef, useEffect } from "react";
import boardImg from "./assets/sprites/board.png";

export default function Game() {
  const canvasRef = useRef(null);
  const tileSize = 32; //? 32x32 tilesize, 17x11 board, 544x352px total

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load the board background
    const board = new Image();
    board.src = boardImg;
    board.onload = () => {
      ctx.imageSmoothingEnabled = false; // keep pixel look
      ctx.drawImage(board, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1088} // 17 * 32 * 2
      height={704} // 11 * 32 * 2
      style={{
        border: "2px solid black",
        imageRendering: "pixelated",
      }}
    />
  );
}

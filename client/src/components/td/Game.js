import { useRef, useEffect, useState } from "react";
import boardImg from "./assets/sprites/board.png";
import impSheet from "./assets/sprites/imp-1-sheet.png";

export default function Game() {
  const canvasRef = useRef(null);
  const [entities, setEntities] = useState([]);

  const tileSize = 32;
  const impFrameSize = 16;
  const impFrameCount = 4;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const board = new Image();
    board.src = boardImg;

    const impImg = new Image();
    impImg.src = impSheet;

    let lastTime = 0;
    let frameIndex = 0;

    function gameLoop(timestamp) {
      const delta = timestamp - lastTime;

      // Update frame index every 200ms
      if (delta > 200) {
        frameIndex = (frameIndex + 1) % impFrameCount;
        lastTime = timestamp;
      }

      // Draw board
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(board, 0, 0, canvas.width, canvas.height);

      // Draw entities
      entities.forEach((e) => {
        // advance position
        e.y += e.speed;

        // draw correct frame
        ctx.drawImage(
          impImg,
          frameIndex * impFrameSize, // source x
          0,                         // source y
          impFrameSize,
          impFrameSize,
          e.x,
          e.y,
          impFrameSize,
          impFrameSize
        );
      });

      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
  }, [entities]);

  // Spawn handler
  function spawnImp() {
    setEntities((prev) => [
      ...prev,
      { x: 264, y: 0, speed: 1 } // spawns left side, middle row
    ]);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={spawnImp}
        style={{ marginBottom: 10, padding: "6px 12px" }}
      >
        Spawn Imp
      </button>
      <br />
      <canvas
        ref={canvasRef}
        width={544} // 17 x 32
        height={352} // 11 x 32
        style={{
          border: "2px solid black",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

import { useRef, useEffect, useState } from "react";
import boardImg from "./assets/sprites/board.png";
import impSheet from "./assets/sprites/imp-1-sheet.png";
import hpImgSrc from "./assets/sprites/hp.png";

// Global Variables
const SPEED = 0.5; // base speed
const TILE_SIZE = 64; //all doubled
const START_X = 528;  
const START_Y = 60;  
const GOAL_X = 528;  
const GOAL_Y = 620; 
const INITIAL_HEALTH = 100;

export default function Game() {
  const canvasRef = useRef(null);
  const entitiesRef = useRef([]);
  const nextId = useRef(0);

  const impFrameSize = 16; //! must be 16
  const impFrameCount = 4;

  const healthRef = useRef(INITIAL_HEALTH); // hp tracker
  const [healthPoints, setHealthPoints] = useState(INITIAL_HEALTH);

  // --- BFS Pathfinding ---
  function findPath(grid, start, goal) {
    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0],
    ];

    const queue = [[start]];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    visited[start[1]][start[0]] = true;

    while (queue.length > 0) {
      const path = queue.shift();
      const [x, y] = path[path.length - 1];

      if (x === goal[0] && y === goal[1]) return path;

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < cols &&
          ny >= 0 &&
          ny < rows &&
          grid[ny][nx] === 0 &&
          !visited[ny][nx]
        ) {
          visited[ny][nx] = true;
          queue.push([...path, [nx, ny]]);
        }
      }
    }

    return null;
  }

  // --- Game Loop ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const board = new Image();
    board.src = boardImg;

    const impImg = new Image();
    impImg.src = impSheet;

    const hpImg = new Image();
    hpImg.src = hpImgSrc;

    let lastTime = performance.now();
    let frameIndex = 0;
    let animTimer = 0;

    function gameLoop(timestamp) {
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      animTimer += delta;
      if (animTimer > 200) {
        frameIndex = (frameIndex + 1) % impFrameCount;
        animTimer = 0;
      }

      // Draw board
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(board, 0, 0, canvas.width, canvas.height);

      // Draw HP icon and text
      const hpX = START_X + TILE_SIZE + 330;
      const hpY = START_Y - 52;
      const hpWidth = 32 * 2;
      const hpHeight = 24 * 2;
      ctx.drawImage(hpImg, hpX, hpY, hpWidth, hpHeight);
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText(healthPoints, hpX + hpWidth + 10, hpY + hpHeight - 8);

      // Update + draw entities
      entitiesRef.current.forEach((e) => {
        if (e.path && e.path.length > 0) {
          const [tx, ty] = e.path[0];
          const targetX = tx * TILE_SIZE + TILE_SIZE / 2 - impFrameSize / 2;
          const targetY = ty * TILE_SIZE + TILE_SIZE / 2 - impFrameSize / 2;

          const dx = targetX - e.x;
          const dy = targetY - e.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 1) {
            e.path.shift();
          } else {
            e.x += (dx / dist) * e.speed * SPEED * (delta / 16);
            e.y += (dy / dist) * e.speed * SPEED * (delta / 16);
          }
        }

        // --- Enemy Shake ---
        const baseShake = 3;
        const jitter = 1;
        const offsetX = Math.sin(timestamp / 80 + e.id * 0.7) * baseShake + (Math.random() * jitter - jitter/2);
        const offsetY = Math.cos(timestamp / 90 + e.id * 1.3) * baseShake + (Math.random() * jitter - jitter/2);

        ctx.drawImage(
          impImg,
          frameIndex * impFrameSize,
          0,
          impFrameSize,
          impFrameSize,
          e.x + offsetX,
          e.y + offsetY,
          impFrameSize * 2,
          impFrameSize * 2
        );

        // --- Player Damage ---
        if (e.path.length === 0) { 
          const now = Date.now();
          if (!e.lastDamageTime) e.lastDamageTime = now;
          if (now - e.lastDamageTime >= 1000) {
            healthRef.current = Math.max(healthRef.current - 1, 0);
            e.lastDamageTime = now;
          }
        }
      });

      // Update on hp change
      if (healthPoints !== healthRef.current) {
        setHealthPoints(healthRef.current);
      }

      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
  }, [healthPoints]);

  // --- Spawn handler ---
  function spawnImp() {
    const id = nextId.current++;

    const canvas = canvasRef.current;
    const GRID_COLS = Math.floor(canvas.width / TILE_SIZE);
    const GRID_ROWS = Math.floor(canvas.height / TILE_SIZE);
    const grid = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(0));

    const startTile = [Math.floor(START_X / TILE_SIZE), Math.floor(START_Y / TILE_SIZE)];
    const goalTile = [Math.floor(GOAL_X / TILE_SIZE), Math.floor(GOAL_Y / TILE_SIZE)];
    const path = findPath(grid, startTile, goalTile);

    const startPosX = startTile[0] * TILE_SIZE + TILE_SIZE / 2 - impFrameSize / 2;
    const startPosY = startTile[1] * TILE_SIZE + TILE_SIZE / 2 - impFrameSize / 2;

    entitiesRef.current.push({
      id,
      x: startPosX,
      y: startPosY,
      speed: 1,
      path: path ? path.slice(1) : [],
    });
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
        width={1088}
        height={704}
        style={{
          border: "2px solid black",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

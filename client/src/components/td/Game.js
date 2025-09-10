import { useRef, useEffect, useState } from "react";
import boardImg from "./assets/sprites/board.png";
import impSheet from "./assets/sprites/imp-1-sheet.png";
import hpImgSrc from "./assets/sprites/hp.png";
import wallImgSrc from "./assets/sprites/wall.png";
import connectLRImgSrc from "./assets/sprites/connect-lr.png";
import connectUDImgSrc from "./assets/sprites/connect-ud.png";
import connectDLImgSrc from "./assets/sprites/connect-dl.png";

const SPEED = 0.5;
const TILE_SIZE = 64;
const INITIAL_HEALTH = 100;

const INITIAL_GRID = [
  [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
];

const NO_BUILD_TILES = [
  [8, 0],   // entrance
  [8, 1],   // tile just below entrance
  [8, 9],   // tile just above exit
  [8, 10],  // exit
];

const START_TILE = [8, 0];  // entrance in grid
const GOAL_TILE = [8, 10];  // exit in grid

export default function Game() {
  const canvasRef = useRef(null);
  const entitiesRef = useRef([]);
  const nextId = useRef(0);
  const wallsRef = useRef([]);

  const impFrameSize = 16;
  const impFrameCount = 4;

  const healthRef = useRef(INITIAL_HEALTH);
  const [placeWallMode, setPlaceWallMode] = useState(false);
  const [demolishMode, setDemolishMode] = useState(false);
  const [walls, setWalls] = useState([]);

  function findPath(grid, start, goal) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
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

    const wallImg = new Image();
    wallImg.src = wallImgSrc;

    const connectLR = new Image();
    connectLR.src = connectLRImgSrc;

    const connectUD = new Image();
    connectUD.src = connectUDImgSrc;

    const connectDL = new Image();
    connectDL.src = connectDLImgSrc;

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

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(board, 0, 0, canvas.width, canvas.height);

      // --- Draw HP ---
      const hpX = canvas.width - 150; 
      const hpY = 10;
      ctx.drawImage(hpImg, hpX, hpY, 64, 48);
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText(healthRef.current, hpX + 74, hpY + 40);

      const scale = 2;

      // --- Draw walls and connectors ---
      const drawItems = [];
      wallsRef.current.forEach(([wx, wy]) => {
        const cx = wx * TILE_SIZE;
        const cy = wy * TILE_SIZE;
        const rowZ = 10 + wy * 5;

        const left = wallsRef.current.some(([x, y]) => x === wx - 1 && y === wy);
        const right = wallsRef.current.some(([x, y]) => x === wx + 1 && y === wy);
        const up = wallsRef.current.some(([x, y]) => x === wx && y === wy - 1);
        const down = wallsRef.current.some(([x, y]) => x === wx && y === wy + 1);

        const wLR = connectLR.width * scale;
        const hLR = connectLR.height * scale;
        const wUD = connectUD.width * scale;
        const hUD = connectUD.height * scale;
        const wDL = connectDL.width * scale;
        const hDL = connectDL.height * scale;

        if (left)
          drawItems.push({ img: connectLR, x: cx - wLR / 2, y: cy + (TILE_SIZE - hLR) / 2 + 6, w: wLR, h: hLR, z: rowZ + 2 });
        if (right)
          drawItems.push({ img: connectLR, x: cx + TILE_SIZE - wLR / 2, y: cy + (TILE_SIZE - hLR) / 2 + 6, w: wLR, h: hLR, z: rowZ + 2 });
        if (up)
          drawItems.push({ img: connectUD, x: cx + (TILE_SIZE - wUD) / 2, y: cy - hUD / 2 - 6, w: wUD, h: hUD, z: rowZ + 4 });
        if (down)
          drawItems.push({ img: connectUD, x: cx + (TILE_SIZE - wUD) / 2, y: cy + TILE_SIZE - hUD / 2 - 6, w: wUD, h: hUD, z: rowZ + 4 });

        // diagonal connectors
        if (wallsRef.current.some(([x, y]) => x === wx + 1 && y === wy + 1) && !right && !down)
          drawItems.push({ img: connectDL, x: cx + TILE_SIZE - wDL / 2 - 4, y: cy + TILE_SIZE - hDL / 2 + 1, w: wDL, h: hDL, z: rowZ + 4, mirrorX: true });

        if (wallsRef.current.some(([x, y]) => x === wx - 1 && y === wy + 1) && !left && !down)
          drawItems.push({ img: connectDL, x: cx - TILE_SIZE / 2 + 16, y: cy + TILE_SIZE - hDL / 2 + 1, w: wDL, h: hDL, z: rowZ + 4 });

        drawItems.push({ img: wallImg, x: cx, y: cy, w: TILE_SIZE, h: TILE_SIZE, z: rowZ + 3 });
      });

      drawItems.sort((a, b) => a.z - b.z);
      drawItems.forEach(({ img, x, y, w, h, mirrorX }) => {
        if (mirrorX) {
          ctx.save();
          ctx.translate(x + w / 2, y);
          ctx.scale(-1, 1);
          ctx.drawImage(img, -w / 2, 0, w, h);
          ctx.restore();
        } else ctx.drawImage(img, x, y, w, h);
      });

      // --- Update entities ---
      for (let i = entitiesRef.current.length - 1; i >= 0; i--) {
        const e = entitiesRef.current[i];

        if (e.path && e.path.length > 0) {
          const [tx, ty] = e.path[0];
          const targetX = tx * TILE_SIZE + TILE_SIZE / 2 - impFrameSize / 2;
          const targetY = ty * TILE_SIZE + TILE_SIZE / 2 - impFrameSize / 2;

          const dx = targetX - e.x;
          const dy = targetY - e.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          console.log(e.path.length)


          if (dist < 1) {
            e.path.shift();
            if (e.path.length === 1) {
              healthRef.current = Math.max(healthRef.current - 1, 0);
              console.log("yes")
              entitiesRef.current.splice(i, 1);
              continue;
            }
          } else {
            e.x += (dx / dist) * e.speed * SPEED * (delta / 16);
            e.y += (dy / dist) * e.speed * SPEED * (delta / 16);
          }
        }

        // Imp shake animation
        const baseShake = 3;
        const jitter = 1;
        const offsetX = Math.sin(timestamp / 80 + e.id * 0.7) * baseShake + (Math.random() * jitter - jitter / 2);
        const offsetY = Math.cos(timestamp / 90 + e.id * 1.3) * baseShake + (Math.random() * jitter - jitter / 2);

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
      }

      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
  }, []);

  function spawnImp() {
    const id = nextId.current++;
    const GRID_COLS = INITIAL_GRID[0].length;
    const GRID_ROWS = INITIAL_GRID.length;

    const grid = INITIAL_GRID.map((row) => [...row]);
    wallsRef.current.forEach(([wx, wy]) => {
      if (wy >= 0 && wy < GRID_ROWS && wx >= 0 && wx < GRID_COLS) grid[wy][wx] = 1;
    });

    let path = findPath(grid, START_TILE, GOAL_TILE);
    if (!path) path = [];

    // Append extra tile below goal so imp walks fully in
    const last = path[path.length - 1];
    path.push([last[0], last[1] + 1]);

    const startPosX = START_TILE[0] * TILE_SIZE + TILE_SIZE / 2 - impFrameSize / 2;
    const startPosY = START_TILE[1] * TILE_SIZE + TILE_SIZE / 2 - impFrameSize / 2;

    entitiesRef.current.push({ id, x: startPosX, y: startPosY, speed: 1, path });
  }

  function handleCanvasClick(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
    const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);

    if (y < 0 || y >= INITIAL_GRID.length || x < 0 || x >= INITIAL_GRID[0].length) return;
    if (NO_BUILD_TILES.some(([nx, ny]) => nx === x && ny === y)) return;

    if (placeWallMode) {
      if (INITIAL_GRID[y][x] === 0) {
        setWalls((prev) => {
          const newWalls = [...prev, [x, y]];
          wallsRef.current = newWalls;
          INITIAL_GRID[y][x] = 1;
          return newWalls;
        });
      }
    } else if (demolishMode) {
      if (INITIAL_GRID[y][x] === 1) {
        setWalls((prev) => {
          const newWalls = prev.filter(([wx, wy]) => !(wx === x && wy === y));
          wallsRef.current = newWalls;
          INITIAL_GRID[y][x] = 0;
          return newWalls;
        });
      }
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => { if (placeWallMode) setPlaceWallMode(false); else spawnImp(); }} style={{ marginBottom: 10, padding: "6px 12px" }}>
        {placeWallMode ? "Exit Wall Mode" : "Spawn Imp"}
      </button>
      <button onClick={() => setPlaceWallMode((m) => !m)} style={{ marginBottom: 10, marginLeft: 10, padding: "6px 12px" }}>
        {placeWallMode ? "Wall Mode: ON" : "Wall Mode: OFF"}
      </button>
      <button onClick={() => { setDemolishMode(!demolishMode); setPlaceWallMode(false); }} style={{ marginBottom: 10, marginLeft: 10, padding: "6px 12px" }}>
        {demolishMode ? "Cancel Demolish" : "Demolish"}
      </button>
      <br />
      <canvas ref={canvasRef} width={1088} height={704} onClick={handleCanvasClick} style={{ border: "2px solid black", imageRendering: "pixelated" }} />
    </div>
  );
}

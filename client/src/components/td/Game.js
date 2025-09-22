import { useRef, useEffect, useState } from "react";
import boardImg from "./assets/sprites/board.png";
import impSheet from "./assets/sprites/imp-sheet.png";
import eliteSheet from "./assets/sprites/elite-sheet.png";
import fastSheet from "./assets/sprites/fast-sheet.png";
import splitterSheet from "./assets/sprites/splitter-sheet.png";
import flyerSheet from "./assets/sprites/flyer-sheet.png";
import bossSheet from "./assets/sprites/boss-sheet.png";
import hpImgSrc from "./assets/sprites/hp.png";
import wallImgSrc from "./assets/sprites/wall.png";
import arrowImgSrc from "./assets/sprites/arrow.png"; // new arrow tower sprite
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
  [8, 1],   // below entrance
  [8, 9],   // above exit
  [8, 10],  // exit
];

const START_TILE = [8, 0];
const GOAL_TILE = [8, 10];

const ENEMY_TYPES = {
  imp: {
    frameWidth: 16,
    frameHeight: 16,
    frameCount: 4,
    animSpeed: 800,
    speed: 1,
    hp: 5,
    damage: 1,
    sprite: "imp",
    z: 10,
    offsetAdjust: { x: -22, y: 0 },
  },
  elite: {
    frameWidth: 32,
    frameHeight: 32,
    frameCount: 4,
    animSpeed: 1400,
    speed: 0.5,
    hp: 20,
    damage: 5,
    sprite: "elite",
    z: 10,
    offsetAdjust: { x: -14, y: 0 },
  },
  fast: {
    frameWidth: 24,
    frameHeight: 16,
    frameCount: 4,
    animSpeed: 400,
    speed: 2,
    hp: 5,
    damage: 3,
    sprite: "fast",
    z: 10,
    offsetAdjust: { x: -16, y: 0 },
  },
  splitter: {
    frameWidth: 24,
    frameHeight: 32,
    frameCount: 4,
    animSpeed: 600,
    speed: 0.8,
    hp: 5,
    damage: 6,
    sprite: "splitter",
    z: 10,
    offsetAdjust: { x: -16, y: 0 },
  },
  flyer: {
    frameWidth: 32,
    frameHeight: 24,
    frameCount: 4,
    animSpeed: 200,
    speed: 1,
    hp: 10,
    damage: 5,
    sprite: "flyer",
    z: 1000,
    offsetAdjust: { x: -16, y: 0 },
  },
  boss: {
    frameWidth: 32,
    frameHeight: 32,
    frameCount: 4,
    animSpeed: 800,
    speed: .6,
    hp: 20,
    maxHp: 20,
    damage: 50,
    sprite: "boss",
    z: 10,
    offsetAdjust: { x: -16, y: 0 },
  },
};

const TOWER_TYPES = {
  wall: {
    sprite: "wall",
    buildable: true,
  },
  arrow: {
    sprite: "arrow",
    range: 100,
    damage: 1,
    fireRate: 800,
    buildable: true,
  },
};


export default function Game() {
  const canvasRef = useRef(null);
  const entitiesRef = useRef([]);
  const towersRef = useRef([]);

  const nextId = useRef(0);
  const healthRef = useRef(INITIAL_HEALTH);

  const [placeWallMode, setPlaceWallMode] = useState(false);
  const [demolishMode, setDemolishMode] = useState(false);
  const [shootMode, setShootMode] = useState(false);
  const [selectedTower, setSelectedTower] = useState("wall");
  const [towers, setTowers] = useState([]);

  // -------- Pathfinding (BFS) --------
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

  // -------- Game Loop & Drawing (simplified for brevity) --------
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const board = new Image(); board.src = boardImg;
    const impImg = new Image(); impImg.src = impSheet;
    const eliteImg = new Image(); eliteImg.src = eliteSheet;
    const fastImg = new Image(); fastImg.src = fastSheet;
    const splitterImg = new Image(); splitterImg.src = splitterSheet;
    const flyerImg = new Image(); flyerImg.src = flyerSheet;
    const bossImg = new Image(); bossImg.src = bossSheet;
    const hpImg = new Image(); hpImg.src = hpImgSrc;
    const wallImg = new Image(); wallImg.src = wallImgSrc;
    const arrowImg = new Image(); arrowImg.src = arrowImgSrc;
    const connectLR = new Image(); connectLR.src = connectLRImgSrc;
    const connectUD = new Image(); connectUD.src = connectUDImgSrc;
    const connectDL = new Image(); connectDL.src = connectDLImgSrc;

    let lastTime = performance.now();

    function gameLoop(timestamp) {
      const delta = timestamp - lastTime;
      lastTime = timestamp;

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

      // --- Draw towers + connectors ---
const drawItems = [];

// treat all towers as connectable
towersRef.current.forEach((t) => {
  const cx = t.x * TILE_SIZE;
  const cy = t.y * TILE_SIZE;
  const rowZ = 10 + t.y * 5;

  const left = towersRef.current.some(({x, y}) => x === t.x - 1 && y === t.y);
  const right = towersRef.current.some(({x, y}) => x === t.x + 1 && y === t.y);
  const up = towersRef.current.some(({x, y}) => x === t.x && y === t.y - 1);
  const down = towersRef.current.some(({x, y}) => x === t.x && y === t.y + 1);

  const wLR = connectLR.width * scale;
  const hLR = connectLR.height * scale;
  const wUD = connectUD.width * scale;
  const hUD = connectUD.height * scale;
  const wDL = connectDL.width * scale;
  const hDL = connectDL.height * scale;

  if (left) drawItems.push({ img: connectLR, x: cx - wLR / 2, y: cy + (TILE_SIZE - hLR) / 2 + 6, w: wLR, h: hLR, z: rowZ + 2 });
  if (right) drawItems.push({ img: connectLR, x: cx + TILE_SIZE - wLR / 2, y: cy + (TILE_SIZE - hLR) / 2 + 7, w: wLR, h: hLR, z: rowZ + 2 });
  if (up) drawItems.push({ img: connectUD, x: cx + (TILE_SIZE - wUD) / 2, y: cy - hUD / 2 - 6, w: wUD, h: hUD, z: rowZ + 2 });
  if (down) drawItems.push({ img: connectUD, x: cx + (TILE_SIZE - wUD) / 2, y: cy + TILE_SIZE - hUD / 2 - 6, w: wUD, h: hUD, z: rowZ + 2 });

  if (towersRef.current.some(({x, y}) => x === t.x + 1 && y === t.y + 1) && !right && !down)
    drawItems.push({ img: connectDL, x: cx + TILE_SIZE - wDL / 2 + 2, y: cy + TILE_SIZE - hDL / 2 + 3, w: wDL, h: hDL, z: rowZ + 4, mirrorX: true });

  if (towersRef.current.some(({x, y}) => x === t.x - 1 && y === t.y + 1) && !left && !down)
    drawItems.push({ img: connectDL, x: cx - TILE_SIZE / 2 + 6, y: cy + TILE_SIZE - hDL / 2 + 3, w: wDL, h: hDL, z: rowZ + 4 });

  // draw tower itself
  const towerImg = t.type === "arrow" ? arrowImg : wallImg;
  drawItems.push({ img: towerImg, x: cx, y: cy, w: TILE_SIZE, h: TILE_SIZE, z: rowZ + 3 });
});

// finally, draw all items sorted by z
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


      // --- Update entities (movement, animation, spawn children) ---
      for (let i = entitiesRef.current.length - 1; i >= 0; i--) {
        const e = entitiesRef.current[i];
        let skipMovement = false;

        if (e.hp <= 0) {
          if (e.type === "splitter") spawnChildren(e, "imp", 3);
          else if (e.type === "fast") spawnChildren(e, "imp", 1);
          entitiesRef.current.splice(i, 1);
          continue;
        }

        if (e.type === "boss") {
          const hpPercent = e.hp / e.maxHp;
          const nextThreshold = 1 - (e.phaseCount + 1) * 0.25;
          if (!e.invulnerable && hpPercent <= nextThreshold) {
            e.invulnerable = true;
            e.phaseTimer = 3000;
            e.spawnTimer = 500;
            e.phaseCount++;
          }

          if (e.invulnerable) {
            e.phaseTimer -= delta;
            e.spawnTimer -= delta;

            if (e.spawnTimer <= 0) {
              spawnChildren(e, "imp", 1);
              e.spawnTimer = 500;
            }

            if (e.phaseTimer <= 0) e.invulnerable = false;
            skipMovement = true;
          }
        }

        if (e.path && e.path.length > 0 && !skipMovement) {
          const [tx, ty] = e.path[0];
          const targetX = tx * TILE_SIZE + TILE_SIZE / 2 - e.frameWidth / 2;
          const targetY = ty * TILE_SIZE + TILE_SIZE / 2 - e.frameHeight / 2;
          const dx = targetX - e.x;
          const dy = targetY - e.y;

          if (Math.abs(dx) > Math.abs(dy)) {
            const stepX = Math.sign(dx) * e.speed * SPEED * (delta / 16);
            e.x += Math.abs(stepX) >= Math.abs(dx) ? dx : stepX;
          } else {
            const stepY = Math.sign(dy) * e.speed * SPEED * (delta / 16);
            e.y += Math.abs(stepY) >= Math.abs(dy) ? dy : stepY;
          }

          if (Math.abs(e.x - targetX) < 1 && Math.abs(e.y - targetY) < 1) {
            e.x = targetX;
            e.y = targetY;
            e.path.shift();
            if (e.path.length === 1) {
              healthRef.current = Math.max(healthRef.current - e.damage, 0);
              entitiesRef.current.splice(i, 1);
              continue;
            }
          }
        }

        // Track grid coordinates
        e.gridX = Math.floor((e.x + e.frameWidth / 2) / TILE_SIZE);
        e.gridY = Math.floor((e.y + e.frameHeight * scale - 1) / TILE_SIZE);

        // Animate
        e.lastFrameTime = e.lastFrameTime || 0;
        e.frameIndex = e.frameIndex || 0;
        e.lastFrameTime += delta;
        if (e.lastFrameTime > e.animSpeed) {
          e.frameIndex = (e.frameIndex + 1) % e.frameCount;
          e.lastFrameTime = 0;
        }
      }

      // --- Draw entities sorted by z (after all updates) ---
      const sortedEntities = entitiesRef.current
        .slice()
        .sort((a, b) => (a.z || 0) - (b.z || 0));

      sortedEntities.forEach((e) => {
        let spriteImg;
        switch (e.sprite) {
          case "imp": spriteImg = impImg; break;
          case "elite": spriteImg = eliteImg; break;
          case "fast": spriteImg = fastImg; break;
          case "splitter": spriteImg = splitterImg; break;
          case "flyer": spriteImg = flyerImg; break;
          case "boss": spriteImg = bossImg; break;
          default: spriteImg = impImg; break;
        }

        const offsetX = Math.sin(timestamp / 80 + e.id * 0.7) * 3 + (Math.random() - 0.5);
        const offsetY = Math.cos(timestamp / 90 + e.id * 1.3) * 3 + (Math.random() - 0.5);

        const drawW = e.frameWidth * 2;
        const drawH = e.frameHeight * 2;
        const verticalOffset = TILE_SIZE / 2 - drawH / 2;
        const drawX = e.x - (drawW - TILE_SIZE) / 2 + offsetX + (e.offsetAdjust?.x || 0);
        const drawY = e.y + verticalOffset + offsetY + (e.offsetAdjust?.y || 0) - 16;
        const shadowCenterX = drawX + drawW / 2;
        
        // --- Push shadow as a drawItem ---
        drawItems.push({
          shadow: true,
          x: e.sprite === "flyer" ? drawX+drawW/2.4 : drawX+drawW/3.33,
          y: drawY + drawH - offsetY / 4 ,
          w: e.sprite === "flyer" ? drawW / 5 : drawW / 2.5,
          h: drawH / 8,
          z: 0,
        });

        // --- Push sprite as a drawItem ---
        drawItems.push({
          img: spriteImg,
          sx: e.frameIndex * e.frameWidth,
          sy: 0,
          sw: e.frameWidth,
          sh: e.frameHeight,
          x: drawX,
          y: drawY,
          w: drawW,
          h: drawH,
          z: e.z || 10,
        });
      });

      // --- Draw all drawItems sorted by z ---
      drawItems.sort((a, b) => a.z - b.z);
      drawItems.forEach((item) => {
        if (item.shadow) {
          ctx.fillStyle = "rgba(0,0,0,0.3)";
          ctx.beginPath();
          ctx.ellipse(item.x + item.w / 2, item.y, item.w, item.h, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.drawImage(item.img, item.sx, item.sy, item.sw, item.sh, item.x, item.y, item.w, item.h);
        }
      });


      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
  }, []);


  // ------- spawn enemy -------
  function spawnEntity(type) {
    const cfg = ENEMY_TYPES[type];
    if (!cfg) return;

    const id = nextId.current++;
    const grid = INITIAL_GRID.map((row) => [...row]);
    towersRef.current.forEach(({x: wx, y: wy}) => {
      if (wy >= 0 && wy < grid.length && wx >= 0 && wx < grid[0].length) grid[wy][wx] = 1;
    });

    let path = findPath(grid, START_TILE, GOAL_TILE);
    if (type === "flyer") {
      // straight line from start to goal
      path = [START_TILE, GOAL_TILE];
    }

    if (!path) path = [];
    const last = path[path.length - 1] || START_TILE;
    path.push([last[0], last[1] + 1]);

    const startPosX = START_TILE[0] * TILE_SIZE + TILE_SIZE / 2 - cfg.frameWidth / 2;
    const startPosY = START_TILE[1] * TILE_SIZE + TILE_SIZE / 2 - cfg.frameHeight / 2;

    entitiesRef.current.push({
      id,
      type,
      x: startPosX,
      y: startPosY,
      path,
      frameIndex: 0,
      lastFrameTime: 0,
      phaseCount: 0,
      invulnerable: false,
      phaseTimer: 0,
      spawnTimer: 0,
      ...cfg,
    });
  }


    // ------- spawn children (used by splitter/fast on death) -------
  function spawnChildren(parent, type, count) {
    for (let i = 0; i < count; i++) {
      const cfg = ENEMY_TYPES[type];
      if (!cfg) continue;

      const id = nextId.current++;
      const grid = INITIAL_GRID.map((row) => [...row]);
      towersRef.current.forEach(([wx, wy]) => {
        if (wy >= 0 && wy < grid.length && wx >= 0 && wx < grid[0].length) grid[wy][wx] = 1;
      });

      // check parent tile location
      const parentTile = [Math.floor((parent.x + parent.frameWidth / 2) / TILE_SIZE), Math.floor((parent.y + parent.frameHeight / 2) / TILE_SIZE)];
      let path = findPath(grid, parentTile, GOAL_TILE);
      if (!path) path = [];
      const last = path[path.length - 1] || parentTile;
      path.push([last[0], last[1] + 1]);

      entitiesRef.current.push({
        id,
        type,
        x: parent.x,
        y: parent.y + parent.frameHeight, 
        path,
        frameIndex: 0,
        lastFrameTime: 0,
        z: (parent.z || 10) + 20,
        ...cfg,
      });
    }
  }

  // -------- Handle Canvas Click for Towers/Walls --------
  function handleCanvasClick(e) {
    const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
      const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);

      if (y < 0 || y >= INITIAL_GRID.length || x < 0 || x >= INITIAL_GRID[0].length) return;

      if (!shootMode) {
        if (NO_BUILD_TILES.some(([nx, ny]) => nx === x && ny === y)) return;
      }

      if (shootMode) {
        const drawScale = 2;

        for (let i = entitiesRef.current.length - 1; i >= 0; i--) {
          const ent = entitiesRef.current[i];

          // check sprite edge overlap
          const spriteLeft = ent.x + (ent.offsetAdjust?.x || 0);
          const spriteRight = ent.x + ent.frameWidth * drawScale + (ent.offsetAdjust?.x || 0);
          const spriteTop = ent.y + (ent.offsetAdjust?.y || 0);
          const spriteBottom = ent.y + ent.frameHeight * drawScale + (ent.offsetAdjust?.y || 0);

          const leftTile = Math.floor(spriteLeft / TILE_SIZE);
          const rightTile = Math.floor((spriteRight - 1) / TILE_SIZE);
          const topTile = Math.floor(spriteTop / TILE_SIZE);
          const bottomTile = Math.floor((spriteBottom - 1) / TILE_SIZE);

          if (x >= leftTile && x <= rightTile && y >= topTile && y <= bottomTile) {
            ent.hp -= 1;
          }
        }
        return;
      }

    if (placeWallMode) {
      // forbidden tile zones
      if (NO_BUILD_TILES.some(([nx, ny]) => nx === x && ny === y)) return;

      // occupied tiles check
      if (towersRef.current.some(t => t.x === x && t.y === y)) return;
      
      // valid tower check
      const towerCfg = TOWER_TYPES[selectedTower];
      if (!towerCfg) return;

      if (INITIAL_GRID[y][x] === 0) {
          // make a temp grid copy with the new wall
          const testGrid = INITIAL_GRID.map((row) => [...row]);
          towersRef.current.forEach(({x: wx, y: wy}) => {
            testGrid[wy][wx] = 1;
          });
          testGrid[y][x] = 1;

          // check if path still exists
          const testPath = findPath(testGrid, START_TILE, GOAL_TILE);
          if (!testPath) {
            console.log("Invalid wall: would block all paths!");
            return; // cancel placement
          }
      }

      setTowers((prev) => {
        const newTowers = [...prev, { type: selectedTower, x, y }];
        towersRef.current = newTowers;
        return newTowers;
      });
    }

    if (demolishMode) {
      setTowers((prev) => {
        const newTowers = prev.filter((t) => !(t.x === x && t.y === y));
        towersRef.current = newTowers;
        return newTowers;
      });
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => spawnEntity("imp")} style={{ marginBottom: 10, padding: "6px 12px" }}>
        Spawn Imp
      </button>
      <button onClick={() => spawnEntity("elite")} style={{ marginBottom: 10, marginLeft: 10, padding: "6px 12px" }}>
        Spawn Elite
      </button>
      <button onClick={() => spawnEntity("fast")} style={{ marginBottom: 10, marginLeft: 10, padding: "6px 12px" }}>
        Spawn Fast
      </button>
      <button onClick={() => spawnEntity("splitter")} style={{ marginBottom: 10, marginLeft: 10, padding: "6px 12px" }}>
        Spawn Splitter
      </button>
      <button onClick={() => spawnEntity("flyer")} style={{ marginBottom: 10, marginLeft: 10, padding: "6px 12px" }}>
        Spawn Flyer
      </button>
      <button onClick={() => spawnEntity("boss")} style={{ marginBottom: 10, marginLeft: 10, padding: "6px 12px" }}>
        Spawn Boss
      </button>
      <button onClick={() => setPlaceWallMode((m) => !m)} style={{ marginBottom: 10, marginLeft: 10, padding: "6px 12px" }}>
        {placeWallMode ? "Exit Wall Mode" : "Wall Mode"}
      </button>
      <button onClick={() => { setDemolishMode(!demolishMode); setPlaceWallMode(false); }} style={{ marginBottom: 10, marginLeft: 10, padding: "6px 12px" }}>
        {demolishMode ? "Cancel Demolish" : "Demolish"}
      </button>
      <button
        onClick={() => {
          setShootMode((s) => !s);
          setPlaceWallMode(false);
          setDemolishMode(false);
        }}
        style={{ marginBottom: 10, marginLeft: 10, padding: "6px 12px" }}
      >
        {shootMode ? "Shoot Mode: ON" : "Shoot Mode: OFF"}
      </button>

      {/* Tower Selection */}
      {placeWallMode && (
        <div style={{ marginTop: 10 }}>
          <button
            onClick={() => setSelectedTower("wall")}
            style={{ marginRight: 10, padding: "6px 12px", fontWeight: selectedTower === "wall" ? "bold" : "normal" }}
          >
            Wall
          </button>
          <button
            onClick={() => setSelectedTower("arrow")}
            style={{ marginRight: 10, padding: "6px 12px", fontWeight: selectedTower === "arrow" ? "bold" : "normal" }}
          >
            Arrow
          </button>
        </div>
      )}

      <br />
      <canvas
        ref={canvasRef}
        width={1088}
        height={704}
        onClick={handleCanvasClick}
        style={{ border: "2px solid black", imageRendering: "pixelated" }}
      />
    </div>
  );
}

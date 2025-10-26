import { useRef, useEffect, useState } from "react";
import impSheet from "./assets/sprites/imp-sheet.png";
import eliteSheet from "./assets/sprites/elite-sheet.png";
import fastSheet from "./assets/sprites/fast-sheet.png";
import splitterSheet from "./assets/sprites/splitter-sheet.png";
import flyerSheet from "./assets/sprites/flyer-sheet.png";
import bossSheet from "./assets/sprites/boss-sheet.png";
import hpImgSrc from "./assets/sprites/hp.png";
import wallImgSrc from "./assets/sprites/wall.png";
import arrowImgSrc from "./assets/sprites/arrow.png";
import cannonImgSrc from "./assets/sprites/cannon.png";
import slowImgSrc from "./assets/sprites/slow.png";
import acidImgSrc from "./assets/sprites/acid.png";
import chainImgSrc from "./assets/sprites/chain.png";
import sniperImgSrc from "./assets/sprites/sniper.png";
import buffImgSrc from "./assets/sprites/buff.png";
import bulletImgSrc from "./assets/sprites/bullet.png";
import cannonballImgSrc from "./assets/sprites/cannonball.png";
import splashImgSrc from "./assets/sprites/splash.png";
import connectLRImgSrc from "./assets/sprites/connect-lr.png";
import connectUDImgSrc from "./assets/sprites/connect-ud.png";
import connectDLImgSrc from "./assets/sprites/connect-dl.png";
import bottomForestSrc from "./assets/sprites/tiles/forest-1.png";
import midForestSrc from "./assets/sprites/tiles/forest-2.png";
import topLeftForestSrc from "./assets/sprites/tiles/forest-3.png";
import topRightForestSrc from "./assets/sprites/tiles/forest-4.png";
import bottomTreesSrc from "./assets/sprites/tiles/trees-1.png";
import midTreesSrc from "./assets/sprites/tiles/trees-2.png";
import topLeftTreesSrc from "./assets/sprites/tiles/trees-3.png";
import topRightTreesSrc from "./assets/sprites/tiles/trees-4.png";
import stumpsSrc from "./assets/sprites/tiles/stumps.png";
import riverSrc from "./assets/sprites/tiles/water.png";
import bridgeSrc from "./assets/sprites/tiles/bridge.png";
import grassFenceSrc from "./assets/sprites/tiles/fence-1.png";
import pathFenceSrc from "./assets/sprites/tiles/fence-2.png";
import pathVar1Src from "./assets/sprites/tiles/dirt-1.png";
import pathVar2Src from "./assets/sprites/tiles/dirt-2.png";
import pathVar3Src from "./assets/sprites/tiles/dirt-3.png";
import pathVar4Src from "./assets/sprites/tiles/dirt-4.png";
import gateSrc from "./assets/sprites/tiles/gate.png";

const SPEED = 0.4;
const TILE_SIZE = 64;
const INITIAL_HEALTH = 100;

const WAVE_TEMPLATES = [
  ['imp', 'imp', 'imp'],
  ['imp', 'elite'],
  ['fast', 'fast'],
  ['splitter'],
  ['flyer', 'flyer'],
  ['elite', 'flyer'],

];

const GAME_BOARD = [
  ["A","C","C","C","R","R","R","R","E","R","R","R","R","D","D","D","B"],
  ["F","T","T","T","P","P","P","P","P","P","P","P","P","V","V","V","H"],
  ["F","T","T","T","P","P","P","P","P","P","P","P","P","V","V","V","H"],
  ["F","T","T","T","P","P","P","P","P","P","P","P","P","V","V","V","H"],
  ["F","T","T","T","P","P","P","P","P","P","P","P","P","V","V","V","H"],
  ["F","T","T","T","P","P","P","P","P","P","P","P","P","V","V","V","H"],
  ["F","T","T","T","P","P","P","P","P","P","P","P","P","V","V","V","H"],
  ["F","T","T","T","P","P","P","P","P","P","P","P","P","V","V","V","H"],
  ["F","T","T","T","P","P","P","P","P","P","P","P","P","V","V","V","H"],
  ["Y","W","W","W","P","P","P","P","P","P","P","P","P","X","X","X","Z"],
  ["M","M","M","M","N","N","N","N","G","N","N","N","N","M","M","M","M"],
]

const TILE_TYPES = {
  "A": { name: "TopForestLeft", walkable: false, sprite: topLeftForestSrc, animated:true },
  "B": { name: "TopForestRight", walkable: false, sprite: topRightForestSrc, animated:true  },
  "F": { name: "Forest", walkable: false, sprite: midForestSrc },
  "H": { name: "MirroredForest", walkable: false, sprite: midForestSrc, mirror: true },
  "Y": { name: "BottomForest", walkable: false, sprite: bottomForestSrc },
  "Z": { name: "MirroredBottomForest", walkable: false, sprite: bottomForestSrc, mirror: true },

  "C": { name: "TopTreesLeft", walkable: false, sprite: topLeftTreesSrc, animated:true  },
  "D": { name: "TopTreesRight", walkable: false, sprite: topRightTreesSrc, animated:true  },
  "T": { name: "Trees", walkable: false, sprite: midTreesSrc },
  "V": { name: "MirroredTrees", walkable: false, sprite: midTreesSrc, mirror: true },
  "W": { name: "BottomTrees", walkable: false, sprite: bottomTreesSrc },
  "X": { name: "MirroredBottomTrees", walkable: false, sprite: bottomTreesSrc, mirror: true },
  "S": { name: "Stumps", walkable: true, sprite: stumpsSrc},

  "R": { name: "River", walkable: true, sprite: riverSrc, animated:true  },
  "E": { name: "Bridge", walkable: true, sprite: bridgeSrc },

  "P": { name: "Path", walkable: true, sprites: [pathVar1Src, pathVar2Src, pathVar3Src, pathVar4Src] },
  "M": { name: "FenceGrass", walkable: false, sprite: grassFenceSrc },
  "N": { name: "FencePath", walkable: false, sprite: pathFenceSrc },
  "G": { name: "Gate", walkable: true, sprite: gateSrc },
};

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
    animSpeed: 350,
    speed: 2.25,
    hp: 5,
    damage: 3,
    sprite: "fast",
    z: 9,
    offsetAdjust: { x: -16, y: -10 },
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
    range: 0,
    damage: 0,
    pierce: 0,
    aoe: 0,
    bounce: 0,
    fireRate: 0,
    bulletSpeed: 1,
  },
  arrow: {
    sprite: "arrow",
    range: 220,
    damage: 1,
    pierce: 2,
    aoe: 0,
    bounce: 0,
    fireRate: 800,
    buildable: true,
    bulletSpeed: 6,
    bulletSprite: "bullet"
  },
  cannon: {
    sprite: "cannon",
    range: 160,
    damage: 1,
    pierce: 0,
    aoe: 1,
    bounce: 0,
    fireRate: 1200,
    buildable: true,
    bulletSpeed: 5,
    bulletSprite: "cannonball"
  },
    slow: {
    sprite: "slow",
    range: 160,
    damage: 0,
    pierce: 0,
    aoe: 1,    
    bounce: 0,
    fireRate: 1200,
    buildable: true,
    bulletSpeed: 5,
    bulletSprite: "cannonball"
  },
    acid: {
    sprite: "acid",
    range: 100,
    damage: 1,
    pierce: 1000,
    aoe: 0,    
    bounce: 0,
    fireRate: 600,
    buildable: true,
    bulletSpeed: 10,
    bulletSprite: "splash"
  },
  chain: {
    sprite: "chain",
    range: 160,
    damage: 1,
    pierce: 0,
    aoe: 0,
    bounce: 2,
    fireRate: 1200,
    buildable: true,
    bulletSpeed: 100,
    bulletSprite: "lightning"
  },
  sniper: {
    sprite: "sniper",
    range: 100000,
    damage: 1,
    pierce: 0,
    aoe: 0,
    bounce: 0,
    fireRate: 1200,
    buildable: true,
    bulletSpeed: Infinity,
    bulletSprite: "bullet"
  },
  buff: {
    sprite: "buff",
    range: 220,
    damage: 0,
    pierce: 0,
    aoe: 0,
    bounce: 0,
    fireRate: 1000,
    buildable: true,
    bulletSpeed: Infinity,
  },
};

const fetchScore = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/scores");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched scores:", data);
  } catch (error) {
    console.error("Failed to fetch scores:", error);
  }
};


export default function Game() {
  const canvasRef = useRef(null);
  const entitiesRef = useRef([]);
  const towersRef = useRef([]);
  const projectilesRef = useRef([]);
  const lightningsRef = useRef([]);

  const nextId = useRef(0);
  const healthRef = useRef(INITIAL_HEALTH);

  const [placeWallMode, setPlaceWallMode] = useState(false);
  const [demolishMode, setDemolishMode] = useState(false);
  const [shootMode, setShootMode] = useState(false);
  const [selectedTower, setSelectedTower] = useState("wall");
  const [waveCount, setwaveCount] = useState(0);
  const [mapUpgrade, setMapUpgrade] = useState(0);
  const [board, setBoard] = useState(GAME_BOARD);

  const [towers, setTowers] = useState([]);
  const [projectiles, setProjectiles] = useState([]);

  let animTime = 0;
  const pathVariants = GAME_BOARD.map(row =>
    row.map(cell =>
      TILE_TYPES[cell]?.sprites ? Math.floor(Math.random() * 4) : null
    )
  );

  // --- Pathfinding (BFS) ---
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

  // --- sprite drawing ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const impImg = new Image(); impImg.src = impSheet;
    const eliteImg = new Image(); eliteImg.src = eliteSheet;
    const fastImg = new Image(); fastImg.src = fastSheet;
    const splitterImg = new Image(); splitterImg.src = splitterSheet;
    const flyerImg = new Image(); flyerImg.src = flyerSheet;
    const bossImg = new Image(); bossImg.src = bossSheet;
    const hpImg = new Image(); hpImg.src = hpImgSrc;
    const wallImg = new Image(); wallImg.src = wallImgSrc;
    const arrowImg = new Image(); arrowImg.src = arrowImgSrc;
    const cannonImg = new Image(); cannonImg.src = cannonImgSrc;
    const slowImg = new Image(); slowImg.src = slowImgSrc;
    const acidImg = new Image(); acidImg.src = acidImgSrc;
    const chainImg = new Image(); chainImg.src = chainImgSrc;
    const sniperImg = new Image(); sniperImg.src = sniperImgSrc;
    const buffImg = new Image(); buffImg.src = buffImgSrc;
    const connectLR = new Image(); connectLR.src = connectLRImgSrc;
    const connectUD = new Image(); connectUD.src = connectUDImgSrc;
    const connectDL = new Image(); connectDL.src = connectDLImgSrc;
    const bulletImg = new Image(); bulletImg.src = bulletImgSrc;
    const cannonballImg = new Image(); cannonballImg.src = cannonballImgSrc;
    const splashImg = new Image(); splashImg.src = splashImgSrc;

    let lastTime = performance.now();

    function gameLoop(timestamp) {
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      animTime += delta;
      const animFrame = Math.floor(animTime / 1500) % 2; //water animation timer (1.5s)

      // -- Draw Game Board --
      for (let y = 0; y < GAME_BOARD.length; y++) {
        for (let x = 0; x < GAME_BOARD[y].length; x++) {
          const tileKey = GAME_BOARD[y][x];
          const tile = TILE_TYPES[tileKey];
          if (!tile) continue;

          let sprite;

          if (Array.isArray(tile.sprites)) {
            const randIndex = pathVariants[y][x];
            sprite = tile.sprites[randIndex];
          } else {
            sprite = tile.sprite;
          }

          const img = new Image();
          img.src = sprite;

          if (tile.animated) {
              const frameWidth = 32;
              const frameHeight = 32; 
              const frame = animFrame % 2;
              const sx = frame * frameWidth;
              const sy = 0;

              ctx.drawImage(
                img,
                sx, sy, frameWidth, frameHeight, 
                x * TILE_SIZE, y * TILE_SIZE,
                TILE_SIZE, TILE_SIZE
              );
          } else {
            if (tile.mirror) {
              ctx.save();
              ctx.scale(-1, 1);
              ctx.drawImage(img, -((x + 1) * TILE_SIZE), y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
              ctx.restore();
            } else {
              ctx.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
          }
        }
      }


      // // !(TEMP) --- visual tower ranges ---
      // towersRef.current.forEach((t) => {
      //   if (t.range && t.range > 0) {
      //     const cx = t.x * TILE_SIZE + TILE_SIZE / 2;
      //     const cy = t.y * TILE_SIZE + TILE_SIZE / 2;
      //     ctx.beginPath();
      //     ctx.arc(cx, cy, t.range, 0, Math.PI * 2);
      //     ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      //     ctx.fill();
      //     ctx.lineWidth = 2;
      //     ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      //     ctx.stroke();
      //   }
      // });

      // --- Draw HP ---
      const hpX = canvas.width - 150;
      const hpY = 10;
      ctx.drawImage(hpImg, hpX, hpY, 64, 48);
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText(healthRef.current, hpX + 74, hpY + 40);

      const scale = 2;

      // --- tower firing logic ---
      const now = Date.now();
      towersRef.current.forEach((tower) => {
        if (!tower.fireRate) return;
        if (!tower.lastShotTime) tower.lastShotTime = 0;

        if (now - tower.lastShotTime >= tower.fireRate) {
          tower.lastShotTime = now;

          if (!tower.baseDamage) tower.baseDamage = tower.damage;
          if (!tower.activeBuffs) tower.activeBuffs = []; 

          if (tower.sprite === "acid") {
              const inRange = entitiesRef.current.filter((e) => {
                const dx = (e.x + e.frameWidth / 2) - ((tower.x + 0.5) * TILE_SIZE);
                const dy = (e.y + e.frameHeight / 2) - ((tower.y + 0.5) * TILE_SIZE);
                return Math.sqrt(dx*dx + dy*dy) <= tower.range;
              });

              if (inRange.length === 0) {
                tower.cooldown = 0;
                return; 
              }

            const centerX = (tower.x + 0.5) * TILE_SIZE;
            const centerY = (tower.y + 0.5) * TILE_SIZE;
            for (let i = 0; i < 8; i++) {
              const angle = (Math.PI * 2 / 8) * i;
              const dx = Math.cos(angle) * tower.bulletSpeed;
              const dy = Math.sin(angle) * tower.bulletSpeed;

              projectilesRef.current.push({
                id: Date.now() + Math.random(),
                x: centerX,
                y: centerY,
                targetId: null,
                speed: tower.bulletSpeed,
                damage: tower.damage,
                pierce: tower.pierce,
                aoe: tower.aoe,
                range: tower.range,
                distanceTraveled: 0,
                tower: tower.sprite,
                bulletSprite: tower.bulletSprite || null,
                hitSet: new Set(),
                dx,
                dy,
              });
            }
          } else if (tower.sprite === "buff") {
            towersRef.current.forEach((t) => {
              if (t === tower) return;
              const dx = (t.x - tower.x) * TILE_SIZE;
              const dy = (t.y - tower.y) * TILE_SIZE;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist <= tower.range) {
                t.activeBuffs = t.activeBuffs || [];
                if (!t.activeBuffs.includes(tower.id)) t.activeBuffs.push(tower.id);
              } else {
                t.activeBuffs = t.activeBuffs?.filter(id => id !== tower.id);
              }

              t.damage = t.baseDamage * (1 + 0.25 * (t.activeBuffs?.length || 0));
              t.fireRate = TOWER_TYPES[t.sprite].fireRate / (1 + 0.25 * (t.activeBuffs?.length || 0));
            });
            return;
          } else if (tower.sprite === "sniper") {
            const inRange = entitiesRef.current;
            if (inRange.length === 0) return;
            
            const target = inRange.reduce((farthest, e) => {
              return !farthest || e.progress > farthest.progress ? e : farthest;
            }, null);
            
            if (target) applyDamage(target, {
              damage: tower.damage,
              isSniper: true
            });
            
            return; 
          } else if (tower.sprite === "slow") {
            const inRange = entitiesRef.current.filter((e) => {
              const dx = (e.x + e.frameWidth / 2) - ((tower.x + 0.5) * TILE_SIZE);
              const dy = (e.y + e.frameHeight / 2) - ((tower.y + 0.5) * TILE_SIZE);
              return Math.sqrt(dx * dx + dy * dy) <= tower.range;
            });

            if (inRange.length === 0) return;

            const target = inRange.reduce((farthest, e) => {
              return !farthest || e.progress > farthest.progress ? e : farthest;
            }, null);


            projectilesRef.current.push({
              id: Date.now() + Math.random(),
              x: (tower.x + 0.5) * TILE_SIZE,
              y: (tower.y + 0.5) * TILE_SIZE,
              targetId: target.id,
              speed: tower.bulletSpeed,
              damage: tower.damage,
              pierce: tower.pierce,
              aoe: tower.aoe,
              range: tower.range,
              distanceTraveled: 0,
              bulletSprite: tower.bulletSprite,
              isSlow: true,
            });
          } else if (tower.sprite === "chain") {
            const inRange = entitiesRef.current.filter((e) => {
              const dx = (e.x + e.frameWidth / 2) - ((tower.x + 0.5) * TILE_SIZE);
              const dy = (e.y + e.frameHeight / 2) - ((tower.y + 0.5) * TILE_SIZE);
              return Math.sqrt(dx * dx + dy * dy) <= tower.range;
            });

            if (inRange.length === 0) return;

            const target = inRange.reduce((farthest, e) => {
              return !farthest || e.progress > farthest.progress ? e : farthest;
            }, null);


            projectilesRef.current.push({
              id: Date.now() + Math.random(),
              x: (tower.x + 0.5) * TILE_SIZE,
              y: (tower.y + 0.5) * TILE_SIZE,
              targetId: target.id,
              speed: Infinity, // hitscan
              damage: tower.damage,
              pierce: 0,
              aoe: 0,
              range: tower.range,
              distanceTraveled: 0,
              bulletSprite: null,
              isChain: true,
              bounce: tower.bounce || 0,
              hitSet: new Set(),
            });
          } else {
            const inRange = entitiesRef.current.filter((e) => {
              const dx = (e.x + e.frameWidth / 2) - ((tower.x + 0.5) * TILE_SIZE);
              const dy = (e.y + e.frameHeight / 2) - ((tower.y + 0.5) * TILE_SIZE);
              return Math.sqrt(dx * dx + dy * dy) <= tower.range;
            });

            if (inRange.length === 0) return;

            const target = inRange.reduce((farthest, e) => {
              return !farthest || e.progress > farthest.progress ? e : farthest;
            }, null);

            const angleX = (target.x + target.frameWidth / 2) - (tower.x + 0.5) * TILE_SIZE;
            const angleY = (target.y + target.frameHeight / 2) - (tower.y + 0.5) * TILE_SIZE;

            projectilesRef.current.push({
              id: Date.now() + Math.random(),
              x: (tower.x + 0.5) * TILE_SIZE,
              y: (tower.y + 0.5) * TILE_SIZE,
              targetId: target.id,
              speed: tower.bulletSpeed,
              damage: tower.damage,
              pierce: tower.pierce,
              aoe: tower.aoe,
              range: tower.range,
              distanceTraveled: 0,
              tower: tower.sprite,
              bulletSprite: tower.bulletSprite || null,
              hitSet: new Set(),
              dx: angleX,
              dy: angleY,
            });
          }
        }
      });

      const updatedProjectiles = [];

      projectilesRef.current.forEach((p) => {
        if (p.isChain) {
          let currentTarget = entitiesRef.current.find((e) => e.id === p.targetId);
          let bouncesLeft = p.bounce;
          let lastX = p.x;
          let lastY = p.y;
 
          while (currentTarget && bouncesLeft >= 0) {
            applyDamage(currentTarget, p);
            p.hitSet.add(currentTarget.id);

            lightningsRef.current.push({
              x1: lastX,
              y1: lastY,
              x2: currentTarget.x + currentTarget.frameWidth / 2,
              y2: currentTarget.y + currentTarget.frameHeight / 2,
              createdAt: Date.now(),
              duration: 200,
            });

            const next = entitiesRef.current.find((e) => {
              if (p.hitSet.has(e.id)) return false;
              const dx = (e.x + e.frameWidth / 2) - (currentTarget.x + currentTarget.frameWidth / 2);
              const dy = (e.y + e.frameHeight / 2) - (currentTarget.y + currentTarget.frameHeight / 2);
              return Math.sqrt(dx * dx + dy * dy) <= TILE_SIZE * 3; // bounce range
            });

            if (!next) break;

            lastX = currentTarget.x + currentTarget.frameWidth / 2;
            lastY = currentTarget.y + currentTarget.frameHeight / 2;
            currentTarget = next;
            bouncesLeft--;
          }
          return;
        }

        if (p.aoe > 0) {
          const target = entitiesRef.current.find((e) => e.id === p.targetId);
          if (!target) return;

          const dx = (target.x + target.frameWidth / 2) - p.x;
          const dy = (target.y + target.frameHeight / 2) - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p.speed) {
            const bulletTileX = Math.floor(target.x / TILE_SIZE);
            const bulletTileY = Math.floor(target.y / TILE_SIZE);
            const half = p.aoe - 1;

            entitiesRef.current.forEach((e) => {
              const eTileX = Math.floor(e.x / TILE_SIZE);
              const eTileY = Math.floor(e.y / TILE_SIZE);
              if (
                Math.abs(eTileX - bulletTileX) <= half &&
                Math.abs(eTileY - bulletTileY) <= half
              ) {
                applyDamage(e, p);
              }
            });
            return;
          }

          const moveX = (dx / dist) * p.speed;
          const moveY = (dy / dist) * p.speed;
          const newDistTraveled = p.distanceTraveled + p.speed;

          if (newDistTraveled <= p.range) {
            updatedProjectiles.push({
              ...p,
              x: p.x + moveX,
              y: p.y + moveY,
              distanceTraveled: newDistTraveled,
            });
          }
          return;
        }

        if (p.pierce > 0) {
          if (!p.hitSet) p.hitSet = new Set();

          const angle = Math.atan2(p.dy, p.dx);
          const moveX = Math.cos(angle) * p.speed;
          const moveY = Math.sin(angle) * p.speed;
          const newX = p.x + moveX;
          const newY = p.y + moveY;
          const newDistTraveled = p.distanceTraveled + p.speed;

          entitiesRef.current.forEach((e) => {
            if (p.hitSet.has(e.id)) return;

            const ex = e.x + e.frameWidth / 2;
            const ey = e.y + e.frameHeight / 2;
            const dx = ex - newX;
            const dy = ey - newY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < e.frameWidth / 2) {
              applyDamage(e, p);
              p.hitSet.add(e.id);
              p.pierce -= 1;
            }
          });

          if (p.pierce > 0 && newDistTraveled <= p.range) {
            updatedProjectiles.push({
              ...p,
              x: newX,
              y: newY,
              distanceTraveled: newDistTraveled,
              pierce: p.pierce,
              hitSet: p.hitSet,
            });
          }
          return;
        }

        {
          const angle = Math.atan2(p.dy, p.dx);
          const moveX = Math.cos(angle) * p.speed;
          const moveY = Math.sin(angle) * p.speed;
          const newX = p.x + moveX;
          const newY = p.y + moveY;
          const newDistTraveled = p.distanceTraveled + p.speed;

          const target = entitiesRef.current.find((e) => e.id === p.targetId);
          if (target) {
            const ex = target.x + target.frameWidth / 2;
            const ey = target.y + target.frameHeight / 2;
            const dx = ex - newX;
            const dy = ey - newY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < target.frameWidth / 2) {
              applyDamage(target, p);
              return;
            }
          }

          if (newDistTraveled <= p.range) {
            updatedProjectiles.push({
              ...p,
              x: newX,
              y: newY,
              distanceTraveled: newDistTraveled,
            });
          }
        }
      });

      projectilesRef.current = updatedProjectiles;
      setProjectiles([...projectilesRef.current]);


      const drawItems = [];

      lightningsRef.current = lightningsRef.current.filter(bolt => {
        const progress = (Date.now() - bolt.createdAt) / bolt.duration;
        if (progress > 1) return false;

        drawLightning(ctx, bolt);
        return true;
      });

      // --- Draw Projectiles ---
      projectilesRef.current.forEach((p) => {
        if (!p.bulletSprite && p.tower !== "sniper") return;

        const drawW = 8;
        const drawH = 4;

        const target = entitiesRef.current.find((e) => e.id === p.targetId);
        let angle = 0;
        if (target) {
          const dx = (target.x + target.frameWidth/2) - p.x;
          const dy = (target.y + target.frameHeight/2) - p.y;
          angle = Math.atan2(dy, dx);
        }

        let img;
        switch(p.bulletSprite){
          case "bullet": img = bulletImg; break;
          case "splash": img = splashImg; break;
          case "cannonball": img = cannonballImg; break; 
          default: img = bulletImg; break;
        }

        if (!img) return;
        drawItems.push({
          img,
          x: p.x - drawW/2,
          y: p.y - drawH/2,
          w: drawW,
          h: drawH,
          z: 20,
          angle,
        });
      });


      // --- Draw towers + connectors ---
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
        if (up) drawItems.push({ img: connectUD, x: cx + (TILE_SIZE - wUD) / 2, y: cy - hUD / 2 + 2, w: wUD, h: hUD, z: rowZ + 2 });
        if (down) drawItems.push({ img: connectUD, x: cx + (TILE_SIZE - wUD) / 2, y: cy + TILE_SIZE - hUD / 2 - 6, w: wUD, h: hUD, z: rowZ + 2 });

        if (towersRef.current.some(({x, y}) => x === t.x + 1 && y === t.y + 1) && !right && !down)
          drawItems.push({ img: connectDL, x: cx + TILE_SIZE - wDL / 2 + 2, y: cy + TILE_SIZE - hDL / 2 + 3, w: wDL, h: hDL, z: rowZ + 4, mirrorX: true });

        if (towersRef.current.some(({x, y}) => x === t.x - 1 && y === t.y + 1) && !left && !down)
          drawItems.push({ img: connectDL, x: cx - TILE_SIZE / 2 + 6, y: cy + TILE_SIZE - hDL / 2 + 3, w: wDL, h: hDL, z: rowZ + 4 });

        let towerImg;

        switch(t.type){
          case "wall": towerImg = wallImg; break;
          case "arrow": towerImg = arrowImg; break;
          case "cannon": towerImg = cannonImg; break;
          case "slow": towerImg = slowImg; break;
          case "acid": towerImg = acidImg; break;
          case "chain": towerImg = chainImg; break;
          case "sniper": towerImg = sniperImg; break;
          case "buff": towerImg = buffImg; break;
          default: towerImg = wallImg; break;
        }

        drawItems.push({ img: towerImg, x: cx, y: cy, w: TILE_SIZE, h: TILE_SIZE, z: rowZ + 3 });
      });

      drawItems.sort((a,b) => a.z - b.z);
      drawItems.forEach(({img, x, y, w, h, mirrorX, angle}) => {
        if (mirrorX) {
          ctx.save();
          ctx.translate(x + w/2, y);
          ctx.scale(-1,1);
          ctx.drawImage(img, -w/2, 0, w, h);
          ctx.restore();
        } else if (angle) {
          ctx.save();
          ctx.translate(x + w/2, y + h/2);
          ctx.rotate(angle + Math.PI);
          ctx.drawImage(img, -w/2, -h/2, w, h);
          ctx.restore();
        } else {
          ctx.drawImage(img, x, y, w, h);
        }
      });

      // --- Draw entities ---
      for (let i = entitiesRef.current.length - 1; i >= 0; i--) {
        const e = entitiesRef.current[i];
        let skipMovement = false;
        if (e.hp <= 0) {
          if (e.type === "splitter") {spawnChildren(e, "imp", 3);}
          else if (e.type === "fast") spawnChildren(e, "imp", 1);
          entitiesRef.current.splice(i, 1);
          continue;
        }

        if (e.path && e.path.length === 1) {
          healthRef.current = Math.max(healthRef.current - e.damage, 0);
          if (e.type === "splitter") spawnChildren(e, "imp", 3);
          else if (e.type === "fast") spawnChildren(e, "imp", 2);
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
          const step = e.speed * SPEED * (delta / 16);

          if (Math.abs(dx) > Math.abs(dy)) {
            const stepX = Math.sign(dx) * step;
            e.x += Math.abs(stepX) >= Math.abs(dx) ? dx : stepX;
            e.progress += Math.abs(stepX); 
          } else {
            const stepY = Math.sign(dy) * step;
            e.y += Math.abs(stepY) >= Math.abs(dy) ? dy : stepY;
            e.progress += Math.abs(stepY); 
          }


          if (e.slowUntil && Date.now() > e.slowUntil) {
            e.speed = e.originalSpeed || e.speed;
            e.slowUntil = null;
          }

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

            e.z = (e.z || 0) + 1;

            e.path.shift();
            if (e.path.length === 1) {
              healthRef.current = Math.max(healthRef.current - e.damage, 0);
              entitiesRef.current.splice(i, 1);
              continue;
            }
          }
        }

        e.gridX = Math.floor((e.x + e.frameWidth / 2) / TILE_SIZE);
        e.gridY = Math.floor((e.y + e.frameHeight * scale - 1) / TILE_SIZE);

        e.lastFrameTime = e.lastFrameTime || 0;
        e.frameIndex = e.frameIndex || 0;
        e.lastFrameTime += delta;
        if (e.lastFrameTime > e.animSpeed) {
          e.frameIndex = (e.frameIndex + 1) % e.frameCount;
          e.lastFrameTime = 0;
        }
      }

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
        
        drawItems.push({
          shadow: true,
          x: e.sprite === "flyer" ? drawX+drawW/2.4 : drawX+drawW/3.33,
          y: drawY + drawH - offsetY / 4 ,
          w: e.sprite === "flyer" ? drawW / 5 : drawW / 2.5,
          h: drawH / 8,
          z: 0,
        });

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


  // --- spawn enemy ---
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
      progress: 0,
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


    // --- spawn children ---
  function spawnChildren(parent, type, count) {
    for (let i = 0; i < count; i++) {
      const cfg = ENEMY_TYPES[type];
      if (!cfg) continue;

      const id = nextId.current++;
      const grid = INITIAL_GRID.map((row) => [...row]);
      towersRef.current.forEach(({x: wx, y: wy}) => {
        if (wy >= 0 && wy < grid.length && wx >= 0 && wx < grid[0].length) grid[wy][wx] = 1;
      });

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

  const applyDamage = (enemy, proj) => {
    if (proj.isSlow) { //apply slow
      const SLOW_AMOUNT = 0.5;
      const SLOW_DURATION = 2000;
      
      if (!enemy.originalSpeed) enemy.originalSpeed = enemy.speed;
      enemy.speed = enemy.originalSpeed * SLOW_AMOUNT;
      enemy.slowUntil = Date.now() + SLOW_DURATION;
    }

    console.log(proj.damage);
    enemy.hp -= proj.damage;
  };


  // --- Click Event ---
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

          // sprite edge overlap
          const spriteLeft = ent.x + (ent.offsetAdjust?.x || 0);
          const spriteRight = ent.x + ent.frameWidth * drawScale + (ent.offsetAdjust?.x || 0);
          const spriteTop = ent.y + (ent.offsetAdjust?.y || 0);
          const spriteBottom = ent.y + ent.frameHeight * drawScale + (ent.offsetAdjust?.y || 0);

          const leftTile = Math.floor(spriteLeft / TILE_SIZE);
          const rightTile = Math.floor((spriteRight - 1) / TILE_SIZE);
          const topTile = Math.floor(spriteTop / TILE_SIZE);
          const bottomTile = Math.floor((spriteBottom - 1) / TILE_SIZE);

          if (x >= leftTile && x <= rightTile && y >= topTile && y <= bottomTile) {
            if (!ent.invulnerable) { 
                ent.hp -= 1;
            }          
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

      // valid path check
      if (INITIAL_GRID[y][x] === 0) {
          const testGrid = INITIAL_GRID.map((row) => [...row]);
          towersRef.current.forEach(({x: wx, y: wy}) => {
            testGrid[wy][wx] = 1;
          });
          testGrid[y][x] = 1;

          const testPath = findPath(testGrid, START_TILE, GOAL_TILE);
          if (!testPath) {
            console.log("Invalid wall: would block all paths!");
            return;
          }
      }

      // place tower
      const newTower = {
        ...towerCfg, 
        type: selectedTower,
        x,
        y,
        lastShotTime: 0,
      };

      setTowers((prev) => {
        const newTowers = [...prev, newTower]; 
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

  // --- handle waves ---
  function generateWave(waveCount) {
    const spawnAmount = Math.min(1 + Math.floor(waveCount / 2), 10);
    const wave = [];

    for (let i = 0; i < spawnAmount; i++) {
      const allowedTemplates = WAVE_TEMPLATES.filter(pkg => {
        // restrict 'fast' or 'flyer' until wave 5
        if (waveCount < 5 && (pkg.includes('fast') || pkg.includes('flyer'))) {
          return false;
        }
        return true;
      });

      const pkg = allowedTemplates[Math.floor(Math.random() * allowedTemplates.length)];
      wave.push(...pkg);
    }

    return wave;
  }

  function startWave() {
    const waveTemplate = generateWave(waveCount);
    let spawnIndex = 0;
    setwaveCount((prev) => prev + 1);

    if((waveCount+1) % 5 === 0){
      spawnEntity("boss");
    }

    const spawnInterval = setInterval(() => {
      if (spawnIndex >= waveTemplate.length) {
        clearInterval(spawnInterval);
        return;
      }

      const type = waveTemplate[spawnIndex];
      spawnEntity(type);

      spawnIndex++;
    }, 400);
  }

  function drawLightning(ctx, bolt) {
    const {x1, y1, x2, y2, createdAt, duration} = bolt;
    const progress = (Date.now() - createdAt) / duration;
    if (progress > 1) return;

    ctx.save();
    ctx.globalAlpha = 1 - progress;
    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x1, y1);

    let segments = 4;
    for (let i = 1; i < segments; i++) {
      let t = i / segments;
      let ix = x1 + (x2 - x1) * t;
      let iy = y1 + (y2 - y1) * t;
      ix += (Math.random() - 0.5) * 10;
      iy += (Math.random() - 0.5) * 10;
      ctx.lineTo(ix, iy);
    }

    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  // --- map upgrades ---
  function handleMapUpgrade() {
    if(mapUpgrade>=3){
      console.log("Map fully upgraded!");
      return;
    }
    const upgradeCandidates = ["C", "T", "W", "D", "V", "X"];
    const spreadSources = ["P", "S", "R"];

    // copy board so we don’t modify while checking
    const newBoard = GAME_BOARD.map(row => [...row]);

    for (let y = 0; y < GAME_BOARD.length; y++) {
      for (let x = 0; x < GAME_BOARD[y].length; x++) {
        const tile = GAME_BOARD[y][x];
        if (!upgradeCandidates.includes(tile)) continue;

        // check 4 directions
        const neighbors = [
          GAME_BOARD[y - 1]?.[x],
          GAME_BOARD[y + 1]?.[x],
          GAME_BOARD[y]?.[x - 1],
          GAME_BOARD[y]?.[x + 1],
        ];

        if (neighbors.some(n => spreadSources.includes(n))) {
          if (tile === "C" || tile === "D") {
            newBoard[y][x] = "R"; // river
          } else {
            newBoard[y][x] = "S"; // stumps
          }
        }
      }
    }

    // mutate the original GAME_BOARD in place
    for (let y = 0; y < GAME_BOARD.length; y++) {
      for (let x = 0; x < GAME_BOARD[y].length; x++) {
        GAME_BOARD[y][x] = newBoard[y][x];
      }
    }

    setMapUpgrade(mapUpgrade+1);
    console.log("Map upgraded!");
    console.log(mapUpgrade);
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
      <button onClick={startWave}>Start Next Wave (Wave {waveCount + 1})</button>
      <button onClick={fetchScore}>
            Fetch
      </button>
      <button onClick={handleMapUpgrade}>Map Upgrade</button>



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
          <button
            onClick={() => setSelectedTower("cannon")}
            style={{ marginRight: 10, padding: "6px 12px", fontWeight: selectedTower === "cannon" ? "bold" : "normal" }}
          >
            Cannon
          </button>
          <button
            onClick={() => setSelectedTower("slow")}
            style={{ marginRight: 10, padding: "6px 12px", fontWeight: selectedTower === "slow" ? "bold" : "normal" }}
          >
            Slow
          </button>
          <button
            onClick={() => setSelectedTower("acid")}
            style={{ marginRight: 10, padding: "6px 12px", fontWeight: selectedTower === "acid" ? "bold" : "normal" }}
          >
            Acid
          </button>
          <button
            onClick={() => setSelectedTower("chain")}
            style={{ marginRight: 10, padding: "6px 12px", fontWeight: selectedTower === "chain" ? "bold" : "normal" }}
          >
            Chain
          </button>
          <button
            onClick={() => setSelectedTower("sniper")}
            style={{ marginRight: 10, padding: "6px 12px", fontWeight: selectedTower === "sniper" ? "bold" : "normal" }}
          >
            Sniper
          </button>
          <button
            onClick={() => setSelectedTower("buff")}
            style={{ marginRight: 10, padding: "6px 12px", fontWeight: selectedTower === "buff" ? "bold" : "normal" }}
          >
            Buff
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

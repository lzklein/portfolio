import bottomForestSrc from "../assets/sprites/tiles/forest-1.png";
import midForestSrc from "../assets/sprites/tiles/forest-2.png";
import topLeftForestSrc from "../assets/sprites/tiles/forest-3.png";
import topRightForestSrc from "../assets/sprites/tiles/forest-4.png";
import bottomTreesSrc from "../assets/sprites/tiles/trees-1.png";
import midTreesSrc from "../assets/sprites/tiles/trees-2.png";
import topLeftTreesSrc from "../assets/sprites/tiles/trees-3.png";
import topRightTreesSrc from "../assets/sprites/tiles/trees-4.png";
import stumpsSrc from "../assets/sprites/tiles/stumps.png";
import riverSrc from "../assets/sprites/tiles/water.png";
import bridgeSrc from "../assets/sprites/tiles/bridge.png";
import grassFenceSrc from "../assets/sprites/tiles/fence-1.png";
import pathFenceSrc from "../assets/sprites/tiles/fence-2.png";
import pathVar1Src from "../assets/sprites/tiles/dirt-1.png";
import pathVar2Src from "../assets/sprites/tiles/dirt-2.png";
import pathVar3Src from "../assets/sprites/tiles/dirt-3.png";
import pathVar4Src from "../assets/sprites/tiles/dirt-4.png";
import gateSrc from "../assets/sprites/tiles/gate.png";


export const TILE_TYPES = {
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

  "R": { name: "River", walkable: false, sprite: riverSrc, animated:true  },
  "E": { name: "Bridge", walkable: true, sprite: bridgeSrc },

  "P": { name: "Path", walkable: true, sprites: [pathVar1Src, pathVar2Src, pathVar3Src, pathVar4Src] },
  "M": { name: "FenceGrass", walkable: false, sprite: grassFenceSrc },
  "N": { name: "FencePath", walkable: false, sprite: pathFenceSrc },
  "G": { name: "Gate", walkable: true, sprite: gateSrc },
};


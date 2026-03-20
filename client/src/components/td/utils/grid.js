import { TILE_TYPES } from "../config/tiles";

export const getGridFromBoard = (board) => {
  return board.map(row =>
    row.map(tile => (TILE_TYPES[tile]?.walkable ? 0 : 1))
  );
}
import { ENEMY_TYPES } from "../config/enemies";
import { TOWER_TYPES } from "../config/towers";
import { SPRITE_PATHS } from "../config/assets";

export const getSpritePath = (type, category) => {
  const spriteName =
    category === "enemy"
      ? ENEMY_TYPES[type]?.sprite
      : TOWER_TYPES[type]?.sprite;

  return spriteName ? SPRITE_PATHS[spriteName] || null : null;
}
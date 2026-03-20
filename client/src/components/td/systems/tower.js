import { applyDamage } from "../combat/damageSystem.js";

export const updateTowers = (state, now) => {
  const { towers, entities, projectiles } = state;

  towers.forEach((tower) => {
    if (!tower.fireRate) return;

    if (!tower.lastShotTime) tower.lastShotTime = 0;
    if (now - tower.lastShotTime < tower.fireRate) return;

    tower.lastShotTime = now;

    const inRange = entities.filter((e) => {
      const dx = (e.x + e.frameWidth / 2) - ((tower.x + 0.5) * TILE_SIZE);
      const dy = (e.y + e.frameHeight / 2) - ((tower.y + 0.5) * TILE_SIZE);
      return Math.sqrt(dx*dx + dy*dy) <= tower.range;
    });

    if (inRange.length === 0) return;

    const target = inRange.reduce((f, e) =>
      !f || e.progress > f.progress ? e : f
    , null);

    switch (tower.sprite) {
      case "sniper":
        applyDamage(target, { damage: tower.damage });
        return;

      case "chain":
        projectiles.push({
          ...baseProjectile(tower, target),
          isChain: true,
          bounce: tower.bounce || 0,
          hitSet: new Set()
        });
        return;

      case "slow":
        projectiles.push({
          ...baseProjectile(tower, target),
          isSlow: true
        });
        return;

      default:
        projectiles.push(baseProjectile(tower, target));
    }
  });
}

const baseProjectile = (tower, target) => {
  return {
    id: Date.now() + Math.random(),
    x: (tower.x + 0.5) * TILE_SIZE,
    y: (tower.y + 0.5) * TILE_SIZE,
    targetId: target.id,
    speed: tower.bulletSpeed,
    damage: tower.damage,
    range: tower.range,
    distanceTraveled: 0,
    dx: target.x - tower.x,
    dy: target.y - tower.y,
  };
}
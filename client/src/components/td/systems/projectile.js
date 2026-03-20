import { applyDamage } from "../combat/damageSystem.js";

export const updateProjectiles = (state) => {
  const { projectiles, entities, lightnings } = state;

  const updated = [];

  projectiles.forEach((p) => {

    if (p.isChain) {
      handleChain(p, entities, lightnings);
      return;
    }

    const angle = Math.atan2(p.dy, p.dx);
    const moveX = Math.cos(angle) * p.speed;
    const moveY = Math.sin(angle) * p.speed;

    const newX = p.x + moveX;
    const newY = p.y + moveY;

    const target = entities.find(e => e.id === p.targetId);

    if (target && hit(target, newX, newY)) {
      applyDamage(target, p);
      return;
    }

    if (p.distanceTraveled <= p.range) {
      updated.push({
        ...p,
        x: newX,
        y: newY,
        distanceTraveled: p.distanceTraveled + p.speed
      });
    }
  });

  state.projectiles = updated;
}

const hit = (e, x, y) => {
  const dx = (e.x + e.frameWidth/2) - x;
  const dy = (e.y + e.frameHeight/2) - y;
  return Math.sqrt(dx*dx + dy*dy) < e.frameWidth/2;
}
export const updateEntities = (state, delta) => {
  const { entities } = state;

  for (let i = entities.length - 1; i >= 0; i--) {
    const e = entities[i];

    if (e.hp <= 0) {
      entities.splice(i, 1);
      continue;
    }

    if (!e.path || e.path.length === 0) continue;

    const [tx, ty] = e.path[0];

    const targetX = tx * TILE_SIZE;
    const targetY = ty * TILE_SIZE;

    const dx = targetX - e.x;
    const dy = targetY - e.y;

    const step = e.speed * (delta / 16);

    if (Math.abs(dx) > Math.abs(dy)) {
      e.x += Math.sign(dx) * step;
    } else {
      e.y += Math.sign(dy) * step;
    }

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
      e.path.shift();
    }
  }
}
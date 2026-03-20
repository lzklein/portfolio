export const renderGame = (ctx, state, assets) => {
  const { towers, projectiles, entities, lightnings, health } = state;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  drawBoard(ctx, assets);
  drawTowers(ctx, towers, assets);
  drawEntities(ctx, entities, assets);
  drawProjectiles(ctx, projectiles, assets);
  drawLightning(ctx, lightnings);
  drawUI(ctx, health, assets);
}

export function renderGame(ctx, state, assets, timestamp) {
  const drawItems = [];

  drawLightningLayer(ctx, state.lightnings);
  collectProjectileDraws(drawItems, state, assets);
  collectTowerDraws(drawItems, state, assets);
  collectEntityDraws(drawItems, state, assets, timestamp);

  drawItems.sort((a, b) => a.z - b.z);
  drawItems.forEach(item => drawItem(ctx, item));
}
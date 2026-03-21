export const runGameLoop = (update, render) => {
  let lastTime = performance.now();

  function loop(time) {
    const delta = time - lastTime;
    lastTime = time;

    update(delta);
    render();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
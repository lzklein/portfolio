export const spawnEntity = (state, type) => {
  const id = state.nextId++;

  state.entities.push({
    id,
    type,
    x: 0,
    y: 0,
    hp: 10,
    path: [],
  });
}
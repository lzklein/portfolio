export const createGameState = () => {
  return {
    entities: [],
    towers: [],
    projectiles: [],
    lightnings: [],
    health: 100,
    nextId: 0,
  };
}
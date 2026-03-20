export function groupEnemies(waves) {
  const counts = {};
  waves.flat().forEach(enemy => {
    counts[enemy] = (counts[enemy] || 0) + 1;
  });
  return Object.entries(counts);
}
export const findPath = (grid, start, goal) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [0, 1],[1, 0],[0, -1],[-1, 0],
  ];

  const queue = [[start]];
  const visited = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  visited[start[1]][start[0]] = true;

  while (queue.length > 0) {
    const path = queue.shift();
    const [x, y] = path[path.length - 1];

    if (x === goal[0] && y === goal[1]) return path;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 && nx < cols &&
        ny >= 0 && ny < rows &&
        grid[ny][nx] === 0 &&
        !visited[ny][nx]
      ) {
        visited[ny][nx] = true;
        queue.push([...path, [nx, ny]]);
      }
    }
  }

  return null;
}
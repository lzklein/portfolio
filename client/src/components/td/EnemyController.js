import React from 'react'

const EnemyController = ({ spawnEntity }) => {
  const enemies = ["imp", "elite", "fast", "splitter", "flyer", "boss"];

  return (
    <div style={{ marginTop: 6 }}>
      {enemies.map((e) => (
        <button key={e} onClick={() => spawnEntity(e)}>
          {e}
        </button>
      ))}
    </div>
  );
}

export default EnemyController
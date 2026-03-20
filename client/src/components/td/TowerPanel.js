import React from 'react'

const TowerPanel = ({
  selectedTower,
  setSelectedTower,
  towerCounts,
}) => {
  const towers = ["wall","arrow","cannon","slow","acid","chain","sniper","buff"];

  return (
    <div style={{ marginTop: 10 }}>
      {towers.map((tower) => (
        <button
          key={tower}
          onClick={() => setSelectedTower(tower)}
          style={{
            fontWeight: selectedTower === tower ? "bold" : "normal",
          }}
        >
          {tower} {towerCounts[tower]}
        </button>
      ))}
    </div>
  );
}


export default TowerPanel
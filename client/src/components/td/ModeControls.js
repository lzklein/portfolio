import React from 'react'

const ModeControls = ({
  placeWallMode,
  setPlaceWallMode,
  demolishMode,
  setDemolishMode,
  shootMode,
  setShootMode,
  showRange,
  setShowRange,
}) => {
  return (
    <>
      <button onClick={() => setPlaceWallMode(m => !m)}>
        {placeWallMode ? "Exit Wall Mode" : "Wall Mode"}
      </button>

      <button onClick={() => {
        setDemolishMode(!demolishMode);
        setPlaceWallMode(false);
      }}>
        {demolishMode ? "Cancel Demolish" : "Demolish"}
      </button>

      <button onClick={() => {
        setShootMode(s => !s);
        setPlaceWallMode(false);
        setDemolishMode(false);
      }}>
        {shootMode ? "Shoot Mode: ON" : "Shoot Mode: OFF"}
      </button>

      <button onClick={() => setShowRange(v => !v)}>
        Show Range
      </button>
    </>
  );
}


export default ModeControls
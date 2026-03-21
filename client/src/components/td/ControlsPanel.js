import React from 'react'
import EnemyController from "./EnemyController";

const ControlsPanel = ({
  showEnemyButtons,
  setShowEnemyButtons,
  spawnEntity,
  startWave,
  waveCount,
  fetchScore,
  handleMapUpgrade,
  setShowBonusModal,
}) => {  return (
    <div style={{ marginBottom: 10 }}>

      <button onClick={() => setShowEnemyButtons(v => !v)}>
        {showEnemyButtons ? "Hide Enemies" : "Spawn Enemy"}
      </button>

      {showEnemyButtons && (
        <EnemyController spawnEntity={spawnEntity} />
      )}

      <button onClick={startWave}>
        Start Next Wave (Wave {waveCount + 1})
      </button>

      <button onClick={fetchScore}>Fetch</button>
      <button onClick={handleMapUpgrade}>Map Upgrade</button>
      <button onClick={() => setShowBonusModal(true)}>
        Bonus Challenge
      </button>

    </div>
  );
}

export default ControlsPanel
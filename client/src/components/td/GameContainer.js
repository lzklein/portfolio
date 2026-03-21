import React from "react";
import GameCanvas from "./GameCanvas";
import ControlsPanel from "./ControlsPanel";
import BonusModal from "./BonusModal";
import TowerPanel from "./TowerPanel";
import ModeControls from "./ModeControls";

export default function GameContainer(props) {
  const {
    showBonusModal,
    placeWallMode,
  } = props;

  return (
    <div style={{ textAlign: "center", position: "relative", display: "inline-block" }}>
      
      <ControlsPanel {...props} />

      {showBonusModal && <BonusModal {...props} />}

      <GameCanvas {...props} />

      <div style={{ marginTop: 10 }}>
        <ModeControls {...props} />
      </div>

      {placeWallMode && <TowerPanel {...props} />}

    </div>
  );
}
import React, {useState, useEffect} from "react";
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
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(0);
  useEffect(()=>{
    if(click>2){
      setLoading(false);
    }
  },[click])

  if (loading) {
    return (
      <div       style={{
        textAlign: "center",
        padding: "100px 200px 100px 200px",
        marginBottom: "60px",
        border: "2px solid #ffffff",
        borderRadius: "12px",
        backgroundColor: "rgba(255, 255, 255, 0.05)", // subtle glass look
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "0 0 20px rgba(100,150,255,0.15)",
      }} onClick={()=>setClick(click+1)}>
        <h3 style={{marginBottom:"40px"}}>🚧 Feature Under Construction 🚧</h3>
        <p>This area is still being built.</p>
      </div>
    );
  }
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
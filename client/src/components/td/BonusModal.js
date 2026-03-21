import React from 'react'

const modalStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "1088px",
  height: "704px",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  borderRadius: "4px",
};

const innerStyles = {
  background: "#222",
  color: "#fff",
  padding: "20px",
  borderRadius: "12px",
  width: "80%",
  maxHeight: "80vh",
  overflowY: "auto",
};

const BonusModal = ({
  bonusChallenges,
  selectedChallenges,
  toggleChallengeSelection,
  confirmSelectedChallenges,
  groupEnemies,
  getSpritePath,
}) => {
  return (
    <div className="bonus-modal" style={{ ...modalStyles }}>
      <div style={{ ...innerStyles }}>
        <h2>Bonus Challenges</h2>

        {bonusChallenges.map((challenge) => {
          const isSelected = selectedChallenges.some(c => c.id === challenge.id);

          return (
            <label key={challenge.id}>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleChallengeSelection(challenge)}
              />

              {/* Keep your existing JSX here unchanged */}
            </label>
          );
        })}

        <button onClick={confirmSelectedChallenges}>Confirm</button>
      </div>
    </div>
  );

}

export default BonusModal
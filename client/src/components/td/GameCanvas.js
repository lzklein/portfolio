import React from 'react'

const GameCanvas = ({ canvasRef, handleCanvasClick }) => {
  return (
    <>
      <br />
      <canvas
        ref={canvasRef}
        width={1088}
        height={704}
        onClick={handleCanvasClick}
        style={{ border: "2px solid black", imageRendering: "pixelated" }}
      />
      <br />
    </>
  );
}

export default GameCanvas
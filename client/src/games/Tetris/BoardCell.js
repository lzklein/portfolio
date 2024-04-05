import React from 'react'

const BoardCell = ({cell}) => {
  return (
    <div className={`Boardcell ${cell.className}`}>
        <div className='Sparkle'></div>
    </div>
  )
}

export default BoardCell
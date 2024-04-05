import React from 'react'

const Gamestats = ({gameStats}) => {
  const {level, points, linesCompleted, linesPerLevel} = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;

  return (
    <ul className='GameStats GameStats__right'>
        <li>Level</li>
        <li className='value'>{level}</li>
        <li>Next Level</li>
        <li className='value'>{linesToLevel}</li>
        <li>Score</li>
        <li className='value'>{points}</li>
    </ul>
  )
}

export default React.memo(Gamestats);
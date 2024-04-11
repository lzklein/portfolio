import React from 'react'

import Preview from './Preview.js';

const Previews = ({shapes}) => {

    const previewShapes = () => shapes.slice(1-shapes.length).reverse();

  return (
    <div>
        {previewShapes.map((shape, i) => (
            <Preview shape = {shape} index={i} key={i}/>
        ))}
    </div>
  )
}

export default React.memo(Previews);
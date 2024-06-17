import React from 'react'

// maybe add arcade easter egg here
// have side nav thing to jump around the page with project name, https://brittanychiang.com/ like this thing
// 3d effect, put projects in cards and hover moves card forward?
const projects = () => {
  return (
    <div>
      <h1>Projects</h1>
      <div className='project-card'>
        <h2>SmokePlus Online Storefront</h2>
        <a href="https://smokeplus.onrender.com/" target="_blank" rel="noreferrer">https://smokeplus.onrender.com/</a>
        {/* replace a with screenshot image, links to site */}
        <p>description goes here</p>
        {/* 3 bullet points of site function, technology used */}
        {/* maybe technology used as separate thing */}
        {/* hard code or auto components? */}
      </div>
      <div  className='project-card'>
        <h2>WangusBot</h2>
        <p>maybe an image here?</p>
        <p>description goes here</p>
      </div>
    </div>
  )
}

export default projects
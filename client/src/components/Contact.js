import React from 'react'
import Links from './Links.js'

const Contact = () => {
  return (
    <div className="page">
      <h2>Contact Me</h2>

      <div className="contact-card">
        <Links/>
        <p className="contact-note">Socials are also available in the footer.</p>

        <form className="contact-form">
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Message" rows="5"></textarea>

          <button type="submit">Send Email</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
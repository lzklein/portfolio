import React, {useState} from 'react'
import Links from './Links.js'

const Contact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [obviousBotTrap, setObviousBotTrap] = useState("");

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
          <input type="text" name="company" style="display:none" />

          <button type="submit">Send Email</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
import React, {useState, useRef} from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import Links from './Links.js'

const Contact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [obviousBotTrap, setObviousBotTrap] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const recaptchaRef = useRef(null);

  const handleSubmit = (e) => {
      e.preventDefault();

      if(!email){
        alert("Please provide a return email");
        return;
      }

      if (!captchaVerified) {
        alert("Please verify the captcha before submitting.");
        return;
      }

      // TODO: send email to backend
      console.log({ email, subject, message, obviousBotTrap });

      setEmail("");
      setSubject("");
      setMessage("");
      setObviousBotTrap("");
      recaptchaRef.current.reset();
      setCaptchaVerified(false);
    };

  return (
    <div className="page">
      <h2>Contact Me</h2>

      <div className="contact-card">
        <Links/>
        <p className="contact-note">Socials are also available in the footer.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
          <input type="text" placeholder="Subject" onChange={(e)=>{setSubject(e.target.value)}} value={subject}/>
          <textarea placeholder="Message" rows="5" onChange={(e)=>{setMessage(e.target.value)}} value={message}></textarea>
          <input type="text" name="company" style={{display:"none"}} onChange={(e)=>{setObviousBotTrap(e.target.value)}} value={obviousBotTrap}/>

          <ReCAPTCHA
            sitekey="6LfmtoksAAAAAIrnAN9y5qb_I88CsWbFK33ZixAW"
            onChange={() => setCaptchaVerified(true)}
            ref={recaptchaRef}
          />

          <button type="submit">Send Email</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
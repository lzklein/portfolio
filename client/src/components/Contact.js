import React, {useState, useRef} from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import Links from './Links.js'

const Contact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [obviousBotTrap, setObviousBotTrap] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const recaptchaRef = useRef(null);

  const validEmailCheck = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return re.test(email);
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  if(!email){
    alert("Please provide a return email");
    return;
  }

  if (!validEmailCheck(email)){
    alert("Please provide a valid return email");
    return;
  }

  if (!captchaVerified) {
    alert("Please verify the captcha before submitting.");
    return;
  }

  setLoading(true);

  try {
    const token = recaptchaRef.current.getValue();

    const response = await fetch("http://localhost:8080/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        subject,
        message,
        company: obviousBotTrap,
        captchaToken: token
      }),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      alert(`Error: ${errorMsg}`);
      return;
    }

    alert("Message sent!");
    setEmail("");
    setSubject("");
    setMessage("");
    setObviousBotTrap("");
    recaptchaRef.current.reset();
    setCaptchaVerified(false);

  } catch (err) {
    console.error(err);
    alert("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page">
      <h2>Contact Me</h2>

      <div className="contact-card">
        {/* Loader overlay */}
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <div className="loader"></div>
          </div>
        )}

        <Links/>
        <p className="contact-note">Socials also available below in the footer</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            disabled={loading}
          />
          <textarea
            placeholder="Message"
            rows="5"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            disabled={loading}
          />
          <input
            type="text"
            name="company"
            style={{ display: "none" }}
            onChange={(e) => setObviousBotTrap(e.target.value)}
            value={obviousBotTrap}
            disabled={loading}
          />

          <ReCAPTCHA
            sitekey="6LfmtoksAAAAAIrnAN9y5qb_I88CsWbFK33ZixAW"
            onChange={() => setCaptchaVerified(true)}
            ref={recaptchaRef}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
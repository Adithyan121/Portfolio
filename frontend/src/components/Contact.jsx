import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import '../css/contact.css';

const Contact = () => {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('Email successfully sent!', result.text);
          setMessageSent(true);
          form.current.reset();
        },
        (error) => {
          console.log('Email sending failed...', error.text);
        }
      );
  };

  return (
    
      <div className="contact-container">
        <h2>Contact Me</h2>
        <p>Looking to hire a skilled MERN Stack Developer? Let's connect!</p>
        {messageSent && <p className="success-message">Message sent successfully!</p>}
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    
  );
};

export default Contact;

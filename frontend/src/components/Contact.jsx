import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import '../css/contact.css';

const Contact = () => {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const shapeC1 = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const shapeC2 = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

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
      <motion.div style={{ x: shapeC1, y: shapeC2 }} className="shape-contact-1" />
      <motion.div style={{ x: useTransform(shapeC1, v => -v), y: useTransform(shapeC2, v => -v) }} className="shape-contact-2" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <h2>Contact Me</h2>
        <p>Looking to hire a skilled MERN Stack Developer? Let's connect!</p>
      </motion.div>

      {messageSent && (
        <motion.p
          className="success-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Message sent successfully!
        </motion.p>
      )}

      <motion.form
        ref={form}
        onSubmit={sendEmail}
        className="contact-form"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false }}
      >
        <input type="text" name="user_name" placeholder="Your Name" required />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contact;

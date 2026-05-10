import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowRight } from 'react-icons/fi';

const ServiceAd = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the ad after 3 seconds of page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow)',
            borderRadius: '12px',
            padding: '16px',
            width: '300px',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          <button
            onClick={() => setIsVisible(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              borderRadius: '50%'
            }}
            aria-label="Close"
          >
            <FiX size={16} />
          </button>
          
          <div style={{ marginBottom: '12px', paddingRight: '20px' }}>
            <h4 style={{ 
              margin: '0 0 4px 0', 
              fontSize: '15px', 
              color: 'var(--text-primary)',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Need a Custom Website?
            </h4>
            <p style={{ 
              margin: 0, 
              fontSize: '13px', 
              color: 'var(--text-secondary)',
              lineHeight: '1.4'
            }}>
              I build fast, high-converting MERN stack applications for businesses.
            </p>
          </div>

          <a 
            href="https://dev-portfolio-flax-chi.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'var(--accent-gradient)',
              color: 'white',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Hire Me Now <FiArrowRight size={14} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceAd;

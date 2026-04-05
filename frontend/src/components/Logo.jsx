import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'normal', scrolled = false }) => {
  const isSmall = size === 'small';
  
  // Scrolled: light background, so text should be dark.
  // Not scrolled: dark background (hero), so text should be white.
  const textColor = scrolled ? 'var(--color-text)' : '#ffffff';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: isSmall ? '8px' : '12px' }}>
      <div style={{ position: 'relative', width: isSmall ? '32px' : '40px', height: isSmall ? '32px' : '40px' }}>
        {/* Animated Background Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--color-primary)',
            borderRadius: '50%',
            filter: 'blur(10px)',
            zIndex: 0
          }}
        />
        
        {/* Minimal Flame SVG */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
        >
          <motion.path
            d="M12 2C12 2 7 7 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 7 12 2 12 2Z"
            fill="var(--color-primary)"
            animate={{
              d: [
                "M12 2C12 2 7 7 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 7 12 2 12 2Z",
                "M12 3C12 3 7.5 7.5 7.5 12C7.5 14.7614 9.5 17 12 17C14.5 17 16.5 14.7614 16.5 12C16.5 7.5 12 3 12 3Z",
                "M12 2C12 2 7 7 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 7 12 2 12 2Z"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <path
            d="M12 7C12 7 10 9 10 11.5C10 12.8807 10.8954 14 12 14C13.1046 14 14 12.8807 14 11.5C14 9 12 7 12 7Z"
            fill="white"
            opacity="0.8"
          />
        </svg>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ 
          fontSize: isSmall ? '20px' : '26px', 
          fontWeight: '800', 
          color: textColor, 
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Səmalı
        </span>
        <span style={{ 
          fontSize: isSmall ? '10px' : '12px', 
          fontWeight: '600', 
          color: 'var(--color-primary)', 
          letterSpacing: '3px',
          marginTop: '2px',
          textTransform: 'uppercase'
        }}>
          FIRE
        </span>
      </div>
    </div>
  );
};

export default Logo;

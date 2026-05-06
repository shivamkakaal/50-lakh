'use client';

import { useEffect, useState, useRef } from 'react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const lastScrollY = useRef(0);
  const isMobile = useRef(false);

  useEffect(() => {
    // Check if already shown in this session
    if (typeof window !== 'undefined') {
      const shown = sessionStorage.getItem('exitIntentShown');
      if (shown) {
        setHasShown(true);
        return;
      }
      isMobile.current = window.innerWidth < 768;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Desktop: Trigger when mouse goes above viewport
      if (!isMobile.current && e.clientY < 10 && !hasShown) {
        triggerPopup();
      }
    };

    const handleScroll = () => {
      // Mobile: Trigger on rapid scroll up
      if (isMobile.current && !hasShown) {
        const currentScrollY = window.scrollY;
        const scrollSpeed = lastScrollY.current - currentScrollY;
        
        // If scrolling up faster than 50px per event
        if (scrollSpeed > 50 && currentScrollY > 200) {
          triggerPopup();
        }
        lastScrollY.current = currentScrollY;
      }
    };

    const triggerPopup = () => {
      setIsVisible(true);
      setHasShown(true);
      sessionStorage.setItem('exitIntentShown', 'true');
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShown]);

  if (!isVisible) return null;

  const handleSupportClick = () => {
    setIsVisible(false);
    const donateSection = document.getElementById('donate');
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: 'smooth' });
      // We could ideally pre-select ₹10 here if we passed a callback
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ padding: '32px 24px', maxWidth: 360, position: 'relative' }}>
        <div style={{
          width: 80,
          height: 80,
          background: 'var(--navy)',
          borderRadius: '50%',
          border: '2px solid var(--gold)',
          margin: '-72px auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          boxShadow: 'var(--shadow-gold)'
        }}>
          👨‍🦳
        </div>
        
        <h3 style={{ fontSize: 22, color: 'var(--white)', marginBottom: 12 }}>
          Rukiye...
        </h3>
        
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 24, fontStyle: 'italic', lineHeight: 1.5 }}>
          "Shayad aapko lagta hai ki ek choti rakam se kya hoga. Par sach yeh hai ki, 
          <strong style={{ color: 'var(--gold)', fontWeight: 600 }}> ₹10 bhi aaj humari bohot madad kar sakta hai.</strong>"
        </p>

        <button 
          className="btn btn-gold btn-full animate-pulse-glow" 
          onClick={handleSupportClick}
          style={{ padding: '16px 24px', fontSize: 18 }}
        >
          Support ₹10 🙏
        </button>

        <button 
          onClick={() => setIsVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 14,
            marginTop: 20,
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Not today
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Auto-play on first user interaction (click/touch anywhere on page)
    function handleFirstInteraction() {
      if (audioRef.current && !userPaused && !isPlaying) {
        audioRef.current.volume = 0.4;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    }

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [userPaused, isPlaying]);

  function togglePlay() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setUserPaused(true); // User manually paused, don't auto-resume
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        setUserPaused(false);
      }
    }
  }

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/Papa Meri Jaan Animal 128 Kbps.mp3" 
        loop 
        preload="auto"
      />
      
      <button 
        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
        className={`audio-btn ${isPlaying ? 'playing' : ''}`}
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
      >
        <span className="icon">
          {isPlaying ? '🔊' : '🔇'}
        </span>
      </button>
      
      <style jsx>{`
        .audio-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          background: rgba(10, 25, 47, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 213, 79, 0.3);
          color: var(--gold);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        .audio-btn:hover {
          border-color: var(--gold);
          transform: scale(1.1);
        }

        .audio-btn.playing {
          animation: pulse-ring 2s infinite;
        }

        .icon {
          font-size: 20px;
        }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(255, 213, 79, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 213, 79, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 213, 79, 0); }
        }
      `}</style>
    </>
  );
}

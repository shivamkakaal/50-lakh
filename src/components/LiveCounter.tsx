'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface LiveCounterProps {
  totalCollected: number;
  recentDonors: { name: string; amount: number }[];
}

export default function LiveCounter({ totalCollected, recentDonors }: LiveCounterProps) {
  const [displayAmount, setDisplayAmount] = useState(totalCollected);
  const [showNotification, setShowNotification] = useState(false);
  const [latestDonor, setLatestDonor] = useState<{ name: string; amount: number } | null>(null);
  const prevAmount = useRef(totalCollected);

  // Animated counter - scrolling effect when amount changes
  useEffect(() => {
    if (totalCollected === prevAmount.current) {
      setDisplayAmount(totalCollected);
      return;
    }

    const start = prevAmount.current;
    const end = totalCollected;
    const diff = end - start;
    const duration = 2000; // 2 seconds animation
    const startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      setDisplayAmount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    animate();
    prevAmount.current = totalCollected;
  }, [totalCollected]);

  // Show notification when new donor comes
  useEffect(() => {
    if (recentDonors.length > 0) {
      const latest = recentDonors[0];
      setLatestDonor(latest);
      setShowNotification(true);

      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000); // Show for 5 seconds

      return () => clearTimeout(timer);
    }
  }, [recentDonors]);

  // Live Viewers Presence Tracking
  const [liveViewers, setLiveViewers] = useState(1);

  useEffect(() => {
    // Generate a random ID for this session
    const sessionId = Math.random().toString(36).substring(2, 15);
    
    const roomOne = supabase.channel('online-users', {
      config: {
        presence: {
          key: sessionId,
        },
      },
    });

    roomOne
      .on('presence', { event: 'sync' }, () => {
        const newState = roomOne.presenceState();
        // Count total number of keys in the presence state object
        setLiveViewers(Object.keys(newState).length || 1);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        // Optional: can handle joins if needed
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        // Optional: can handle leaves if needed
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          const presenceTrackStatus = await roomOne.track({
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(roomOne);
    };
  }, []);

  return (
    <>
      {/* Fixed Top-Right Live Counter */}
      <div className="live-counter">
        <div className="counter-inner">
          <div className="live-dot-wrap">
            <span className="live-dot" />
            <span className="live-text">LIVE</span>
          </div>
          <div className="counter-amount">
            ₹{displayAmount.toLocaleString('en-IN')}
          </div>
          <div className="counter-label">collected</div>
          <div style={{
            marginTop: '8px',
            background: 'rgba(255,255,255,0.05)',
            padding: '4px 8px',
            borderRadius: '10px',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.7)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'var(--font-display)'
          }}>
            <span style={{ fontSize: '12px' }}>👁️</span> {liveViewers} viewing now
          </div>
        </div>
      </div>

      {/* Floating Donation Notification Toast */}
      {showNotification && latestDonor && (
        <div className={`donor-toast ${showNotification ? 'show' : ''}`}>
          <div className="toast-icon">🎉</div>
          <div className="toast-content">
            <span className="toast-name">{latestDonor.name || 'Anonymous'}</span>
            <span className="toast-amount">donated ₹{latestDonor.amount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .live-counter {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 999;
          background: rgba(10, 25, 47, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 213, 79, 0.25);
          border-radius: 14px;
          padding: 12px 18px;
          min-width: 140px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .counter-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .live-dot-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #48BB78;
          animation: blink 1.5s infinite;
        }

        .live-text {
          font-size: 10px;
          font-weight: 700;
          color: #48BB78;
          letter-spacing: 2px;
          font-family: var(--font-display);
        }

        .counter-amount {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          color: var(--gold);
          letter-spacing: -0.5px;
          line-height: 1.1;
        }

        .counter-label {
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Donor Toast Notification */
        .donor-toast {
          position: fixed;
          top: 100px;
          right: 16px;
          z-index: 998;
          background: rgba(10, 25, 47, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 213, 79, 0.2);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          transform: translateX(120%);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          max-width: 260px;
        }

        .donor-toast.show {
          transform: translateX(0);
          opacity: 1;
        }

        .toast-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .toast-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .toast-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: white;
        }

        .toast-amount {
          font-size: 12px;
          color: var(--gold);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .live-counter {
            top: 10px;
            right: 10px;
            padding: 8px 14px;
            min-width: 110px;
          }
          .counter-amount {
            font-size: 18px;
          }
          .donor-toast {
            top: 80px;
            right: 10px;
            max-width: 220px;
          }
        }
      `}</style>
    </>
  );
}

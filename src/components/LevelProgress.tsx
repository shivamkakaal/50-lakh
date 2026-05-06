'use client';

import ProgressBar from './ProgressBar';
import CountdownTimer from './CountdownTimer';
import { PHASE_COLORS } from '@/lib/constants';
import type { Level } from '@/lib/types';
import { useEffect, useState } from 'react';

interface LevelProgressProps {
  level: Level;
}

export default function LevelProgress({ level }: LevelProgressProps) {
  const [isRescueMode, setIsRescueMode] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const phaseColor = PHASE_COLORS[level.phase] || 'var(--gold)';
  const remaining = level.target_amount - level.collected_amount;
  const isComplete = remaining <= 0;

  useEffect(() => {
    if (isComplete) {
      setIsRescueMode(false);
      return;
    }

    const checkRescueMode = () => {
      const msRemaining = new Date(level.deadline).getTime() - Date.now();
      const hoursRemaining = msRemaining / (1000 * 60 * 60);
      
      if (msRemaining <= 0 && remaining > 0) {
        // Level Failed
        setIsFailed(true);
        setIsRescueMode(false);
      } else if (hoursRemaining > 0 && hoursRemaining <= 4 && remaining > 0) {
        // Rescue Mode
        setIsRescueMode(true);
        setIsFailed(false);
      } else {
        // Normal Mode
        setIsRescueMode(false);
        setIsFailed(false);
      }
    };

    checkRescueMode();
    const interval = setInterval(checkRescueMode, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [level.deadline, isComplete]);

  // If in rescue mode, override phase color with alert red. If failed, use muted gray.
  const activeColor = isFailed ? '#718096' : (isRescueMode ? '#E53E3E' : phaseColor);

  return (
    <section className="section">
      <div className="container">
        <span className="section-label">Current Level</span>

        <div className="card" style={{
          borderTop: `3px solid ${activeColor}`,
          padding: '24px 20px',
          boxShadow: isRescueMode ? '0 0 20px rgba(229, 62, 62, 0.3)' : 'none',
          animation: isRescueMode ? 'pulse-border 2s infinite' : 'none',
          opacity: isFailed ? 0.85 : 1,
          filter: isFailed ? 'grayscale(0.6)' : 'none'
        }}>
          {isRescueMode && (
            <div style={{
              background: '#E53E3E',
              color: 'white',
              textAlign: 'center',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: 12,
              fontWeight: 'bold',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 16,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6
            }}>
              <span className="pulse-dot">🚨</span> RESCUE MODE ACTIVATED
            </div>
          )}
          {isFailed && (
            <div style={{
              background: '#4A5568',
              color: 'white',
              textAlign: 'center',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: 12,
              fontWeight: 'bold',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 16,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6
            }}>
              ⚠️ LEVEL FAILED
            </div>
          )}
          {/* Level header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <span className="badge" style={{
                background: `${activeColor}22`,
                color: activeColor,
                border: `1px solid ${activeColor}44`,
                marginBottom: 8,
              }}>
                {level.phase.toUpperCase()} PHASE
              </span>
              <h3 style={{ marginTop: 8, fontSize: 22 }}>
                Level {level.level_number} — {level.name}
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block' }}>
                TARGET
              </span>
              <span className="mono" style={{ fontSize: 22, color: 'var(--gold)', fontWeight: 700 }}>
                ₹{level.target_amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Emotional context */}
          <p style={{
            fontSize: 14,
            fontStyle: 'italic',
            color: isFailed ? '#A0AEC0' : (isRescueMode ? '#FC8181' : 'rgba(255,255,255,0.5)'),
            marginBottom: 20,
            borderLeft: `2px solid ${activeColor}`,
            paddingLeft: 12,
            fontWeight: (isRescueMode || isFailed) ? 500 : 400
          }}>
            {isFailed 
              ? "Hum yeh level haar gaye... par ladai abhi khatam nahi hui hai. Humein aur zor lagana hoga." 
              : isRescueMode 
                ? "We are running out of time. Your help is urgently needed right now." 
                : `"${level.emotional_context}"`}
          </p>

          {/* Progress */}
          <ProgressBar current={level.collected_amount} total={level.target_amount} />

          {/* Remaining */}
          <div style={{
            textAlign: 'center',
            marginTop: 12,
            marginBottom: 20,
          }}>
            {remaining > 0 ? (
              <p className="mono" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                ₹{remaining.toLocaleString('en-IN')} remaining
              </p>
            ) : (
              <p className="mono" style={{ fontSize: 14, color: 'var(--success)', margin: 0 }}>
                ✅ Level Complete!
              </p>
            )}
          </div>

          {/* Countdown */}
          <div style={{
            background: 'rgba(0,0,0,0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 12px',
          }}>
            <p style={{
              textAlign: 'center',
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              {isFailed ? '⏰ Time Passed' : '⏰ Time Remaining'}
            </p>
            {isFailed ? (
              <div style={{ textAlign: 'center', color: '#A0AEC0', fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 'bold' }}>
                00 : 00 : 00
              </div>
            ) : (
              <CountdownTimer deadline={level.deadline} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

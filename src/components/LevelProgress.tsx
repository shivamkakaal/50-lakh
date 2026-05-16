'use client';

import ProgressBar from './ProgressBar';
import CountdownTimer from './CountdownTimer';
import { PHASE_COLORS } from '@/lib/constants';
import type { Level } from '@/lib/types';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface LevelProgressProps {
  level: Level;
}

export default function LevelProgress({ level }: LevelProgressProps) {
  const [isRescueMode, setIsRescueMode] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);

  const phaseColor = PHASE_COLORS[level.phase] || 'var(--gold)';
  const remaining = level.target_amount - level.collected_amount;
  const isComplete = remaining <= 0;

  useEffect(() => {
    if (isFailed) {
      document.body.classList.add('failed-state');
    } else {
      document.body.classList.remove('failed-state');
    }
    return () => document.body.classList.remove('failed-state');
  }, [isFailed]);

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

  async function handleRecovery(type: 'extend' | 'restart') {
    setIsRecovering(true);
    try {
      // Calculate new deadline based on type
      // Extend: adds 50% more time (for MVP, let's add 2 days)
      // Restart: fresh 5 days
      const daysToAdd = type === 'extend' ? 2 : 5;
      const newDeadline = new Date();
      newDeadline.setDate(newDeadline.getDate() + daysToAdd);

      // Attempt to update the level deadline
      const { error } = await supabase
        .from('levels')
        .update({ deadline: newDeadline.toISOString() })
        .eq('id', level.id);

      if (error) {
        console.error('Failed to recover level:', error);
        alert('Could not update level. Admin needs to allow public recovery or do it from Admin Panel.');
      } else {
        // Success, local state will update via realtime subscription in page.tsx
        alert(type === 'extend' ? 'Level extended! The journey continues.' : 'Level restarted with fresh energy!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRecovering(false);
    }
  }

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

          {/* Countdown or Recovery Options */}
          {isFailed ? (
            <div style={{
              marginTop: 24,
              padding: '24px',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center',
              animation: 'fade-in 1s ease-out'
            }}>
              <h4 style={{ color: 'white', marginBottom: 16, fontSize: 18 }}>The story doesn&apos;t end here.</h4>
              <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
                <button 
                  onClick={() => handleRecovery('extend')}
                  disabled={isRecovering}
                  style={{
                    padding: '14px',
                    background: 'var(--gold)',
                    color: 'var(--navy)',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: 15,
                    cursor: isRecovering ? 'not-allowed' : 'pointer',
                    opacity: isRecovering ? 0.7 : 1
                  }}
                >
                  ⏳ Extend This Level (Add Time)
                </button>
                <button 
                  onClick={() => handleRecovery('restart')}
                  disabled={isRecovering}
                  style={{
                    padding: '14px',
                    background: 'transparent',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: 15,
                    cursor: isRecovering ? 'not-allowed' : 'pointer',
                    opacity: isRecovering ? 0.7 : 1
                  }}
                >
                  🔄 Restart Level (Fresh Energy)
                </button>
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 16, marginBottom: 0 }}>
                Progress is kept safe. We carry it forward.
              </p>
            </div>
          ) : (
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
                ⏰ Time Remaining
              </p>
              <CountdownTimer deadline={level.deadline} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

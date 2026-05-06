'use client';

import ProgressBar from './ProgressBar';
import { TOTAL_GOAL } from '@/lib/constants';

interface HeroSectionProps {
  totalCollected: number;
  totalSupporters: number;
  streakDay: number;
  onSupportClick: () => void;
}

export default function HeroSection({ totalCollected, totalSupporters, streakDay, onSupportClick }: HeroSectionProps) {
  const percentage = ((totalCollected / TOTAL_GOAL) * 100).toFixed(1);

  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 48, position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: -120,
        right: -120,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,213,79,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        {/* Streak Badge */}
        {streakDay > 0 && (
          <div className="animate-fadeIn" style={{ marginBottom: 20 }}>
            <span className="badge badge-gold">
              🔥 Day {streakDay} of showing up
            </span>
          </div>
        )}

        {/* Headline */}
        <h1 className="animate-slideUp" style={{ marginBottom: 12 }}>
          ₹50,00,000 Loan.
          <br />
          <span style={{ color: 'var(--gold)' }}>1 Son. 1 Mission.</span>
        </h1>

        <p className="animate-slideUp delay-100" style={{
          fontSize: 16,
          color: 'rgba(255,255,255,0.6)',
          fontStyle: 'italic',
          marginBottom: 32,
          maxWidth: 300,
        }}>
          Join my journey to save my family
        </p>

        {/* Characters placeholder */}
        <div className="animate-fadeIn delay-200" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          marginBottom: 32,
        }}>
          <div className="animate-float" style={{
            width: 80,
            height: 100,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ fontSize: 40 }}>👨‍🦳</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>Papa</span>
          </div>
          <div className="animate-float delay-200" style={{
            width: 80,
            height: 100,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ fontSize: 40 }}>👨</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>Beta</span>
          </div>
        </div>

        {/* Progress */}
        <div className="animate-slideUp delay-300" style={{ marginBottom: 16 }}>
          <ProgressBar current={totalCollected} total={TOTAL_GOAL} />
          <p style={{
            textAlign: 'center',
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            marginTop: 8,
            marginBottom: 0,
          }}>
            <span className="mono">₹{totalCollected.toLocaleString('en-IN')}</span> of <span className="mono" style={{ color: 'var(--gold)' }}>₹50,00,000</span>
          </p>
        </div>

        {/* Social Proof */}
        <div className="animate-fadeIn delay-400" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
          marginBottom: 28,
        }}>
          <span className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            🙏 {totalSupporters} supporters
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>•</span>
          <span className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            📊 {percentage}% raised
          </span>
        </div>

        {/* CTA */}
        <div className="animate-slideUp delay-500">
          <button
            className="btn btn-gold btn-full animate-pulse-glow"
            onClick={onSupportClick}
            id="hero-support-btn"
            style={{ fontSize: 18, padding: '16px 32px' }}
          >
            Support Now →
          </button>
        </div>

        {/* Scroll hint */}
        <p style={{
          textAlign: 'center',
          marginTop: 24,
          fontSize: 13,
          color: 'rgba(255,255,255,0.3)',
          marginBottom: 0,
        }}>
          ↓ Read the full story
        </p>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  deadline: string;
  onExpire?: () => void;
}

export default function CountdownTimer({ deadline, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      const left = getTimeLeft(deadline);
      setTimeLeft(left);
      if (left.total <= 0) {
        clearInterval(timer);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline, onExpire]);

  const isUrgent = timeLeft.total > 0 && timeLeft.total < 3600000; // < 1 hour

  if (timeLeft.total <= 0) {
    return (
      <div className="countdown urgent">
        <div className="countdown-unit">
          <span className="countdown-value">⏰</span>
          <span className="countdown-label">Time Up</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`countdown ${isUrgent ? 'urgent' : ''}`}>
      {timeLeft.days > 0 && (
        <>
          <div className="countdown-unit">
            <span className="countdown-value">{pad(timeLeft.days)}</span>
            <span className="countdown-label">Days</span>
          </div>
          <span className="countdown-sep">:</span>
        </>
      )}
      <div className="countdown-unit">
        <span className="countdown-value">{pad(timeLeft.hours)}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <span className="countdown-sep">:</span>
      <div className="countdown-unit">
        <span className="countdown-value">{pad(timeLeft.minutes)}</span>
        <span className="countdown-label">Min</span>
      </div>
      <span className="countdown-sep">:</span>
      <div className="countdown-unit">
        <span className="countdown-value">{pad(timeLeft.seconds)}</span>
        <span className="countdown-label">Sec</span>
      </div>
    </div>
  );
}

function getTimeLeft(deadline: string) {
  const total = Math.max(new Date(deadline).getTime() - Date.now(), 0);
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

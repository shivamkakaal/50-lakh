'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  height?: number;
}

export default function ProgressBar({ current, total, showLabel = true, height = 12 }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div>
      <div className="progress-wrap" style={{ height }}>
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            ₹{current.toLocaleString('en-IN')}
          </span>
          <span className="mono" style={{ fontSize: 13, color: 'var(--gold)' }}>
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}

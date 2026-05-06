'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface CreatorLog {
  id: string;
  log_date: string;
  video_url: string;
  update_text: string;
  personal_earnings: number;
  daily_donations: number;
  streak_day: number;
}

export default function DailyLogs() {
  const [logs, setLogs] = useState<CreatorLog[]>([]);

  useEffect(() => {
    async function fetchLogs() {
      const { data } = await supabase
        .from('creator_logs')
        .select('*')
        .order('log_date', { ascending: false })
        .limit(3);

      if (data) {
        setLogs(data);
      }
    }
    fetchLogs();
  }, []);

  if (logs.length === 0) return null;

  return (
    <section className="section" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        <span className="section-label" style={{ color: 'var(--navy)' }}>Journey Log</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 24, color: 'var(--navy)' }}>Daily Updates</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {logs.map((log) => (
            <div key={log.id} style={{
              background: 'var(--white)',
              borderRadius: 12,
              padding: 20,
              boxShadow: 'var(--shadow-sm)',
              borderLeft: '4px solid var(--gold)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="badge" style={{ background: 'rgba(255,213,79,0.2)', color: 'var(--gold-dark)', fontWeight: 600 }}>
                    {new Date(log.log_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  {log.streak_day > 1 && (
                    <span style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '3px 8px', borderRadius: 12, fontSize: 11, fontWeight: 700,
                      background: log.streak_day >= 7 ? 'rgba(255,100,0,0.15)' : 'rgba(255,165,0,0.1)',
                      color: log.streak_day >= 7 ? '#FF4500' : '#FF8C00',
                      border: `1px solid ${log.streak_day >= 7 ? 'rgba(255,69,0,0.3)' : 'rgba(255,140,0,0.2)'}`
                    }}>
                      🔥 Day {log.streak_day}
                    </span>
                  )}
                </div>
                {log.personal_earnings > 0 && (
                  <span style={{ fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>
                    Earned: ₹{Number(log.personal_earnings).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              {/* Personal vs Community Tracker Card */}
              <div style={{
                background: 'var(--navy-light)',
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
                display: 'flex',
                gap: 16,
                alignItems: 'center'
              }}>
                <div style={{ flex: 1, paddingRight: 16, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>My Effort Today</span>
                  <div style={{ fontSize: 18, color: 'var(--white)', fontWeight: 'bold' }}>
                    ₹{Number(log.personal_earnings).toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: 1 }}>From Community</span>
                  <div style={{ fontSize: 18, color: 'var(--gold)', fontWeight: 'bold' }}>
                    ₹{Number(log.daily_donations).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 15, color: 'var(--navy)', lineHeight: 1.6, marginBottom: 16 }}>
                &quot;{log.update_text}&quot;
              </p>
              
              {log.video_url && (
                <a 
                  href={log.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    color: 'var(--navy)',
                    textDecoration: 'none',
                    background: 'var(--off-white)',
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontWeight: 500,
                    border: '1px solid var(--border)'
                  }}
                >
                  ▶️ Watch Update Video
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

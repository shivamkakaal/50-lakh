'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Supporter {
  name: string;
  amount: number;
  selfie_url: string;
  created_at: string;
}

export default function SupporterGallery() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);

  useEffect(() => {
    async function fetchSupporters() {
      const { data, error } = await supabase
        .from('donations')
        .select('name, amount, selfie_url, created_at')
        .not('selfie_url', 'is', null)
        .eq('state', 'success')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) {
        setSupporters(data as Supporter[]);
      }
    }

    fetchSupporters();

    // Listen for new selfies in realtime
    const channel = supabase
      .channel('selfie_updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'donations' }, (payload) => {
        const updated = payload.new;
        if (updated.selfie_url && updated.state === 'success') {
          setSupporters(prev => {
            const newEntry = {
              name: updated.name || 'Anonymous',
              amount: Number(updated.amount),
              selfie_url: updated.selfie_url,
              created_at: updated.created_at
            };
            return [newEntry, ...prev].slice(0, 5);
          });
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (supporters.length === 0) {
    return (
      <section className="section" style={{ background: 'var(--navy)' }} id="supporter-gallery">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Wall of Love</span>
          <h2 className="section-title">Supporter Gallery</h2>
          <div className="section-divider" style={{ margin: '0 auto' }} />
          <div style={{ marginTop: '32px', padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '40px', margin: '0 0 16px' }}>📸</p>
            <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Be the First!</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '400px', margin: '0 auto' }}>
              Donate and share your selfie to appear on the Wall of Love. Show the world you support this mission.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ background: 'var(--navy)' }} id="supporter-gallery">
      <div className="container">
        <span className="section-label">Wall of Love</span>
        <h2 className="section-title">Supporter Gallery</h2>
        <div className="section-divider" />

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '24px'
        }}>
          {supporters.map((s, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              animation: `fadeInUp 0.5s ease forwards`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid var(--gold)',
                boxShadow: '0 0 20px rgba(255, 213, 79, 0.2)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 213, 79, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 213, 79, 0.2)';
                }}
              >
                <img
                  src={s.selfie_url}
                  alt={s.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{
                fontSize: '12px',
                color: 'white',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                maxWidth: '90px',
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {s.name || 'Anonymous'}
              </span>
              <span style={{
                fontSize: '11px',
                color: 'var(--gold)',
                fontWeight: 500
              }}>
                ₹{s.amount.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCollected: 0,
    totalDonations: 0,
    successDonations: 0,
    pendingDonations: 0,
    failedDonations: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const { data, error } = await supabase
        .from('donations')
        .select('amount, state');

      if (!error && data) {
        let collected = 0;
        let success = 0;
        let pending = 0;
        let failed = 0;

        data.forEach(d => {
          if (d.state === 'success') {
            collected += Number(d.amount);
            success++;
          } else if (d.state === 'pending') {
            pending++;
          } else if (d.state === 'failed') {
            failed++;
          }
        });

        setStats({
          totalCollected: collected,
          totalDonations: data.length,
          successDonations: success,
          pendingDonations: pending,
          failedDonations: failed
        });
      }
      setIsLoading(false);
    }

    loadStats();
  }, []);

  if (isLoading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: '8px' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Real-time metrics for Mission 50 Lakh</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        
        {/* Stat Card 1 */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px' }}>Total Collected</h3>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--success)', margin: 0 }}>
            ₹{stats.totalCollected.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Stat Card 2 */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px' }}>Successful Donations</h3>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>
            {stats.successDonations}
          </p>
        </div>

        {/* Stat Card 3 */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px' }}>Pending Checks</h3>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--warning)', margin: 0 }}>
            {stats.pendingDonations}
          </p>
        </div>

        {/* Stat Card 4 */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px' }}>Failed/Fake Clicks</h3>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--danger)', margin: 0 }}>
            {stats.failedDonations}
          </p>
        </div>

      </div>
    </div>
  );
}

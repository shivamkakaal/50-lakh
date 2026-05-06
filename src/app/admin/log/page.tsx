'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDailyLog() {
  const [earnings, setEarnings] = useState('');
  const [logText, setLogText] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('creator_logs').insert([{
      personal_earnings: Number(earnings),
      update_text: logText,
      log_date: new Date().toISOString().split('T')[0],
      streak_day: 1, // Logic to calculate streak goes here in a full app
      daily_donations: 0 // Could be aggregated automatically
    }]);

    if (!error) {
      alert('Daily log saved successfully!');
      setEarnings('');
      setLogText('');
    } else {
      alert('Failed to save daily log.');
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: '8px', fontSize: '24px' }}>Daily Creator Log</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>Update your personal earnings to show your progress alongside donations.</p>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)', maxWidth: '600px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Today I Earned (₹)</label>
          <input type="number" required value={earnings} onChange={e => setEarnings(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Daily Update Message</label>
          <textarea required rows={4} value={logText} onChange={e => setLogText(e.target.value)} placeholder="What did you do today?" style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', resize: 'vertical' }} />
        </div>
        <button type="submit" disabled={loading} className="btn btn-gold btn-full">{loading ? 'Saving...' : 'Save Daily Log'}</button>
      </form>
    </div>
  );
}

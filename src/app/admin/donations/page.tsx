'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDonations() {
  const [donations, setDonations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchDonations() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('donations')
      .select('*, levels(name)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setDonations(data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchDonations();
  }, []);

  async function updateStatus(id: string, newState: string) {
    // In a real app, this should also recalculate the level collected_amount 
    // if state changes from pending to success, or success to failed.
    const { error } = await supabase
      .from('donations')
      .update({ state: newState })
      .eq('id', id);
      
    if (!error) {
      fetchDonations();
    } else {
      alert('Failed to update status');
    }
  }

  async function deleteDonation(id: string) {
    if (confirm('Are you sure you want to delete this donation record?')) {
      const { error } = await supabase.from('donations').delete().eq('id', id);
      if (!error) fetchDonations();
    }
  }

  if (isLoading) return <div>Loading donations...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: '8px', fontSize: '24px' }}>Donations Ledger</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>View and verify all incoming transactions.</p>
        </div>
        <button onClick={fetchDonations} className="btn" style={{ background: 'white', border: '1px solid var(--border)', color: 'var(--navy)' }}>
          Refresh Data
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: 'var(--off-white)', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
              <th style={{ padding: '16px', fontWeight: 600, color: 'var(--navy)' }}>Date</th>
              <th style={{ padding: '16px', fontWeight: 600, color: 'var(--navy)' }}>Amount</th>
              <th style={{ padding: '16px', fontWeight: 600, color: 'var(--navy)' }}>Level</th>
              <th style={{ padding: '16px', fontWeight: 600, color: 'var(--navy)' }}>Txn ID / Ref</th>
              <th style={{ padding: '16px', fontWeight: 600, color: 'var(--navy)' }}>Status</th>
              <th style={{ padding: '16px', fontWeight: 600, color: 'var(--navy)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No donations found</td></tr>
            ) : donations.map((d) => (
              <tr key={d.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{new Date(d.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '16px', fontWeight: 600, color: 'var(--navy)' }}>₹{d.amount.toLocaleString('en-IN')}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{d.levels?.name || 'Unknown'}</td>
                <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)' }}>{d.upi_transaction_id}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 8px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600,
                    background: d.state === 'success' ? '#F0FFF4' : d.state === 'failed' ? '#FFF5F5' : '#FFFBEB',
                    color: d.state === 'success' ? '#276749' : d.state === 'failed' ? '#C53030' : '#744210',
                  }}>
                    {d.state || 'pending'}
                  </span>
                </td>
                <td style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                  {d.state !== 'success' && (
                    <button onClick={() => updateStatus(d.id, 'success')} style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Mark Success</button>
                  )}
                  {d.state !== 'failed' && (
                    <button onClick={() => updateStatus(d.id, 'failed')} style={{ padding: '6px 12px', fontSize: '12px', background: 'white', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer' }}>Mark Failed</button>
                  )}
                  <button onClick={() => deleteDonation(d.id)} style={{ padding: '6px 12px', fontSize: '12px', background: '#FFF5F5', color: '#E53E3E', border: '1px solid #FC8181', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

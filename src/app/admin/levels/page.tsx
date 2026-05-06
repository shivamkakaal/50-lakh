'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Level {
  id: string;
  level_number: number;
  name: string;
  hindi_name: string;
  target_amount: number;
  collected_amount: number;
  deadline: string;
  status: string;
  phase: string;
}

export default function AdminLevels() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCollected, setEditCollected] = useState('');
  const [editDeadline, setEditDeadline] = useState('');

  async function fetchLevels() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('levels')
      .select('*')
      .order('level_number', { ascending: true });

    if (!error && data) {
      setLevels(data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchLevels();
  }, []);

  async function updateStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from('levels')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);
      
    if (!error) {
      fetchLevels();
    } else {
      alert('Failed to update level status');
    }
  }

  async function saveEdit(id: string) {
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (editCollected) updates.collected_amount = Number(editCollected);
    if (editDeadline) updates.deadline = new Date(editDeadline).toISOString();

    const { error } = await supabase
      .from('levels')
      .update(updates)
      .eq('id', id);

    if (!error) {
      setEditingId(null);
      setEditCollected('');
      setEditDeadline('');
      fetchLevels();
    } else {
      alert('Failed to save changes');
      console.error(error);
    }
  }

  function startEdit(lvl: Level) {
    setEditingId(lvl.id);
    setEditCollected(String(lvl.collected_amount || 0));
    setEditDeadline(lvl.deadline ? new Date(lvl.deadline).toISOString().slice(0, 16) : '');
  }

  const statusColors: Record<string, { bg: string; text: string }> = {
    active:   { bg: '#EBF8FF', text: '#2B6CB0' },
    complete: { bg: '#F0FFF4', text: '#276749' },
    failed:   { bg: '#FFF5F5', text: '#C53030' },
    locked:   { bg: '#FAF5FF', text: '#6B46C1' },
  };

  if (isLoading) return <div style={{ padding: 40 }}>Loading levels...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 8, fontSize: 24 }}>Level Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>Control the 17-level gamification progression. Edit amounts, deadlines, and status.</p>
        </div>
        <button onClick={fetchLevels} style={{ padding: '8px 16px', fontSize: 13, background: 'var(--navy)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          ↻ Refresh
        </button>
      </div>

      {/* Stats Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {['active', 'complete', 'failed', 'locked'].map(status => {
          const count = levels.filter(l => l.status === status).length;
          const colors = statusColors[status];
          return (
            <div key={status} style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: colors.text }}>{count}</div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginTop: 4 }}>{status}</div>
            </div>
          );
        })}
      </div>

      {/* Levels Table */}
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: 'var(--off-white)', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
              <th style={{ padding: 16, fontWeight: 600, color: 'var(--navy)', width: 50 }}>#</th>
              <th style={{ padding: 16, fontWeight: 600, color: 'var(--navy)' }}>Name</th>
              <th style={{ padding: 16, fontWeight: 600, color: 'var(--navy)' }}>Target</th>
              <th style={{ padding: 16, fontWeight: 600, color: 'var(--navy)' }}>Collected</th>
              <th style={{ padding: 16, fontWeight: 600, color: 'var(--navy)' }}>Deadline</th>
              <th style={{ padding: 16, fontWeight: 600, color: 'var(--navy)' }}>Status</th>
              <th style={{ padding: 16, fontWeight: 600, color: 'var(--navy)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {levels.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>No levels found. Run seed_levels.sql in Supabase.</td></tr>
            ) : levels.map((lvl) => {
              const colors = statusColors[lvl.status] || statusColors.locked;
              const progress = lvl.target_amount > 0 ? Math.min((lvl.collected_amount / lvl.target_amount) * 100, 100) : 0;
              const isEditing = editingId === lvl.id;

              return (
                <tr key={lvl.id} style={{ borderBottom: '1px solid var(--border)', background: isEditing ? '#FFFFF0' : 'transparent' }}>
                  <td style={{ padding: 16, color: 'var(--text-muted)', fontWeight: 600 }}>{lvl.level_number}</td>
                  <td style={{ padding: 16 }}>
                    <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{lvl.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{lvl.hindi_name} · {lvl.phase}</div>
                  </td>
                  <td style={{ padding: 16, color: 'var(--text-secondary)' }}>₹{Number(lvl.target_amount).toLocaleString('en-IN')}</td>
                  <td style={{ padding: 16 }}>
                    {isEditing ? (
                      <input type="number" value={editCollected} onChange={e => setEditCollected(e.target.value)} style={{ width: 100, padding: '6px 8px', border: '1px solid var(--gold)', borderRadius: 4, fontSize: 13 }} />
                    ) : (
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--gold-dark)' }}>₹{Number(lvl.collected_amount || 0).toLocaleString('en-IN')}</div>
                        <div style={{ height: 4, background: '#EDF2F7', borderRadius: 2, marginTop: 4, width: 80 }}>
                          <div style={{ height: '100%', width: `${progress}%`, background: progress >= 100 ? '#48BB78' : 'var(--gold)', borderRadius: 2 }} />
                        </div>
                      </div>
                    )}
                  </td>
                  <td style={{ padding: 16, fontSize: 12, color: 'var(--text-muted)' }}>
                    {isEditing ? (
                      <input type="datetime-local" value={editDeadline} onChange={e => setEditDeadline(e.target.value)} style={{ padding: '6px 8px', border: '1px solid var(--gold)', borderRadius: 4, fontSize: 12 }} />
                    ) : (
                      lvl.deadline ? new Date(lvl.deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'
                    )}
                  </td>
                  <td style={{ padding: 16 }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: 4, fontSize: 11, textTransform: 'uppercase', fontWeight: 600,
                      background: colors.bg, color: colors.text,
                    }}>
                      {lvl.status}
                    </span>
                  </td>
                  <td style={{ padding: 16 }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => saveEdit(lvl.id)} style={{ padding: '6px 12px', fontSize: 12, background: '#48BB78', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Save</button>
                        <button onClick={() => { setEditingId(null); }} style={{ padding: '6px 12px', fontSize: 12, background: 'white', border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer' }}>Cancel</button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <button onClick={() => startEdit(lvl)} style={{ padding: '5px 10px', fontSize: 11, background: 'white', border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer' }}>✏️ Edit</button>
                        {lvl.status !== 'active' && (
                          <button onClick={() => updateStatus(lvl.id, 'active')} style={{ padding: '5px 10px', fontSize: 11, background: '#EBF8FF', color: '#2B6CB0', border: '1px solid #BEE3F8', borderRadius: 4, cursor: 'pointer' }}>▶ Activate</button>
                        )}
                        {lvl.status === 'active' && (
                          <button onClick={() => updateStatus(lvl.id, 'complete')} style={{ padding: '5px 10px', fontSize: 11, background: '#F0FFF4', color: '#276749', border: '1px solid #C6F6D5', borderRadius: 4, cursor: 'pointer' }}>✅ Complete</button>
                        )}
                        {lvl.status !== 'locked' && lvl.status !== 'failed' && (
                          <button onClick={() => updateStatus(lvl.id, 'locked')} style={{ padding: '5px 10px', fontSize: 11, background: '#FAF5FF', color: '#6B46C1', border: '1px solid #E9D8FD', borderRadius: 4, cursor: 'pointer' }}>🔒 Lock</button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

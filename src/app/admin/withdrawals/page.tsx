'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminWithdrawals() {
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let proofImageUrl = 'placeholder_url';

    if (file) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `proof_${Date.now()}.${fileExt}`;
        const filePath = `withdrawal-proofs/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('donations') // Re-using donations bucket for now
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          alert('Failed to upload image. Please try again.');
          setLoading(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from('donations')
          .getPublicUrl(filePath);

        if (urlData?.publicUrl) {
          proofImageUrl = urlData.publicUrl;
        }
      } catch (err) {
        console.error('Error uploading proof:', err);
      }
    }

    const { error } = await supabase.from('withdrawals').insert([{
      amount: Number(amount),
      purpose,
      withdrawal_date: new Date().toISOString().split('T')[0],
      proof_image_url: proofImageUrl
    }]);

    if (!error) {
      alert('Withdrawal logged successfully!');
      setAmount('');
      setPurpose('');
      setFile(null);
    } else {
      alert('Failed to log withdrawal.');
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: '8px', fontSize: '24px' }}>Log Withdrawal</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>This will be public on the Transparency Dashboard.</p>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)', maxWidth: '500px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Amount Withdrawn (₹)</label>
          <input type="number" required value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Purpose of Withdrawal</label>
          <input type="text" required placeholder="e.g. Loan EMI, Ration, Electricity" value={purpose} onChange={e => setPurpose(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Proof (Receipt/Screenshot)</label>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} style={{ width: '100%', padding: '12px', border: '1px dashed var(--border)', borderRadius: '6px', background: '#FAFAFA' }} />
          {file && <p style={{ fontSize: '12px', color: 'var(--success)', marginTop: '8px' }}>Selected: {file.name}</p>}
        </div>
        <button type="submit" disabled={loading} className="btn btn-gold btn-full">{loading ? 'Uploading & Saving...' : 'Log Withdrawal'}</button>
      </form>
    </div>
  );
}

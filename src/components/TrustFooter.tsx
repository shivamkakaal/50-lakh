'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Withdrawal {
  id: string;
  amount: number;
  purpose: string;
  withdrawal_date: string;
  proof_image_url?: string;
}

export default function TrustFooter() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const TOTAL_LOAN = 5000000;

  useEffect(() => {
    async function fetchWithdrawals() {
      const { data } = await supabase
        .from('withdrawals')
        .select('*')
        .order('withdrawal_date', { ascending: false })
        .limit(3);

      if (data) {
        setWithdrawals(data);
        const sum = data.reduce((acc, curr) => acc + Number(curr.amount), 0);
        setTotalWithdrawn(sum);
      }
    }
    fetchWithdrawals();
  }, []);

  return (
    <footer className="trust-footer" style={{ background: 'var(--navy-mid)', paddingTop: 40, paddingBottom: 40 }}>
      <div className="container">
        
        {/* Transparency Dashboard */}
        <div className="dashboard-preview" style={{ background: 'var(--navy)', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid rgba(255,213,79,0.1)' }}>
          <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--gold)', marginBottom: 20 }}>
            Impact Dashboard — Live View
          </h5>
          
          <div className="dash-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--gold)', display: 'block' }}>
                ₹{totalWithdrawn.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Funds Used</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: '#48BB78', display: 'block' }}>
                ₹{(TOTAL_LOAN - totalWithdrawn).toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Loan Remaining</span>
            </div>
          </div>

          {withdrawals.length > 0 && (
            <div className="fund-usage">
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
                Recent Fund Usage
              </div>
              {withdrawals.map((w, idx) => {
                const percentage = Math.min((Number(w.amount) / 50000) * 100, 100); // Visual scaling
                return (
                  <div key={w.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 80, overflow: 'hidden' }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {w.purpose}
                      </span>
                      {w.proof_image_url && w.proof_image_url !== 'placeholder_url' && (
                        <a href={w.proof_image_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: 'var(--gold)', textDecoration: 'none', marginTop: 2 }}>
                          📄 View Proof
                        </a>
                      )}
                    </div>
                    <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${percentage}%`, background: idx === 0 ? 'var(--gold)' : 'rgba(255,213,79,0.5)', borderRadius: 3, transition: 'width 1s ease-out' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--gold)', minWidth: 70, textAlign: 'right' }}>
                      ₹{Number(w.amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <a href="/ledger" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 8, 
            background: 'rgba(255,213,79,0.1)', 
            color: 'var(--gold)', 
            padding: '10px 20px', 
            borderRadius: 20, 
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
            border: '1px solid rgba(255,213,79,0.3)'
          }}>
            📋 View Public Transaction Ledger →
          </a>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
          &quot;Har donation publicly trackable hai. Koi chhupa nahi. Koi nakli nahi. 
          Ye meri zindagi hai — aur aap uske saathi hain.&quot;
        </p>
        <div className="trust-icons" style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24 }}>
          <div className="trust-icon" style={{ textAlign: 'center', opacity: 0.8 }}>
            <span style={{ fontSize: 24, display: 'block', marginBottom: 4 }}>🔒</span>
            <span style={{ fontSize: 12 }}>Secure UPI</span>
          </div>
          <div className="trust-icon" style={{ textAlign: 'center', opacity: 0.8 }}>
            <span style={{ fontSize: 24, display: 'block', marginBottom: 4 }}>📊</span>
            <span style={{ fontSize: 12 }}>100% Tracked</span>
          </div>
          <div className="trust-icon" style={{ textAlign: 'center', opacity: 0.8 }}>
            <span style={{ fontSize: 24, display: 'block', marginBottom: 4 }}>🧾</span>
            <span style={{ fontSize: 12 }}>Proof Always</span>
          </div>
        </div>
        <p style={{ marginTop: 32, fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
          Mission 50 Lakh · ₹50,00,000 Loan · 1 Son · 1 Mission
        </p>
      </div>
    </footer>
  );
}

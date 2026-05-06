import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function LedgerPage() {
  const { data: donations } = await supabase
    .from('donations')
    .select('id, amount, name, created_at, upi_transaction_id, is_public')
    .order('created_at', { ascending: false });

  // Mask transaction ID for security but keep it verifiable
  const maskTxn = (txnId: string) => {
    if (!txnId) return 'N/A';
    if (txnId.length <= 8) return txnId;
    return txnId.substring(0, 4) + '****' + txnId.substring(txnId.length - 4);
  };

  const totalAmount = donations?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy)', color: 'white', padding: '40px 20px' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ color: 'var(--gold)', textDecoration: 'none', marginBottom: 20, display: 'inline-block' }}>
          ← Back to Mission
        </Link>
        
        <h1 style={{ fontSize: 32, marginBottom: 8, color: 'var(--gold)' }}>Public Ledger</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
          100% Transparency. Every single rupee received is logged here with its unique UPI transaction signature. 
          Koi chhupa nahi. Koi nakli nahi.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ background: 'var(--navy-mid)', padding: 20, borderRadius: 12, border: '1px solid rgba(255,213,79,0.2)' }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Total Transactions</span>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>{donations?.length || 0}</div>
          </div>
          <div style={{ background: 'var(--navy-mid)', padding: 20, borderRadius: 12, border: '1px solid rgba(255,213,79,0.2)' }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Total Volume</span>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--success)' }}>₹{totalAmount.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div style={{ background: 'var(--navy-mid)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '16px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Date</th>
                  <th style={{ padding: '16px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Transaction ID</th>
                  <th style={{ padding: '16px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Donor</th>
                  <th style={{ padding: '16px', color: 'rgba(255,255,255,0.5)', fontWeight: 500, textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {donations?.map((don) => (
                  <tr key={don.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                      {new Date(don.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}<br/>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                        {new Date(don.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                      {maskTxn(don.upi_transaction_id)}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {don.is_public && don.name ? don.name : <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>Anonymous</span>}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right', fontWeight: 'bold', color: 'var(--gold)' }}>
                      ₹{don.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
                {(!donations || donations.length === 0) && (
                  <tr>
                    <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
                      No transactions recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import { useState, useRef } from 'react';
import { DONATION_BUTTONS, SMART_SUGGESTIONS, UPI_ID, UPI_NAME, getDialogue } from '@/lib/constants';

interface DonationWidgetProps {
  onDonationComplete: (amount: number) => void;
  levelName?: string;
}

export default function DonationWidget({ onDonationComplete, levelName }: DonationWidgetProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState<{ amount: number; copy: string } | null>(null);
  const [donorName, setDonorName] = useState('');

  const activeAmount = selectedAmount || (customAmount ? parseInt(customAmount) : null);

  function handleAmountSelect(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount('');
    const suggestion = SMART_SUGGESTIONS.find(s => amount >= s.from_min && amount <= s.from_max);
    if (suggestion) {
      setCurrentSuggestion({ amount: suggestion.suggest_amount, copy: suggestion.copy });
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
  }

  const [isProcessing, setIsProcessing] = useState(false);

  async function handleDonate() {
    if (!activeAmount || activeAmount <= 0) return;
    
    setIsProcessing(true);

    try {
      const response = await fetch('/donation/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: activeAmount,
          levelId: 'a6bb1144-76d0-4378-ba92-4a9cea73b578',
          message: 'Supporter',
          donorName: donorName.trim() || 'Anonymous'
        })
      });

      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert(`Payment Error: ${data.error || 'Please try again later.'}`);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Network error. Please check your connection.');
      setIsProcessing(false);
    }
  }

  function getMsg(amount: number): string {
    const btn = DONATION_BUTTONS.find(b => b.amount === amount);
    if (btn) return btn.message;
    if (amount >= 5000) return 'Life Saver 🔥';
    if (amount >= 1000) return 'Strong push ❤️';
    if (amount >= 100) return 'Official Supporter 🙏';
    return 'Har rupaya maayane rakhta hai 🙏';
  }

  return (
    <section className="section" style={{ background: 'var(--navy-mid)' }} id="donate">
      <div className="container">
        <span className="section-label">Support the Mission</span>
        <h2 className="section-title">Choose Your Impact</h2>
        <div className="section-divider" />

        <div className="donation-grid" style={{ marginBottom: 16 }}>
          {DONATION_BUTTONS.map((btn) => (
            <button key={btn.amount} className={`donation-btn ${selectedAmount === btn.amount ? 'selected' : ''}`} onClick={() => handleAmountSelect(btn.amount)}>
              {btn.badge && <span className="badge-tag">{btn.badge === 'most-popular' ? '⭐ Popular' : '🙏 Best'}</span>}
              <span className="amount">₹{btn.amount >= 1000 ? `${btn.amount / 1000}K` : btn.amount}</span>
              {btn.label && <span className="label">{btn.label}</span>}
            </button>
          ))}
        </div>

        <div className="custom-input-wrap" style={{ marginBottom: 16 }}>
          <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18 }}>₹</span>
          <input type="text" inputMode="numeric" className="custom-input" placeholder="Custom amount" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value.replace(/\D/g, '')); setSelectedAmount(null); setShowSuggestion(false); }} />
        </div>

        {activeAmount && <div style={{ textAlign: 'center', padding: '10px 16px', background: 'rgba(255,213,79,0.06)', borderRadius: 'var(--radius-md)', marginBottom: 16 }}><p style={{ fontSize: 14, color: 'var(--gold)', fontStyle: 'italic', margin: 0 }}>{getMsg(activeAmount)}</p></div>}

        {showSuggestion && currentSuggestion && (
          <div className="suggestion-bar" style={{ marginBottom: 16 }}>
            <p>{currentSuggestion.copy}</p>
            <button className="suggestion-btn" onClick={() => { setSelectedAmount(currentSuggestion.amount); setShowSuggestion(false); }}>₹{currentSuggestion.amount}</button>
          </div>
        )}

        {activeAmount && activeAmount >= 50 && (
          <div style={{ marginBottom: 20 }}>
            <div className="dialogue-bubble dialogue-father"><span className="dialogue-label">👨‍🦳 Papa</span>{getDialogue(activeAmount).father}</div>
            <div className="dialogue-bubble dialogue-son"><span className="dialogue-label">👨 Beta</span>{getDialogue(activeAmount).son}</div>
          </div>
        )}

        {/* Donor Name Input */}
        <div style={{ marginBottom: 16 }}>
          <input 
            type="text" 
            placeholder="Aapka Naam (Optional)" 
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            maxLength={40}
            style={{ 
              width: '100%', 
              padding: '14px 16px', 
              background: 'var(--navy)', 
              border: '1px solid var(--border)', 
              color: 'white', 
              borderRadius: 'var(--radius-md)', 
              fontSize: 15,
              fontFamily: 'var(--font-body)',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6, marginBottom: 0 }}>Naam nahi doge toh &quot;Anonymous Supporter&quot; dikhega</p>
        </div>

        <button className={`btn btn-gold btn-full ${activeAmount && !isProcessing ? 'animate-pulse-glow' : ''}`} onClick={handleDonate} disabled={!activeAmount || isProcessing} style={{ fontSize: 18, padding: '16px 32px', opacity: activeAmount ? 1 : 0.4, cursor: activeAmount && !isProcessing ? 'pointer' : 'not-allowed' }}>
          {isProcessing ? 'Connecting to PhonePe...' : (activeAmount ? `Donate ₹${activeAmount.toLocaleString('en-IN')} →` : 'Select an amount')}
        </button>

        <p style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 0 }}>
          UPI ID: <span className="mono" style={{ color: 'rgba(255,255,255,0.5)' }}>{UPI_ID}</span>
        </p>
      </div>
    </section>
  );
}

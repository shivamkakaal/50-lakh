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
  const [requestShoutout, setRequestShoutout] = useState(false);
  const [profession, setProfession] = useState('');
  const [message, setMessage] = useState('');

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
          message: requestShoutout ? message.trim() : 'Supporter',
          profession: requestShoutout ? profession.trim() : null,
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

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: 24, border: '1px solid var(--border)' }}>
          {/* Donor Name Input */}
          <div style={{ marginBottom: 12 }}>
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
                borderRadius: '8px', 
                fontSize: 15,
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Shoutout Toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none', fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
            <input 
              type="checkbox" 
              checked={requestShoutout} 
              onChange={(e) => setRequestShoutout(e.target.checked)} 
              style={{ width: 16, height: 16, accentColor: 'var(--gold)' }}
            />
            📢 Request a Shoutout on the Wall of Love
          </label>

          {/* Shoutout Fields */}
          {requestShoutout && (
            <div style={{ marginTop: 16, animation: 'fade-in 0.3s ease-out' }}>
              <input 
                type="text" 
                placeholder="Aap kya karte hain? (e.g. Content Creator, Student)" 
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                maxLength={30}
                style={{ 
                  width: '100%', padding: '12px 14px', background: 'var(--navy)', border: '1px solid var(--border)', color: 'white', borderRadius: '8px', fontSize: 14, marginBottom: 12, outline: 'none'
                }}
              />
              <textarea 
                placeholder="Short Shoutout Message (Max 100 chars)" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={100}
                rows={2}
                style={{ 
                  width: '100%', padding: '12px 14px', background: 'var(--navy)', border: '1px solid var(--border)', color: 'white', borderRadius: '8px', fontSize: 14, outline: 'none', resize: 'none'
                }}
              />
            </div>
          )}
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

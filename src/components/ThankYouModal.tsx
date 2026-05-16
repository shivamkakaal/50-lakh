'use client';

import { useState, useRef, useEffect } from 'react';
import { getDialogue } from '@/lib/constants';
import { supabase } from '@/lib/supabase';

interface ThankYouModalProps {
  amount: number;
  onClose: () => void;
  transactionId?: string;
}

export default function ThankYouModal({ amount, onClose, transactionId }: ThankYouModalProps) {
  const dialogue = getDialogue(amount);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Surprise Unlock State
  const [isSurpriseUnlocked, setIsSurpriseUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Run randomizer once on mount
  useEffect(() => {
    // 5% chance if donation >= 100
    // FOR TESTING: setting it to a higher chance if needed, or keeping it strictly random.
    // Let's use 100% for testing during dev if amount === 101, else 5%.
    if (amount >= 100) {
      const isTestAmount = amount === 101; 
      const chance = isTestAmount ? 1.0 : 0.05;
      if (Math.random() < chance) {
        setIsSurpriseUnlocked(true);
      }
    }
  }, [amount]);

  async function handleSelfieCapture(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setSelfiePreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload to Supabase Storage
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `selfie_${Date.now()}.${fileExt}`;
      const filePath = `supporter-selfies/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('donations')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        // Still show preview even if upload fails
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('donations')
        .getPublicUrl(filePath);

      const publicUrl = urlData?.publicUrl;

      if (publicUrl && transactionId) {
        // Save selfie URL to the donation record
        await supabase
          .from('donations')
          .update({ selfie_url: publicUrl })
          .eq('upi_transaction_id', transactionId);
      }

      setUploaded(true);
    } catch (err) {
      console.error('Selfie upload error:', err);
    } finally {
      setUploading(false);
    }
  }

  async function generateStory() {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0B1D2A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#FFD54F';
    ctx.font = 'bold 80px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Mission 50 Lakh', 540, 300);

    // Support Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '50px sans-serif';
    ctx.fillText('I Supported This Journey', 540, 450);

    // Amount
    ctx.fillStyle = '#FFD54F';
    ctx.font = 'bold 120px monospace';
    ctx.fillText(`₹${amount.toLocaleString('en-IN')}`, 540, 700);

    // Draw Selfie if available
    if (selfiePreview) {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = selfiePreview;
        await new Promise((resolve) => {
          img.onload = () => {
            // Draw circle clip
            ctx.save();
            ctx.beginPath();
            ctx.arc(540, 1100, 250, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, 290, 850, 500, 500);
            ctx.restore();
            // Draw border
            ctx.beginPath();
            ctx.arc(540, 1100, 250, 0, Math.PI * 2);
            ctx.lineWidth = 15;
            ctx.strokeStyle = '#FFD54F';
            ctx.stroke();
            resolve(true);
          };
          img.onerror = resolve; // Continue even if image fails
        });
      } catch (e) {
        console.error('Failed to draw selfie on canvas', e);
      }
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '40px sans-serif';
      ctx.fillText('Every rupee brings them closer to freedom.', 540, 1100);
    }

    // Footer
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '40px sans-serif';
    ctx.fillText('Link in bio to join the mission', 540, 1700);

    // Convert to Image
    try {
      const dataUrl = canvas.toDataURL('image/png');
      
      // Try Web Share API for Mobile
      if (navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'mission_50_lakh.png', { type: 'image/png' });
        await navigator.share({
          title: 'Mission 50 Lakh',
          text: 'I supported Mission 50 Lakh! Join the mission.',
          files: [file]
        });
      } else {
        // Fallback: Download
        const link = document.createElement('a');
        link.download = 'mission_50_lakh_story.png';
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Error sharing story:', err);
      // Fallback if sharing fails
      const link = document.createElement('a');
      link.download = 'mission_50_lakh_story.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} style={isSurpriseUnlocked ? { background: 'rgba(0,0,0,0.95)' } : {}}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ 
        maxWidth: '400px', 
        background: isSurpriseUnlocked ? '#0B1D2A' : 'var(--navy)',
        border: isSurpriseUnlocked ? '1px solid rgba(255,213,79,0.3)' : 'none',
        boxShadow: isSurpriseUnlocked ? '0 0 40px rgba(255,213,79,0.1)' : 'var(--shadow-lg)'
      }}>
        
        {isSurpriseUnlocked ? (
          // --- SURPRISE UNLOCKED UI ---
          <div style={{ textAlign: 'center', animation: 'fade-in 1s ease-out' }}>
            <div style={{ 
              display: 'inline-block',
              padding: '6px 12px',
              background: 'rgba(255,213,79,0.1)',
              color: 'var(--gold)',
              borderRadius: 20,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 24,
              border: '1px solid rgba(255,213,79,0.3)'
            }}>
              🌟 Hidden Message Unlocked
            </div>
            
            <h2 style={{ fontSize: 24, color: 'white', marginBottom: 16 }}>
              Aapke liye ek <span style={{ color: 'var(--gold)' }}>secret message</span> hai...
            </h2>
            
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', marginBottom: 32 }}>
              "Ye sabko nahi milta. Par aapke support ne dil chhu liya."
            </p>

            {/* Mock Audio Player */}
            <div style={{ 
              background: 'rgba(0,0,0,0.4)', 
              borderRadius: 16, 
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.05)',
              marginBottom: 32
            }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', cursor: 'pointer' }} onClick={() => setIsPlaying(!isPlaying)}>
                <span style={{ fontSize: 24, color: 'var(--navy)', marginLeft: isPlaying ? 0 : 4 }}>
                  {isPlaying ? '⏸' : '▶️'}
                </span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden', marginBottom: 12 }}>
                <div style={{ height: '100%', width: isPlaying ? '100%' : '0%', background: 'var(--gold)', transition: isPlaying ? 'width 15s linear' : 'none' }} />
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                {isPlaying ? "0:15 / 0:15" : "0:00 / 0:15"}
              </p>
              
              {isPlaying && (
                <p style={{ marginTop: 24, fontSize: 14, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', animation: 'fade-in 1s' }}>
                  "Beta... aap jaise logo ki wajah se, is baap ki himmat nahi tooti hai. Aap jahan bhi ho, khush raho. Shukriya."
                </p>
              )}
            </div>

            <button className="btn btn-gold btn-full" onClick={onClose}>
              Mission par wapas jayein →
            </button>
          </div>
        ) : (
          // --- STANDARD THANK YOU UI ---
          <>
            {/* Animated Emotional Hug Scene */}
            <div style={{ position: 'relative', height: '110px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', marginTop: '8px' }}>
              
              {/* Floating Hearts / Sparkles Burst */}
              <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}>
                {[...Array(6)].map((_, i) => {
                  const items = ['❤️', '💖', '✨'];
                  return (
                    <div key={i} style={{
                      position: 'absolute',
                      fontSize: `${Math.random() * 12 + 14}px`,
                      animation: `floatHeart ${1.5 + Math.random()}s ease-out forwards`,
                      animationDelay: `${0.6 + Math.random() * 0.4}s`,
                      opacity: 0,
                      left: `${(Math.random() - 0.5) * 80}px`
                    }}>
                      {items[Math.floor(Math.random() * items.length)]}
                    </div>
                  );
                })}
              </div>

              {/* Son Avatar */}
              <div style={{ 
                width: '70px', height: '70px', borderRadius: '50%', background: 'var(--navy-light)', border: '2px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px',
                animation: 'slideHugLeft 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                animationDelay: '0.2s',
                opacity: 0,
                zIndex: 1,
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                position: 'absolute', left: '50%', marginLeft: '-35px'
              }}>
                👨
              </div>

              {/* Father Avatar */}
              <div style={{ 
                width: '76px', height: '76px', borderRadius: '50%', background: 'var(--gold)', border: '3px solid #FFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px',
                animation: 'slideHugRight 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                animationDelay: '0.2s',
                opacity: 0,
                zIndex: 2,
                boxShadow: 'var(--shadow-gold)',
                position: 'absolute', left: '50%', marginLeft: '-38px'
              }}>
                👨‍🦳
              </div>
            </div>

            <h2 className="animate-slideUp delay-300" style={{ color: 'var(--gold)', marginBottom: 8 }}>Shukriya!</h2>
            <p className="animate-slideUp delay-300" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
              You donated <span className="mono" style={{ color: 'var(--gold)' }}>₹{amount.toLocaleString('en-IN')}</span>
            </p>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
              {/* Father Dialogue */}
              <div className="dialogue-bubble dialogue-father animate-slideUp delay-400" style={{ textAlign: 'left', margin: 0, flex: 1 }}>
                <span className="dialogue-label">👨‍🦳 Papa</span>
                {dialogue.father}
              </div>
            </div>

            <div className="dialogue-bubble dialogue-son animate-slideUp delay-500" style={{ textAlign: 'left', marginBottom: '24px' }}>
              <span className="dialogue-label">👨 Beta</span>
              {dialogue.son}
            </div>

            {/* Selfie Section */}
            <div className="animate-slideUp delay-500" style={{ marginTop: 20, padding: '16px', background: 'rgba(255,213,79,0.05)', borderRadius: '12px', border: '1px dashed rgba(255,213,79,0.2)' }}>
          {!selfiePreview ? (
            <>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textAlign: 'center' }}>
                📸 Apni selfie share karo! Supporter Gallery mein dikhegi
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleSelfieCapture}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  border: '1px solid rgba(255,213,79,0.3)',
                  color: 'var(--gold)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontFamily: 'var(--font-display)',
                  transition: 'all 0.2s'
                }}
              >
                📷 Take Selfie / Choose Photo
              </button>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 8, textAlign: 'center', marginBottom: 0 }}>
                (Optional — bilkul skip bhi kar sakte hain)
              </p>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <img
                src={selfiePreview}
                alt="Your selfie"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--gold)',
                  marginBottom: 8
                }}
              />
              <p style={{ fontSize: 12, color: uploaded ? '#48BB78' : 'var(--gold)', marginBottom: 0 }}>
                {uploading ? '⏳ Uploading...' : uploaded ? '✅ Selfie saved! Gallery mein dikhegi' : '📸 Preview'}
              </p>
            </div>
          )}
        </div>

            <div className="animate-slideUp delay-500" style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button 
                className="btn btn-outline btn-full" 
                onClick={generateStory}
                style={{ flex: 1, padding: '14px 16px', fontSize: 14 }}
              >
                📸 Create Story
              </button>
              <button className="btn btn-gold btn-full" onClick={onClose} style={{ flex: 1 }}>
                Continue →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

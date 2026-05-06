'use client';

export default function StorySection() {
  return (
    <section className="section" style={{ background: 'var(--navy-mid)' }}>
      <div className="container">
        <span className="section-label">The Story</span>
        <h2 className="section-title">Why I Need Your Help</h2>
        <div className="section-divider" />

        <div className="step">
          <span className="step-num">1</span>
          <div className="step-content">
            <h4>The Problem</h4>
            <p>
              Mere papa ne ₹50 lakh ka loan liya tha — family ke liye. 
              Ab wo loan hamare upar hai. Interest badh raha hai. 
              Pressure badh raha hai. Par hum haar nahi maan rahe.
            </p>
          </div>
        </div>

        <div className="step">
          <span className="step-num">2</span>
          <div className="step-content">
            <h4>The Reality</h4>
            <p>
              Main bhi kaam kar raha hoon — roz. Apni earning dikhata hoon, 
              chhupata nahi. &quot;Main bhi fight kar raha hoon, sirf depend nahi hoon.&quot; 
              Ye journey transparent hai — har rupaya trackable hai.
            </p>
          </div>
        </div>

        <div className="step">
          <span className="step-num">3</span>
          <div className="step-content">
            <h4>The Mission</h4>
            <p>
              17 levels. ₹100 se le kar ₹50 lakh tak. Har level ka ek target hai, 
              ek deadline hai, aur ek emotional context hai. 
              Aap is journey ka hissa ban sakte hain — even ₹1 se.
            </p>
          </div>
        </div>

        {/* Emotional callout */}
        <div style={{
          marginTop: 24,
          background: 'rgba(255,213,79,0.06)',
          border: '1px solid rgba(255,213,79,0.15)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 20 }}>💬</span>
          <div>
            <p style={{ 
              fontStyle: 'italic', 
              color: 'var(--gold)', 
              fontSize: 14,
              margin: 0,
              fontFamily: 'var(--font-body)',
            }}>
              &quot;Maine sirf paise nahi diye… main is journey ka hissa ban gaya hoon.&quot;
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4, marginBottom: 0 }}>
              — The feeling every supporter should have
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

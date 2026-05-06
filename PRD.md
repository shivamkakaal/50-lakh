<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PRD — Interactive Donation Platform v2.0</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

  :root {
    --navy: #0B1D2A;
    --navy-mid: #102233;
    --navy-light: #1a3347;
    --gold: #FFD54F;
    --gold-dark: #F9A825;
    --gold-pale: #FFF8E1;
    --white: #FFFFFF;
    --off-white: #F8F9FA;
    --text-primary: #0B1D2A;
    --text-secondary: #4A5568;
    --text-muted: #718096;
    --success: #2E7D32;
    --warning: #E65100;
    --danger: #C62828;
    --info: #1565C0;
    --border: #E2E8F0;
    --border-dark: #CBD5E0;
    --shadow: 0 2px 12px rgba(11,29,42,0.08);
    --shadow-lg: 0 8px 32px rgba(11,29,42,0.12);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Lora', Georgia, serif;
    color: var(--text-primary);
    background: var(--off-white);
    line-height: 1.75;
    font-size: 15px;
  }

  /* ─── COVER ─── */
  .cover {
    background: var(--navy);
    color: var(--white);
    padding: 80px 60px 60px;
    position: relative;
    overflow: hidden;
    page-break-after: always;
  }
  .cover::before {
    content: '';
    position: absolute;
    top: -120px; right: -120px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,213,79,0.12) 0%, transparent 70%);
  }
  .cover-badge {
    display: inline-block;
    background: rgba(255,213,79,0.15);
    border: 1px solid rgba(255,213,79,0.4);
    color: var(--gold);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 20px;
    margin-bottom: 32px;
  }
  .cover h1 {
    font-family: 'Sora', sans-serif;
    font-size: 42px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;
    color: var(--white);
  }
  .cover h1 span { color: var(--gold); }
  .cover .subtitle {
    font-size: 18px;
    color: rgba(255,255,255,0.65);
    font-style: italic;
    margin-bottom: 48px;
  }
  .cover-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 32px;
  }
  .cover-meta-item label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    display: block;
    margin-bottom: 4px;
  }
  .cover-meta-item span {
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    color: var(--white);
    font-weight: 600;
  }

  /* ─── LAYOUT ─── */
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 40px;
  }

  /* ─── TOC ─── */
  .toc-section {
    background: var(--white);
    border-bottom: 3px solid var(--gold);
    padding: 48px 60px;
  }
  .toc-section h2 {
    font-family: 'Sora', sans-serif;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 28px;
  }
  .toc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .toc-item {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
    text-decoration: none;
    color: var(--text-primary);
    transition: color 0.2s;
  }
  .toc-item:hover { color: var(--navy); }
  .toc-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--gold-dark);
    font-weight: 500;
    min-width: 28px;
  }
  .toc-label { font-size: 13px; }

  /* ─── SECTION HEADERS ─── */
  .section {
    padding: 56px 60px 40px;
    background: var(--white);
    margin-bottom: 2px;
  }
  .section:nth-child(even) { background: var(--off-white); }

  .section-header {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  .section-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--gold-dark);
    letter-spacing: 1px;
    text-transform: uppercase;
    padding-top: 6px;
    min-width: 60px;
  }
  .section h2 {
    font-family: 'Sora', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--navy);
    line-height: 1.25;
  }
  .section h3 {
    font-family: 'Sora', sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--navy);
    margin: 28px 0 12px;
    padding-left: 14px;
    border-left: 3px solid var(--gold);
  }
  .section h4 {
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-secondary);
    margin: 20px 0 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* ─── PROSE ─── */
  p { margin-bottom: 14px; color: var(--text-secondary); }
  strong { color: var(--text-primary); font-weight: 600; }
  em { color: var(--navy); }

  /* ─── CALLOUTS ─── */
  .callout {
    border-radius: 10px;
    padding: 18px 22px;
    margin: 20px 0;
    font-size: 14px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .callout-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .callout.info { background: #EBF8FF; border-left: 3px solid #3182CE; }
  .callout.info .callout-icon { color: #3182CE; }
  .callout.warning { background: #FFFBEB; border-left: 3px solid #D69E2E; }
  .callout.warning .callout-icon { color: #D69E2E; }
  .callout.success { background: #F0FFF4; border-left: 3px solid #38A169; }
  .callout.success .callout-icon { color: #38A169; }
  .callout.danger { background: #FFF5F5; border-left: 3px solid #E53E3E; }
  .callout.danger .callout-icon { color: #E53E3E; }
  .callout-body strong { display: block; margin-bottom: 4px; color: var(--text-primary); }
  .callout-body p { margin: 0; color: var(--text-secondary); }

  /* ─── FEATURE CARDS ─── */
  .feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 20px 0;
  }
  .feature-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 20px;
    box-shadow: var(--shadow);
  }
  .feature-card .fc-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--gold-dark);
    margin-bottom: 8px;
    display: block;
  }
  .feature-card h4 {
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--navy);
    margin: 0 0 8px;
    text-transform: none;
    letter-spacing: 0;
  }
  .feature-card p { font-size: 13px; margin: 0; }

  /* ─── TABLES ─── */
  .table-wrap { overflow-x: auto; margin: 20px 0; border-radius: 10px; box-shadow: var(--shadow); }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  thead tr { background: var(--navy); color: var(--white); }
  thead th {
    padding: 12px 16px;
    text-align: left;
    font-family: 'Sora', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  tbody tr:nth-child(even) { background: #F7FAFC; }
  tbody tr:hover { background: var(--gold-pale); }
  tbody td { padding: 10px 16px; border-bottom: 1px solid var(--border); color: var(--text-secondary); }
  tbody td:first-child { color: var(--text-primary); font-weight: 500; }

  /* ─── LEVEL SYSTEM ─── */
  .level-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 20px 0;
  }
  .level-card {
    border-radius: 10px;
    padding: 14px 16px;
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }
  .level-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
  }
  .level-card.trust::before { background: #4CAF50; }
  .level-card.momentum::before { background: #2196F3; }
  .level-card.growth::before { background: #9C27B0; }
  .level-card.advanced::before { background: var(--gold-dark); }
  .level-card.final::before { background: #F44336; }
  .level-card .phase {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  .level-card.trust .phase { color: #2E7D32; }
  .level-card.momentum .phase { color: #1565C0; }
  .level-card.growth .phase { color: #6A1B9A; }
  .level-card.advanced .phase { color: #E65100; }
  .level-card.final .phase { color: #B71C1C; }
  .level-card .amount {
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .level-card .days {
    font-size: 12px;
    color: var(--text-muted);
  }

  /* ─── FLOW STEPS ─── */
  .flow-steps { margin: 20px 0; }
  .flow-step {
    display: flex;
    gap: 18px;
    align-items: flex-start;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
  }
  .flow-step:last-child { border-bottom: none; }
  .step-num {
    width: 32px; height: 32px;
    background: var(--navy);
    color: var(--gold);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    flex-shrink: 0;
  }
  .step-content strong {
    display: block;
    margin-bottom: 4px;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
  }
  .step-content p { font-size: 13px; margin: 0; }

  /* ─── PRIORITY MATRIX ─── */
  .priority-matrix {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 20px 0;
  }
  .priority-cell {
    border-radius: 10px;
    padding: 20px;
    border: 1px solid var(--border);
  }
  .priority-cell.mvp { border-color: #38A169; background: #F0FFF4; }
  .priority-cell.v1 { border-color: #3182CE; background: #EBF8FF; }
  .priority-cell.v2 { border-color: #D69E2E; background: #FFFBEB; }
  .priority-cell.future { border-color: #9F7AEA; background: #FAF5FF; }
  .priority-cell .pc-label {
    font-family: 'Sora', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: block;
  }
  .priority-cell.mvp .pc-label { color: #276749; }
  .priority-cell.v1 .pc-label { color: #2A4365; }
  .priority-cell.v2 .pc-label { color: #744210; }
  .priority-cell.future .pc-label { color: #553C9A; }
  .priority-cell ul { padding-left: 16px; }
  .priority-cell ul li {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 5px;
  }

  /* ─── METRICS ─── */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin: 20px 0;
  }
  .metric-card {
    background: var(--navy);
    color: var(--white);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
  }
  .metric-card .metric-val {
    font-family: 'Sora', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--gold);
    display: block;
    margin-bottom: 4px;
  }
  .metric-card .metric-label {
    font-size: 12px;
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* ─── TECH STACK ─── */
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin: 20px 0;
  }
  .tech-pill {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 14px;
    text-align: center;
    box-shadow: var(--shadow);
  }
  .tech-pill .tp-layer {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--gold-dark);
    display: block;
    margin-bottom: 4px;
  }
  .tech-pill .tp-name {
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--navy);
  }

  /* ─── CODE BLOCK ─── */
  .code-block {
    background: var(--navy);
    border-radius: 10px;
    padding: 20px 24px;
    margin: 16px 0;
    overflow-x: auto;
  }
  .code-block pre {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    color: #A0AEC0;
    line-height: 1.6;
  }
  .code-block .kw { color: var(--gold); }
  .code-block .str { color: #68D391; }
  .code-block .comment { color: #4A5568; font-style: italic; }
  .code-block .type { color: #90CDF4; }

  /* ─── TIMELINE ─── */
  .timeline { margin: 20px 0; }
  .timeline-row {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 20px;
    margin-bottom: 16px;
    align-items: start;
  }
  .timeline-phase {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--gold-dark);
    padding-top: 4px;
    text-align: right;
  }
  .timeline-content {
    border-left: 2px solid var(--border);
    padding-left: 20px;
    padding-bottom: 16px;
  }
  .timeline-content strong {
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    display: block;
    margin-bottom: 6px;
  }
  .timeline-content ul {
    padding-left: 16px;
    list-style: disc;
  }
  .timeline-content ul li {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 4px;
  }

  /* ─── DB SCHEMA ─── */
  .schema-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 20px 0;
  }
  .schema-table {
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    font-size: 12.5px;
  }
  .schema-table .st-header {
    background: var(--navy);
    color: var(--gold);
    padding: 10px 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 500;
  }
  .schema-table .st-row {
    display: flex;
    justify-content: space-between;
    padding: 7px 16px;
    border-bottom: 1px solid var(--border);
    align-items: center;
  }
  .schema-table .st-row:last-child { border-bottom: none; }
  .schema-table .st-row:nth-child(even) { background: #F7FAFC; }
  .schema-table .field { font-family: 'JetBrains Mono', monospace; color: var(--text-primary); }
  .schema-table .field-type { color: #3182CE; font-family: 'JetBrains Mono', monospace; font-size: 11px; }
  .schema-table .pk { background: var(--gold); color: var(--navy); font-size: 9px; font-weight: 700; padding: 1px 5px; border-radius: 3px; }
  .schema-table .fk { background: #BEE3F8; color: #2A4365; font-size: 9px; font-weight: 700; padding: 1px 5px; border-radius: 3px; }

  /* ─── DONATION BUTTON MAP ─── */
  .donation-map {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 20px 0;
  }
  .donation-btn {
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 14px 12px;
    text-align: center;
  }
  .donation-btn .db-amount {
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--navy);
    display: block;
  }
  .donation-btn .db-label {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 4px;
  }
  .donation-btn .db-msg {
    font-size: 11px;
    color: var(--gold-dark);
    margin-top: 6px;
    font-style: italic;
  }
  .donation-btn.popular {
    border-color: var(--gold);
    background: var(--gold-pale);
  }
  .donation-btn.popular .db-badge {
    background: var(--gold);
    color: var(--navy);
    font-size: 9px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 20px;
    display: inline-block;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* ─── NEW FEATURE HIGHLIGHT ─── */
  .new-badge {
    display: inline-block;
    background: #E53E3E;
    color: white;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 10px;
    margin-left: 8px;
    vertical-align: middle;
  }

  /* ─── FAILURE/RECOVERY ─── */
  .state-diagram {
    display: flex;
    gap: 16px;
    margin: 20px 0;
    align-items: stretch;
  }
  .state-box {
    flex: 1;
    border-radius: 10px;
    padding: 18px;
    border: 1px solid var(--border);
    text-align: center;
  }
  .state-box .sb-icon { font-size: 28px; margin-bottom: 8px; }
  .state-box .sb-title {
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
  }
  .state-box .sb-desc { font-size: 12px; color: var(--text-muted); }
  .state-box.success-state { background: #F0FFF4; border-color: #38A169; }
  .state-box.success-state .sb-title { color: #276749; }
  .state-box.fail-state { background: #FFF5F5; border-color: #E53E3E; }
  .state-box.fail-state .sb-title { color: #C53030; }
  .state-box.rescue-state { background: #FFFBEB; border-color: #D69E2E; }
  .state-box.rescue-state .sb-title { color: #744210; }
  .state-arrow {
    display: flex;
    align-items: center;
    color: var(--text-muted);
    font-size: 22px;
    flex-shrink: 0;
  }

  /* ─── TRANSPARENCY DASHBOARD ─── */
  .dashboard-preview {
    background: var(--navy);
    border-radius: 12px;
    padding: 24px;
    color: var(--white);
    margin: 20px 0;
  }
  .dashboard-preview h5 {
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    color: var(--gold);
    margin-bottom: 16px;
    letter-spacing: 0.5px;
  }
  .dash-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }
  .dash-stat {
    background: rgba(255,255,255,0.06);
    border-radius: 8px;
    padding: 12px;
    text-align: center;
  }
  .dash-stat .ds-val {
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--gold);
    display: block;
  }
  .dash-stat .ds-label { font-size: 10px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.5px; }
  .fund-usage { }
  .fund-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }
  .fund-bar-wrap { flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; }
  .fund-bar { height: 100%; background: var(--gold); border-radius: 3px; }
  .fund-label { font-size: 12px; color: rgba(255,255,255,0.7); min-width: 80px; }
  .fund-amount { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--gold); min-width: 70px; text-align: right; }

  /* ─── FOOTER ─── */
  .doc-footer {
    background: var(--navy);
    color: rgba(255,255,255,0.4);
    padding: 32px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    margin-top: 2px;
  }

  /* ─── PRINT ─── */
  @media print {
    .section { page-break-inside: avoid; }
    body { font-size: 13px; }
    .cover { padding: 40px; }
  }

  @media (max-width: 700px) {
    .cover { padding: 40px 24px; }
    .cover h1 { font-size: 28px; }
    .cover-meta { grid-template-columns: 1fr; }
    .section { padding: 36px 24px; }
    .toc-section { padding: 32px 24px; }
    .toc-grid { grid-template-columns: 1fr; }
    .feature-grid, .schema-grid { grid-template-columns: 1fr; }
    .level-grid { grid-template-columns: 1fr 1fr; }
    .tech-grid { grid-template-columns: 1fr 1fr; }
    .donation-map { grid-template-columns: 1fr 1fr; }
    .metrics-grid { grid-template-columns: 1fr 1fr; }
    .priority-matrix { grid-template-columns: 1fr; }
    .dash-stats { grid-template-columns: 1fr 1fr; }
    .state-diagram { flex-direction: column; }
  }
</style>
</head>
<body>

<!-- ═══════════════ COVER ═══════════════ -->
<div class="cover">
  <div class="container">
    <div class="cover-badge">Product Requirement Document · v2.0</div>
    <h1>₹50,00,000 Loan.<br><span>1 Son. 1 Mission.</span></h1>
    <p class="subtitle">Interactive Gamified Donation Platform — Complete PRD with Advanced Engagement Systems</p>
    <div class="cover-meta">
      <div class="cover-meta-item">
        <label>Goal</label>
        <span>₹50,00,000</span>
      </div>
      <div class="cover-meta-item">
        <label>Timeline</label>
        <span>18–24 Months</span>
      </div>
      <div class="cover-meta-item">
        <label>Primary Traffic</label>
        <span>Instagram → Web</span>
      </div>
      <div class="cover-meta-item">
        <label>Version</label>
        <span>2.0 — Full PRD</span>
      </div>
      <div class="cover-meta-item">
        <label>Platform</label>
        <span>Mobile-First Web</span>
      </div>
      <div class="cover-meta-item">
        <label>Payment</label>
        <span>PhonePe UPI</span>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ TABLE OF CONTENTS ═══════════════ -->
<div class="toc-section">
  <div class="container">
    <h2>Table of Contents</h2>
    <div class="toc-grid">
      <a class="toc-item" href="#s1"><span class="toc-num">01</span><span class="toc-label">Project Overview & Objectives</span></a>
      <a class="toc-item" href="#s2"><span class="toc-num">02</span><span class="toc-label">Design System & UX Principles</span></a>
      <a class="toc-item" href="#s3"><span class="toc-num">03</span><span class="toc-label">Website Structure & Sections</span></a>
      <a class="toc-item" href="#s4"><span class="toc-num">04</span><span class="toc-label">Level Gamification System</span></a>
      <a class="toc-item" href="#s5"><span class="toc-num">05</span><span class="toc-label">Level Failure & Recovery System ★</span></a>
      <a class="toc-item" href="#s6"><span class="toc-num">06</span><span class="toc-label">Community Rescue Mode ★</span></a>
      <a class="toc-item" href="#s7"><span class="toc-num">07</span><span class="toc-label">Smart Donation System</span></a>
      <a class="toc-item" href="#s8"><span class="toc-num">08</span><span class="toc-label">Character-Based Reactions</span></a>
      <a class="toc-item" href="#s9"><span class="toc-num">09</span><span class="toc-label">Impact Transparency Dashboard ★</span></a>
      <a class="toc-item" href="#s10"><span class="toc-num">10</span><span class="toc-label">Personal Progress vs. Donation ★</span></a>
      <a class="toc-item" href="#s11"><span class="toc-num">11</span><span class="toc-label">Streak / Consistency System ★</span></a>
      <a class="toc-item" href="#s12"><span class="toc-num">12</span><span class="toc-label">Social Proof & FOMO Boosters ★</span></a>
      <a class="toc-item" href="#s13"><span class="toc-num">13</span><span class="toc-label">Exit Intent Hook ★</span></a>
      <a class="toc-item" href="#s14"><span class="toc-num">14</span><span class="toc-label">Surprise Moments / Hidden Events ★</span></a>
      <a class="toc-item" href="#s15"><span class="toc-num">15</span><span class="toc-label">Hold-to-Donate Button ★</span></a>
      <a class="toc-item" href="#s16"><span class="toc-num">16</span><span class="toc-label">Post-Donation & Sharing System</span></a>
      <a class="toc-item" href="#s17"><span class="toc-num">17</span><span class="toc-label">Anti-Fraud Trust Layer ★</span></a>
      <a class="toc-item" href="#s18"><span class="toc-num">18</span><span class="toc-label">Analytics & Tracking ★</span></a>
      <a class="toc-item" href="#s19"><span class="toc-num">19</span><span class="toc-label">Content Hook Library (Instagram) ★</span></a>
      <a class="toc-item" href="#s20"><span class="toc-num">20</span><span class="toc-label">Admin Panel ★</span></a>
      <a class="toc-item" href="#s21"><span class="toc-num">21</span><span class="toc-label">Tech Stack & Architecture</span></a>
      <a class="toc-item" href="#s22"><span class="toc-num">22</span><span class="toc-label">Database Schema</span></a>
      <a class="toc-item" href="#s23"><span class="toc-num">23</span><span class="toc-label">User Flows & Wireframes</span></a>
      <a class="toc-item" href="#s24"><span class="toc-num">24</span><span class="toc-label">MVP Build Plan & Timeline</span></a>
      <a class="toc-item" href="#s25"><span class="toc-num">25</span><span class="toc-label">Feature Prioritization Matrix</span></a>
      <a class="toc-item" href="#s26"><span class="toc-num">26</span><span class="toc-label">Success Metrics</span></a>
      <a class="toc-item" href="#s27"><span class="toc-num">27</span><span class="toc-label">Character Design Specification ★</span></a>
    </div>
  </div>
</div>

<!-- ═══════════════ S1: PROJECT OVERVIEW ═══════════════ -->
<div class="section" id="s1">
  <div class="container">
    <div class="section-header">
      <span class="section-num">01</span>
      <h2>Project Overview & Core Objectives</h2>
    </div>
    <p>This platform is NOT a standard donation page. It is a <strong>real-life documentary fused with a gamified fundraising system and a social movement</strong>. Every design, copy, and feature decision must serve one purpose: make the user feel they are a participant in a genuine human story, not just a transaction.</p>

    <div class="callout info">
      <span class="callout-icon">🎯</span>
      <div class="callout-body">
        <strong>Core Emotional Goal</strong>
        <p>"Maine sirf paise nahi diye… main is journey ka hissa ban gaya hoon." — The user must feel this, not just read it.</p>
      </div>
    </div>

    <h3>Primary Objectives</h3>
    <div class="feature-grid">
      <div class="feature-card">
        <span class="fc-tag">Financial</span>
        <h4>Raise ₹50,00,000</h4>
        <p>Clear family loan across 18–24 months via structured gamified levels with increasing targets.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Traffic</span>
        <h4>Instagram → Web Conversion</h4>
        <p>Instagram is the primary acquisition channel. Website converts warm, emotionally primed traffic.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Trust</span>
        <h4>Radical Transparency</h4>
        <p>Show real income, real loan proof (blurred), real fund usage. No exaggerated drama.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Virality</span>
        <h4>Built-in Social Sharing</h4>
        <p>Auto-generate Instagram Stories, supporter walls, and shareable proof of participation.</p>
      </div>
    </div>

    <h3>Target User Psychology</h3>
    <p>The visitor arrives from Instagram already warmed up. They've seen real videos. They feel a connection. The website's job is to <strong>convert emotion into action</strong> — and then convert that action into advocacy.</p>
    <p>Users must feel: emotionally connected (authentic story), personally impactful (even ₹1 matters), part of a mission (not a charity transaction), and motivated to share (social identity boost).</p>
  </div>
</div>

<!-- ═══════════════ S2: DESIGN SYSTEM ═══════════════ -->
<div class="section" id="s2">
  <div class="container">
    <div class="section-header">
      <span class="section-num">02</span>
      <h2>Design System & UX Principles</h2>
    </div>

    <h3>Color Palette</h3>
    <div class="feature-grid">
      <div class="feature-card" style="border-left: 4px solid #0B1D2A;">
        <span class="fc-tag">Primary</span>
        <h4>#0B1D2A — Dark Navy</h4>
        <p>Trust, seriousness, depth. Used for backgrounds, headers, and primary UI elements.</p>
      </div>
      <div class="feature-card" style="border-left: 4px solid #FFD54F;">
        <span class="fc-tag">Accent</span>
        <h4>#FFD54F — Soft Gold</h4>
        <p>Hope, progress, warmth. Used for progress bars, CTAs, highlights, and milestone moments.</p>
      </div>
      <div class="feature-card" style="border-left: 4px solid #FFFFFF; background: #F7FAFC;">
        <span class="fc-tag">Secondary</span>
        <h4>#FFFFFF — Pure White</h4>
        <p>Clarity, honesty. Used for card backgrounds, text on dark, and breathing space.</p>
      </div>
      <div class="feature-card" style="border-left: 4px solid #E53E3E;">
        <span class="fc-tag">Alert</span>
        <h4>#E53E3E — Rescue Red</h4>
        <p>Urgency, rescue mode, failure states. Used sparingly for crisis moments only.</p>
      </div>
    </div>

    <h3>Typography</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Role</th><th>Font</th><th>Weight</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>Display / Headlines</td><td>Sora or similar geometric sans</td><td>700</td><td>Hero, section titles, level names</td></tr>
          <tr><td>Body Text</td><td>Lora (serif) or system serif</td><td>400</td><td>Story section, explanatory text</td></tr>
          <tr><td>Data / Code</td><td>JetBrains Mono</td><td>400–500</td><td>Progress numbers, amounts, timers</td></tr>
          <tr><td>UI Labels</td><td>Sora</td><td>600</td><td>Buttons, badges, metadata</td></tr>
        </tbody>
      </table>
    </div>

    <h3>UX Principles</h3>
    <div class="callout warning">
      <span class="callout-icon">📱</span>
      <div class="callout-body">
        <strong>Mobile-First is Non-Negotiable</strong>
        <p>Instagram traffic arrives on mobile. Every section must be designed for a 390px viewport first. Desktop is enhancement, not baseline.</p>
      </div>
    </div>
    <p><strong>Cinematic but Clean:</strong> Avoid scammy flash. Every visual element earns its place by adding emotional or informational value. Authentic &gt; Dramatic.</p>
    <p><strong>Low Friction Donation:</strong> From landing to payment initiation should be 3 taps maximum on mobile. No registration. No forms for small amounts.</p>
    <p><strong>Progressive Disclosure:</strong> The story unfolds as the user scrolls. Don't front-load everything. Build emotional investment before asking for money.</p>
  </div>
</div>

<!-- ═══════════════ S3: WEBSITE STRUCTURE ═══════════════ -->
<div class="section" id="s3">
  <div class="container">
    <div class="section-header">
      <span class="section-num">03</span>
      <h2>Website Structure & Sections</h2>
    </div>

    <h3>Section 1 — Hero</h3>
    <p><strong>Headline:</strong> "₹50,00,000 Loan. 1 Son. 1 Mission." | <strong>Subtext:</strong> "Join my journey to save my family" | <strong>CTA:</strong> "Support Now" (gold button, full-width on mobile)</p>
    <p>The hero includes a <strong>Live Progress Bar</strong> showing ₹ collected vs. ₹50L goal with a percentage and donor count. Semi-realistic Father & Son characters frame the visual, reacting to page state.</p>

    <h3>Section 2 — The Story</h3>
    <div class="flow-steps">
      <div class="flow-step">
        <span class="step-num">1</span>
        <div class="step-content">
          <strong>The Problem</strong>
          <p>Loan details with partially blurred documentary proof (screenshot/photo). Authentic, not dramatized. Shows real numbers.</p>
        </div>
      </div>
      <div class="flow-step">
        <span class="step-num">2</span>
        <div class="step-content">
          <strong>The Reality</strong>
          <p>Current income situation. Real numbers. Daily earnings tracker integrated. "I am also fighting — not just depending on you."</p>
        </div>
      </div>
      <div class="flow-step">
        <span class="step-num">3</span>
        <div class="step-content">
          <strong>The Mission</strong>
          <p>Clear actionable plan. Level-by-level breakdown of how the ₹50L will be reached. No vague promises.</p>
        </div>
      </div>
    </div>

    <h3>Section 3 — Current Level Progress</h3>
    <p>Full-width level card with: current level name, target amount, funds raised, countdown timer, progress bar. This is the primary conversion section.</p>

    <h3>Section 4 — Donation Widget</h3>
    <p>Predefined amount buttons + custom input + UPI payment trigger. Dynamic emotional messages update in real-time as user selects amounts.</p>

    <h3>Section 5 — Impact Transparency Dashboard</h3>
    <p>See Section 09 for full specification. Shows real fund usage, today's earnings, withdrawal log.</p>

    <h3>Section 6 — Supporter Wall</h3>
    <p>Live activity feed + public supporter list + badges. Social proof engine.</p>

    <h3>Section 7 — Daily Log</h3>
    <p>Day-wise updates, embedded short videos from Instagram, streak counter. "Day 27 of showing up."</p>
  </div>
</div>

<!-- ═══════════════ S4: LEVEL SYSTEM ═══════════════ -->
<div class="section" id="s4">
  <div class="container">
    <div class="section-header">
      <span class="section-num">04</span>
      <h2>Level-Based Gamification System</h2>
    </div>
    <p>The journey to ₹50L is broken into structured levels. Each level has a target, a deadline timer, a specific emotional context ("this level covers rent for 3 months"), and a visual theme shift on completion.</p>

    <h3>Trust Phase — Build Credibility</h3>
    <div class="level-grid">
      <div class="level-card trust"><div class="phase">Level 1</div><div class="amount">₹100</div><div class="days">Deadline: 1 Day · "Shuruaat"</div></div>
      <div class="level-card trust"><div class="phase">Level 2</div><div class="amount">₹1,000</div><div class="days">Deadline: 2 Days · "Pehli Umeed"</div></div>
      <div class="level-card trust"><div class="phase">Level 3</div><div class="amount">₹5,000</div><div class="days">Deadline: 5 Days · "Vishwas"</div></div>
      <div class="level-card trust"><div class="phase">Level 4</div><div class="amount">₹10,000</div><div class="days">Deadline: 7 Days · "Community"</div></div>
    </div>

    <h3>Momentum Phase — Build Velocity</h3>
    <div class="level-grid">
      <div class="level-card momentum"><div class="phase">Level 5</div><div class="amount">₹25,000</div><div class="days">Deadline: 10 Days</div></div>
      <div class="level-card momentum"><div class="phase">Level 6</div><div class="amount">₹50,000</div><div class="days">Deadline: 15 Days</div></div>
      <div class="level-card momentum"><div class="phase">Level 7</div><div class="amount">₹1,00,000</div><div class="days">Deadline: 20 Days</div></div>
    </div>

    <h3>Growth Phase</h3>
    <div class="level-grid">
      <div class="level-card growth"><div class="phase">Level 8</div><div class="amount">₹2,00,000</div><div class="days">Deadline: 25 Days</div></div>
      <div class="level-card growth"><div class="phase">Level 9</div><div class="amount">₹3,00,000</div><div class="days">Deadline: 30 Days</div></div>
      <div class="level-card growth"><div class="phase">Level 10</div><div class="amount">₹5,00,000</div><div class="days">Deadline: 45 Days</div></div>
    </div>

    <h3>Advanced & Final Phases</h3>
    <div class="level-grid">
      <div class="level-card advanced"><div class="phase">Level 11</div><div class="amount">₹7,00,000</div><div class="days">Deadline: 60 Days</div></div>
      <div class="level-card advanced"><div class="phase">Level 12</div><div class="amount">₹10,00,000</div><div class="days">Deadline: 75 Days</div></div>
      <div class="level-card final"><div class="phase">Levels 13–17</div><div class="amount">₹50,00,000</div><div class="days">Remaining · 90–100 Day Intervals</div></div>
    </div>

    <h3>Level Completion Features</h3>
    <p>On level completion: full-screen celebration animation, character reaction dialogue, social share trigger ("Level X completed! Join the journey"), and visual theme shift for the next level (darker/more dramatic as stakes increase).</p>
    <p><strong>Level Sponsor Feature:</strong> If a single user completes an entire level, that level is permanently attributed: "Level 3 was completed by Priya from Mumbai." Their name lives on the platform forever.</p>
  </div>
</div>

<!-- ═══════════════ S5: FAILURE & RECOVERY ═══════════════ -->
<div class="section" id="s5">
  <div class="container">
    <div class="section-header">
      <span class="section-num">05</span>
      <h2>Level Failure & Recovery System <span class="new-badge">NEW</span></h2>
    </div>
    <div class="callout info">
      <span class="callout-icon">🎬</span>
      <div class="callout-body">
        <strong>The Netflix Effect</strong>
        <p>Drama + realism = sustained engagement. When a level fails, it's not a dead end — it's a plot twist. The recovery becomes the story.</p>
      </div>
    </div>

    <h3>State Flow</h3>
    <div class="state-diagram">
      <div class="state-box success-state">
        <div class="sb-icon">✅</div>
        <div class="sb-title">Level Complete</div>
        <div class="sb-desc">Target reached before deadline. Celebration, share prompt, next level unlocks.</div>
      </div>
      <div class="state-arrow">→</div>
      <div class="state-box fail-state">
        <div class="sb-icon">⏰</div>
        <div class="sb-title">Level Failed</div>
        <div class="sb-desc">Timer hit zero. Target not met. Emotional moment — the story continues.</div>
      </div>
      <div class="state-arrow">→</div>
      <div class="state-box rescue-state">
        <div class="sb-icon">🔄</div>
        <div class="sb-title">Recovery Mode</div>
        <div class="sb-desc">User chooses: Extend deadline OR restart level with fresh energy.</div>
      </div>
    </div>

    <h3>UI Specification — Failure State</h3>
    <p>When a level timer expires without hitting the target, the platform enters a <strong>dimmed theme state</strong>:</p>
    <ul style="padding-left: 20px; margin: 12px 0;">
      <li style="margin-bottom: 8px;">Screen overlay shifts to a slightly desaturated, muted palette</li>
      <li style="margin-bottom: 8px;">Character animation: Father looks down, Son looks determined — not defeated</li>
      <li style="margin-bottom: 8px;">Banner text: <em>"Level not completed… but the journey continues."</em></li>
      <li style="margin-bottom: 8px;">Emotional copy from the creator (pre-written, honest): "Ye level miss ho gaya. Par main ruka nahi hoon."</li>
      <li style="margin-bottom: 8px;">Two large action buttons: <strong>"Extend This Level"</strong> (adds 50% of original time) and <strong>"Restart Level"</strong> (resets counter, fresh energy)</li>
      <li style="margin-bottom: 8px;">Progress is NOT reset — all donations already made are kept and carry forward</li>
    </ul>

    <h3>Content Strategy for Failure Moments</h3>
    <p>A level failure is a <strong>content event</strong> on Instagram. Pre-plan a video: "Aaj level fail ho gaya… dekho kya hua." This raw honesty builds more trust than 10 success posts. Failures make the story real. Plan at least 2–3 level "near misses" as deliberate content beats.</p>

    <div class="callout success">
      <span class="callout-icon">💡</span>
      <div class="callout-body">
        <strong>Psychological Insight</strong>
        <p>People root for someone who fails and gets back up far more than someone who succeeds effortlessly. Design failure states as emotional engagement hooks, not UX dead ends.</p>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ S6: COMMUNITY RESCUE MODE ═══════════════ -->
<div class="section" id="s6">
  <div class="container">
    <div class="section-header">
      <span class="section-num">06</span>
      <h2>Community Rescue Mode <span class="new-badge">NEW</span></h2>
    </div>
    <p>This is the <strong>single highest-converting feature</strong> in the platform. When a level is in its final hours with a funding gap, the platform activates an urgent rescue state that triggers immediate action.</p>

    <h3>Trigger Conditions</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Condition</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td>≤4 hours remaining AND gap > 30% of target</td><td>Full Rescue Mode activation</td></tr>
          <tr><td>≤2 hours remaining AND any gap exists</td><td>Rescue Mode + push notification</td></tr>
          <tr><td>≤30 minutes remaining AND gap > ₹500</td><td>Final Flash Mode (red theme, pulsing)</td></tr>
        </tbody>
      </table>
    </div>

    <h3>UI Elements in Rescue Mode</h3>
    <p><strong>Flash Banner (top of page, full-width):</strong> "🚨 We need ₹2,300 in the next 4 hours to complete Level 6. Can you help?"</p>
    <p><strong>Countdown Timer:</strong> Large, prominent, real-time countdown in hours:minutes:seconds format. Red color when under 1 hour.</p>
    <p><strong>Highlighted Donate Button:</strong> The donate button enlarges, pulses with a gold glow animation, and moves to a sticky position at the bottom of the screen (mobile).</p>
    <p><strong>Dynamic gap update:</strong> "Only ₹800 more needed!" updates in real-time as donations come in during rescue mode.</p>
    <p><strong>Social Rescue Share:</strong> One-tap button: "Share this rescue call" — pre-populates an Instagram story with the gap amount and timer.</p>

    <h3>Rescue Mode Copy Library (pre-written)</h3>
    <div class="code-block">
      <pre><span class="comment">// Rescue Mode Messages by Time Remaining</span>
<span class="kw">4 hours:</span>  <span class="str">"Abhi bhi ₹X ki zaroorat hai. 4 ghante bache hain. Kya aap help kar sakte hain?"</span>
<span class="kw">2 hours:</span>  <span class="str">"Sirf 2 ghante. ₹X chahiye. Aaj raat level complete ho sakta hai."</span>
<span class="kw">1 hour:</span>   <span class="str">"Last hour. ₹X remaining. Is moment ka hissa bano."</span>
<span class="kw">30 min:</span>   <span class="str">"30 minutes. ₹X. Ye aakhri mauka hai."</span>
<span class="kw">10 min:</span>   <span class="str">"FINAL 10 MINUTES. ₹X. Ab ya kabhi nahi."</span></pre>
    </div>
  </div>
</div>

<!-- ═══════════════ S7: SMART DONATION SYSTEM ═══════════════ -->
<div class="section" id="s7">
  <div class="container">
    <div class="section-header">
      <span class="section-num">07</span>
      <h2>Smart Donation System</h2>
    </div>

    <h3>Donation Amount Buttons</h3>
    <div class="donation-map">
      <div class="donation-btn">
        <span class="db-amount">₹1</span>
        <div class="db-msg">Shuruaat yahin se hoti hai 🙏</div>
      </div>
      <div class="donation-btn">
        <span class="db-amount">₹5</span>
        <div class="db-msg">Aap jaise log hope zinda rakhte hain 💙</div>
      </div>
      <div class="donation-btn">
        <span class="db-amount">₹10</span>
        <div class="db-msg">Meaningful step liya hai</div>
      </div>
      <div class="donation-btn popular">
        <div class="db-badge">Most Popular</div>
        <span class="db-amount">₹50</span>
        <div class="db-msg">Aaj ka ek zaroori kharch cover hoga</div>
      </div>
      <div class="donation-btn popular">
        <div class="db-badge">Recommended</div>
        <span class="db-amount">₹100</span>
        <div class="db-label">Official Supporter 🙏</div>
        <div class="db-msg">= 1 day expense support</div>
      </div>
      <div class="donation-btn">
        <span class="db-amount">₹500</span>
        <div class="db-msg">Backbone 💪</div>
      </div>
      <div class="donation-btn">
        <span class="db-amount">₹1,000</span>
        <div class="db-msg">Strong push ❤️</div>
      </div>
      <div class="donation-btn">
        <span class="db-amount">₹5,000+</span>
        <div class="db-msg">Life Saver 🔥</div>
      </div>
    </div>

    <h3>Smart Suggestion Engine <span class="new-badge">NEW</span></h3>
    <p>When a user selects an amount, the system intelligently nudges them upward without being pushy:</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>User Selects</th><th>System Suggests</th><th>Copy</th></tr></thead>
        <tbody>
          <tr><td>₹1 – ₹5</td><td>₹10</td><td>"Even ₹10 makes a bigger difference today 🙏"</td></tr>
          <tr><td>₹10</td><td>₹50</td><td>"Most users choose ₹50 — aap bhi try kar sakte hain"</td></tr>
          <tr><td>₹50</td><td>₹100</td><td>"₹100 se aap Official Supporter ban jaate hain"</td></tr>
          <tr><td>₹100</td><td>₹500</td><td>"₹1000 makes a real dent in this week's gap"</td></tr>
          <tr><td>₹500+</td><td>No nudge</td><td>Character reaction instead: Father dialogue appears</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Payment Flow</h3>
    <div class="flow-steps">
      <div class="flow-step">
        <span class="step-num">1</span>
        <div class="step-content"><strong>Amount Selection</strong><p>User taps predefined button or enters custom amount. Dynamic message appears immediately.</p></div>
      </div>
      <div class="flow-step">
        <span class="step-num">2</span>
        <div class="step-content"><strong>Upsell Nudge (if applicable)</strong><p>Soft suggestion shown for 2 seconds. Can be dismissed. Not a modal — inline below the buttons.</p></div>
      </div>
      <div class="flow-step">
        <span class="step-num">3</span>
        <div class="step-content"><strong>"Hold to Donate" Button Activation</strong><p>See Section 15 for hold-button spec. Or standard tap on mobile.</p></div>
      </div>
      <div class="flow-step">
        <span class="step-num">4</span>
        <div class="step-content"><strong>UPI Trigger</strong><p>Opens PhonePe / any UPI app via deep link or shows QR code. UPI ID displayed as fallback.</p></div>
      </div>
      <div class="flow-step">
        <span class="step-num">5</span>
        <div class="step-content"><strong>Post-Payment Confirmation</strong><p>User returns to website. Thank you screen + character reaction + optional selfie/share flow.</p></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ S8: CHARACTER REACTIONS ═══════════════ -->
<div class="section" id="s8">
  <div class="container">
    <div class="section-header">
      <span class="section-num">08</span>
      <h2>Character-Based Reactions</h2>
    </div>
    <p>Two semi-realistic illustrated characters anchor the emotional core of the platform. They are NOT cartoon-cute — they are dignified, real-feeling people.</p>

    <div class="feature-grid">
      <div class="feature-card">
        <span class="fc-tag">Character 1</span>
        <h4>The Father</h4>
        <p>Emotional, silent strength. Expresses gratitude quietly. His reactions feel heavy with meaning. Dialogues are short and weighty.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Character 2</span>
        <h4>The Son</h4>
        <p>Determined, hopeful, grateful. Speaks directly to the donor. More verbal, more energetic than the Father.</p>
      </div>
    </div>

    <h3>Dialogue Library by Donation Amount</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Amount</th><th>Father</th><th>Son</th></tr></thead>
        <tbody>
          <tr><td>₹1–₹10</td><td>"…" (nods slowly)</td><td>"Shukriya. Har rupaya maayane rakhta hai."</td></tr>
          <tr><td>₹50–₹100</td><td>"Beta… log humare saath hain."</td><td>"Thank you. Aapne ek step aage badhaya."</td></tr>
          <tr><td>₹500</td><td>"Aaj dil bhar aaya."</td><td>"Aap backbone hain is mission ke."</td></tr>
          <tr><td>₹1,000</td><td>"Bhagwan aapka bhala kare."</td><td>"Ye push bahut zaroori tha. Dil se shukriya."</td></tr>
          <tr><td>₹5,000+</td><td>Full emotional animation. Tears. Silent look to sky.</td><td>"Aapne aaj hamare ghar me ek diya jalaya."</td></tr>
          <tr><td>Level Completion</td><td>"Beta… humne ye kar diya." (voice breaks)</td><td>"[Donor name], you completed this level. Thank you."</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Surprise Hidden Dialogues <span class="new-badge">NEW</span></h3>
    <p>Certain random events unlock special character moments — see Section 14 for full specification.</p>
  </div>
</div>

<!-- ═══════════════ S8b: CHARACTER DESIGN SPEC ═══════════════ -->
<div class="section" id="s8b">
  <div class="container">
    <div class="section-header">
      <span class="section-num">08b</span>
      <h2>Character Design Specification <span class="new-badge">NEW</span></h2>
    </div>

    <div class="callout info">
      <span class="callout-icon">🎨</span>
      <div class="callout-body">
        <strong>Design Philosophy</strong>
        <p>Characters nahi hain — ye log hain. Har design decision yahi poochhe: "Kya ye real lagraha hai? Kya mujhe in par trust hoga?" Cartoon ya cute look strictly avoid karna hai. Dignity sabse pehle.</p>
      </div>
    </div>

    <h3>Art Style Direction</h3>
    <div class="feature-grid">
      <div class="feature-card" style="border-top: 3px solid #0B1D2A;">
        <span class="fc-tag">Style</span>
        <h4>Semi-Realistic Digital Illustration</h4>
        <p>Inspired by Indian editorial illustration — think <em>The Ken</em>, <em>Scroll</em> cover art. Clean lines, slightly stylized proportions, but clearly human and dignified. Not anime, not cartoon, not hyper-realistic 3D.</p>
      </div>
      <div class="feature-card" style="border-top: 3px solid #FFD54F;">
        <span class="fc-tag">Mood</span>
        <h4>Warm but Heavy</h4>
        <p>Color temperature should feel like a late evening at home. Warm browns, deep navy shadows, soft gold accents. Not bright or cheerful — weighted with real life.</p>
      </div>
      <div class="feature-card" style="border-top: 3px solid #718096;">
        <span class="fc-tag">Reference</span>
        <h4>Visual Inspiration</h4>
        <p>Reference artists: Chiara Ghigliazza (emotional portraits), Indian miniature proportions updated to modern flat-ish style. Faces should show age, texture, and authenticity.</p>
      </div>
      <div class="feature-card" style="border-top: 3px solid #38A169;">
        <span class="fc-tag">Avoid</span>
        <h4>What NOT to Do</h4>
        <p>No big sparkly eyes. No clean perfect skin. No "hero poster" poses. No superhero proportions. These are ordinary people facing extraordinary pressure. Design accordingly.</p>
      </div>
    </div>

    <h3>Character 1 — The Father (Papa)</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Attribute</th><th>Specification</th></tr></thead>
        <tbody>
          <tr><td>Age appearance</td><td>55–65 years. Visible wrinkles on forehead and around eyes. Grey in hair and beard.</td></tr>
          <tr><td>Build</td><td>Medium build, slightly hunched — the posture of someone who has carried weight for years. Not thin, not heavy. Real.</td></tr>
          <tr><td>Skin tone</td><td>Medium-dark brown (Hindustani skin tones). Warm undertone. No airbrushing or smoothing.</td></tr>
          <tr><td>Hair</td><td>Salt-and-pepper, short. Slightly unkempt — not styled. Stubble or short beard.</td></tr>
          <tr><td>Clothing</td><td>Simple kurta (plain, not printed). Off-white or light grey. Collar slightly open. Everyday wear — not festive, not work clothes.</td></tr>
          <tr><td>Eyes</td><td>Deep-set, dark brown. The eyes carry the emotion — they should look tired but not defeated. Watery in emotional poses.</td></tr>
          <tr><td>Default expression</td><td>Quiet dignity. Slight downward gaze. Not smiling in default state. The weight is visible.</td></tr>
          <tr><td>Hands</td><td>Visible in many poses. Rough, working-class hands. Slightly calloused. Hands tell a story.</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Character 2 — The Son (Beta / Creator)</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Attribute</th><th>Specification</th></tr></thead>
        <tbody>
          <tr><td>Age appearance</td><td>25–32 years. Young but with visible stress lines. Not a teenager — a man carrying responsibility.</td></tr>
          <tr><td>Build</td><td>Average to lean. Upright posture — determined, not broken. Slight forward lean = engaged energy.</td></tr>
          <tr><td>Skin tone</td><td>Similar to Father — medium brown. Family resemblance should be clear.</td></tr>
          <tr><td>Hair</td><td>Short, slightly tousled. Not styled. Could be slightly disheveled — this person is working, not posing.</td></tr>
          <tr><td>Clothing</td><td>Simple t-shirt or half-sleeve shirt. Could have a pocket. Clean but not expensive. Phone possibly visible in pocket — he's the one making content.</td></tr>
          <tr><td>Eyes</td><td>Bright, direct. Makes eye contact with the viewer — he's the one speaking to donors. Hopeful but exhausted.</td></tr>
          <tr><td>Default expression</td><td>Determined half-smile. Not grinning — this is not a cheerful situation. But there is resolve visible.</td></tr>
          <tr><td>Distinguishing feature</td><td>Optional: a small detail like a wristband, a small scar, or a simple chain — something personal that makes him feel real and specific.</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Pose & Expression Library</h3>
    <p>Each character needs the following <strong>minimum pose set</strong> for MVP. Each pose is a separate asset (PNG with transparent background).</p>

    <div class="table-wrap">
      <table>
        <thead><tr><th>Pose ID</th><th>Name</th><th>Description</th><th>Trigger</th><th>Priority</th></tr></thead>
        <tbody>
          <tr><td>F-01</td><td>Father — Default / Standing</td><td>Quiet, hands folded or by side. Slight downward gaze. Neutral dignity.</td><td>Page load, idle state</td><td>MVP</td></tr>
          <tr><td>F-02</td><td>Father — Grateful Nod</td><td>Head slightly bowed. Eyes closed or half-closed. Small dignified nod.</td><td>₹1–₹50 donation</td><td>MVP</td></tr>
          <tr><td>F-03</td><td>Father — Emotional (Hand on Heart)</td><td>Right hand placed on chest. Eyes glistening. Looking slightly up.</td><td>₹100–₹500 donation</td><td>MVP</td></tr>
          <tr><td>F-04</td><td>Father — Overwhelmed (Tears)</td><td>Eyes wet. Looking down. One hand covering mouth or wiping eye.</td><td>₹1000+ donation, level complete</td><td>MVP</td></tr>
          <tr><td>F-05</td><td>Father — Looking at Son</td><td>Sideways glance toward Son character. Expression: pride mixed with pain.</td><td>Level completion shared moment</td><td>V1.1</td></tr>
          <tr><td>F-06</td><td>Father — Dim / Defeat</td><td>Slumped slightly. Head down. Hands hanging. Not broken — exhausted.</td><td>Level failure state</td><td>V1.1</td></tr>
          <tr><td>F-07</td><td>Father — Hope (Looking Up)</td><td>Chin slightly raised. Eyes looking forward and slightly up. A quiet hope.</td><td>Recovery mode, new level start</td><td>V1.2</td></tr>
          <tr><td>S-01</td><td>Son — Default / Standing</td><td>Upright, arms relaxed. Direct gaze at viewer. Determined but tired.</td><td>Page load, idle state</td><td>MVP</td></tr>
          <tr><td>S-02</td><td>Son — Grateful Smile</td><td>Warm smile. Eyes soft. Slight forward lean toward viewer.</td><td>Any donation received</td><td>MVP</td></tr>
          <tr><td>S-03</td><td>Son — Energized / Fist</td><td>Subtle fist pump or forward step. Energy visible — "ye ho sakta hai."</td><td>Milestone reached, rescue mode</td><td>MVP</td></tr>
          <tr><td>S-04</td><td>Son — Speaking (Dialogue)</td><td>Mouth slightly open, hands gesturing. Mid-sentence pose.</td><td>Dialogue bubbles appear</td><td>MVP</td></tr>
          <tr><td>S-05</td><td>Son — Emotional (Eyes wet)</td><td>Fighting tears. Jaw set. Not breaking down — holding together.</td><td>₹1000+ donations, big moments</td><td>V1.1</td></tr>
          <tr><td>S-06</td><td>Son — Dim / Tired</td><td>Head slightly drooped. Eyes tired. Hands in pockets.</td><td>Level failure state</td><td>V1.1</td></tr>
          <tr><td>S-07</td><td>Son — Pointing (to progress bar)</td><td>Hand extended pointing right/up — toward the progress. "Dekho, hum aa rahe hain."</td><td>Progress milestone, level near complete</td><td>V1.2</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Together Poses (Both Characters)</h3>
    <div class="feature-grid">
      <div class="feature-card">
        <span class="fc-tag">Together — T01</span>
        <h4>Side by Side — Default</h4>
        <p>Father and Son standing together. Father's hand on Son's shoulder. Hero section composition. This is the primary establishing image.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Together — T02</span>
        <h4>Level Complete Celebration</h4>
        <p>Son has arm raised slightly. Father looks at him with quiet pride. Not jubilant — relieved. Real celebration looks like exhaling, not jumping.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Together — T03</span>
        <h4>Failure Moment</h4>
        <p>Both looking down. Son's hand on Father's arm. Supportive. Heavy. "We'll try again." Used in level failure state.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Together — T04</span>
        <h4>Thank You — Folded Hands</h4>
        <p>Both with hands folded (namaste gesture). Looking at viewer. Used in post-donation thank you screen. Simple, sincere, powerful.</p>
      </div>
    </div>

    <h3>Animation Specification</h3>
    <div class="callout warning">
      <span class="callout-icon">⚙️</span>
      <div class="callout-body">
        <strong>Recommended Approach: Lottie Animations</strong>
        <p>Static PNGs for MVP. Lottie JSON animations for V1.1 and beyond. Lottie gives smooth, lightweight, scalable animations that work perfectly on mobile web without heavy video files.</p>
      </div>
    </div>

    <div class="table-wrap">
      <table>
        <thead><tr><th>Animation</th><th>Duration</th><th>Format</th><th>Phase</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Idle breathing</td><td>3s loop</td><td>Lottie</td><td>V1.1</td><td>Subtle chest rise/fall. Makes character feel alive. Very slow, very subtle.</td></tr>
          <tr><td>Pose transition</td><td>0.4s</td><td>CSS fade / Lottie</td><td>MVP</td><td>Cross-fade between poses. Simple opacity transition for MVP. Full morph in V1.1.</td></tr>
          <tr><td>Grateful nod</td><td>1.2s, once</td><td>Lottie</td><td>V1.1</td><td>Head dips slowly, returns. Hands move slightly. Triggers on small donations.</td></tr>
          <tr><td>Hand on heart</td><td>1.5s, once</td><td>Lottie</td><td>V1.1</td><td>Hand rises to chest, rests. Eyes close briefly. Medium donation trigger.</td></tr>
          <tr><td>Tear / emotion</td><td>2s, once</td><td>Lottie</td><td>V1.2</td><td>Eye shimmer, slight head drop. Very restrained. Not dramatic wailing.</td></tr>
          <tr><td>Level complete burst</td><td>3s, once</td><td>Lottie + CSS particles</td><td>V1.1</td><td>Characters animate together. Gold particle burst around them. Joyful but dignified.</td></tr>
          <tr><td>Dialogue bubble appear</td><td>0.3s</td><td>CSS</td><td>MVP</td><td>Bubble scales up from character's head position with slight bounce ease.</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Technical Specifications</h3>
    <div class="feature-grid">
      <div class="feature-card">
        <span class="fc-tag">File Format — MVP</span>
        <h4>PNG — Transparent Background</h4>
        <p>All poses exported as PNG with alpha transparency. Standard resolution: 800×1000px per character. Compressed with TinyPNG. Served via Cloudinary CDN with WebP auto-conversion.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">File Format — V1.1</span>
        <h4>Lottie JSON</h4>
        <p>Animations created in Adobe After Effects → exported via Bodymovin plugin as Lottie JSON. Rendered with <code>lottie-web</code> library. Max file size: 150KB per animation.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Sizing</span>
        <h4>Responsive Sizing</h4>
        <p>Mobile hero: characters at 280px height, side by side. Donation widget: single character at 160px. Thank you screen: 320px centered. Always maintain aspect ratio — never stretch.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Placement</span>
        <h4>Z-Index & Layering</h4>
        <p>Characters always above background, below dialogue bubbles. Dialogue bubbles emerge from head level of the speaking character. On mobile: characters stack vertically in some sections.</p>
      </div>
    </div>

    <h3>Dialogue Bubble Design</h3>
    <p>When a character speaks, a styled dialogue bubble appears near their head. Design spec:</p>
    <ul style="padding-left: 20px; margin: 12px 0;">
      <li style="margin-bottom: 8px;"><strong>Shape:</strong> Rounded rectangle with a small triangular pointer toward the character's mouth area</li>
      <li style="margin-bottom: 8px;"><strong>Father bubble:</strong> Dark navy background (#0B1D2A), white text, gold border — heavy, weighty feeling</li>
      <li style="margin-bottom: 8px;"><strong>Son bubble:</strong> White background, dark navy text, subtle border — lighter, more direct</li>
      <li style="margin-bottom: 8px;"><strong>Font:</strong> Lora italic for Father (older, traditional feeling), Sora regular for Son (modern, direct)</li>
      <li style="margin-bottom: 8px;"><strong>Animation:</strong> Appears with 0.3s scale-up ease. Disappears after 4–6 seconds (depending on text length) with 0.2s fade</li>
      <li style="margin-bottom: 8px;"><strong>Max characters per bubble:</strong> 80 characters. Keep all dialogue short — these are emotional beats, not speeches</li>
    </ul>

    <h3>How to Create the Characters — 3 Options</h3>
    <div class="feature-grid">
      <div class="feature-card" style="border-top: 3px solid #38A169;">
        <span class="fc-tag" style="color: #276749;">Option A — Recommended</span>
        <h4>Hire a Freelance Illustrator</h4>
        <p><strong>Where:</strong> Fiverr (search "Indian character illustration"), Instagram (find Indian editorial artists), Behance. <strong>Budget:</strong> ₹8,000–₹25,000 for full pose set. Brief them with this document. Ask for layered PSD files so expressions can be swapped.</p>
      </div>
      <div class="feature-card" style="border-top: 3px solid #3182CE;">
        <span class="fc-tag" style="color: #2A4365;">Option B — AI + Refinement</span>
        <h4>AI Generated + Manual Polish</h4>
        <p><strong>Tools:</strong> Midjourney or Adobe Firefly for base images. Prompt: "semi-realistic Indian man, 60 years old, dignified, editorial illustration style, transparent background." Then refine in Photoshop or Figma. <strong>Budget:</strong> ₹0–₹3,000 for tools. Time: 2–4 days.</p>
      </div>
      <div class="feature-card" style="border-top: 3px solid #D69E2E;">
        <span class="fc-tag" style="color: #744210;">Option C — Real Photo Style</span>
        <h4>Stylized Real Photos</h4>
        <p>Take real photos of yourself and your father in the required poses. Use AI tools (Stable Diffusion img2img, or Adobe Neural Filters) to convert to illustration style. Most authentic because it IS you. <strong>Budget:</strong> ₹0–₹2,000. Highest emotional authenticity.</p>
      </div>
      <div class="feature-card" style="border-top: 3px solid #9F7AEA;">
        <span class="fc-tag" style="color: #553C9A;">Option D — Phase It</span>
        <h4>Start Simple, Upgrade Later</h4>
        <p>Launch MVP with simple silhouette/flat illustrations (can be done in Canva or by any basic designer). Replace with high-quality illustrations in V1.1 once revenue starts. Don't let character creation block launch.</p>
      </div>
    </div>

    <h3>Freelancer Brief Template</h3>
    <div class="code-block">
      <pre><span class="comment">// Copy-paste this when briefing a freelance illustrator</span>

<span class="kw">PROJECT:</span> <span class="str">Semi-realistic character illustration for donation website</span>

<span class="kw">STYLE:</span> <span class="str">Semi-realistic digital illustration. Indian editorial art style.
NOT cartoon, NOT anime, NOT 3D render. Think Scroll.in or
The Ken cover art style. Clean lines, slightly stylized,
clearly human and dignified.</span>

<span class="kw">CHARACTERS:</span>
<span class="str">1. Father — Indian man, 55-65 years, medium-dark skin, grey
   hair/beard, simple off-white kurta, tired but dignified eyes.
   Working class. Wrinkles visible. Real, not glamorized.

2. Son — Indian man, 25-32 years, same skin tone as father
   (family resemblance important), simple t-shirt or shirt,
   direct gaze, determined expression, slightly tousled hair.</span>

<span class="kw">DELIVERABLES NEEDED:</span>
<span class="str">- 7 poses for Father (list F-01 through F-07)
- 7 poses for Son (list S-01 through S-07)
- 4 together poses (list T-01 through T-04)
- All as PNG with transparent background
- 800x1000px per character, 300dpi
- Layered PSD files included</span>

<span class="kw">COLOR PALETTE:</span>
<span class="str">- Background: transparent
- Skin: warm medium-dark brown tones
- Clothing: muted, everyday colors (no bright red/yellow clothing)
- Shadows: deep navy (#0B1D2A)
- Emotional moments: slight gold/warm light (#FFD54F) on face</span>

<span class="kw">AVOID:</span>
<span class="str">- Smiling in default poses
- Perfect skin / airbrushed look
- Hero/poster poses
- Bright colors or festive clothing
- Western art style references</span></pre>
    </div>

    <h3>Character Integration in Code</h3>
    <div class="code-block">
      <pre><span class="comment">// React component structure for character system</span>

<span class="kw">const</span> <span class="type">CharacterReaction</span> = ({ donationAmount }) => {
  <span class="kw">const</span> fatherPose = <span class="type">getFatherPose</span>(donationAmount);
  <span class="kw">const</span> sonPose = <span class="type">getSonPose</span>(donationAmount);
  <span class="kw">const</span> dialogue = <span class="type">getDialogue</span>(donationAmount);

  <span class="kw">return</span> (
    &lt;div className=<span class="str">"character-container"</span>&gt;
      &lt;CharacterFigure
        pose={fatherPose}
        <span class="comment">// e.g. /characters/father-f03.png</span>
        dialogueBubble={dialogue.father}
        bubbleStyle=<span class="str">"navy"</span>
      /&gt;
      &lt;CharacterFigure
        pose={sonPose}
        dialogueBubble={dialogue.son}
        bubbleStyle=<span class="str">"white"</span>
      /&gt;
    &lt;/div&gt;
  );
};

<span class="comment">// Pose mapping logic</span>
<span class="kw">const</span> <span class="type">getFatherPose</span> = (amount) => {
  <span class="kw">if</span> (amount >= 5000) <span class="kw">return</span> <span class="str">'F-04'</span>; <span class="comment">// overwhelmed</span>
  <span class="kw">if</span> (amount >= 1000) <span class="kw">return</span> <span class="str">'F-04'</span>; <span class="comment">// emotional</span>
  <span class="kw">if</span> (amount >= 500)  <span class="kw">return</span> <span class="str">'F-03'</span>; <span class="comment">// hand on heart</span>
  <span class="kw">if</span> (amount >= 50)   <span class="kw">return</span> <span class="str">'F-02'</span>; <span class="comment">// grateful nod</span>
  <span class="kw">return</span> <span class="str">'F-01'</span>;                         <span class="comment">// default</span>
};</pre>
    </div>

    <h3>Asset Delivery Checklist</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Asset</th><th>Format</th><th>Size</th><th>Quantity</th><th>Phase</th></tr></thead>
        <tbody>
          <tr><td>Individual character poses</td><td>PNG (transparent)</td><td>800×1000px</td><td>14 (7 each)</td><td>MVP</td></tr>
          <tr><td>Together poses</td><td>PNG (transparent)</td><td>1200×1000px</td><td>4</td><td>MVP</td></tr>
          <tr><td>Layered source files</td><td>PSD or Figma</td><td>—</td><td>2 (one per character)</td><td>MVP</td></tr>
          <tr><td>WebP compressed versions</td><td>WebP</td><td>Auto via Cloudinary</td><td>Auto</td><td>MVP</td></tr>
          <tr><td>Idle breathing animation</td><td>Lottie JSON</td><td>Max 80KB</td><td>2</td><td>V1.1</td></tr>
          <tr><td>Pose transition animations</td><td>Lottie JSON</td><td>Max 150KB each</td><td>8–10</td><td>V1.1</td></tr>
          <tr><td>Level complete animation</td><td>Lottie JSON</td><td>Max 200KB</td><td>1 (both chars)</td><td>V1.1</td></tr>
          <tr><td>Emotion animations (cry, nod)</td><td>Lottie JSON</td><td>Max 100KB each</td><td>4–5</td><td>V1.2</td></tr>
        </tbody>
      </table>
    </div>

  </div>
</div>

<!-- ═══════════════ S9: IMPACT TRANSPARENCY ═══════════════ -->
<div class="section" id="s9">
  <div class="container">
    <div class="section-header">
      <span class="section-num">09</span>
      <h2>Impact Transparency Dashboard <span class="new-badge">NEW</span></h2>
    </div>
    <div class="callout success">
      <span class="callout-icon">🔐</span>
      <div class="callout-body">
        <strong>Trust = Paisa</strong>
        <p>The transparency dashboard is not a nice-to-have — it is the primary trust engine. Donors who see exactly where their money went are 3x more likely to donate again.</p>
      </div>
    </div>

    <h3>Dashboard Preview (Visual Specification)</h3>
    <div class="dashboard-preview">
      <h5>Impact Dashboard — Live View</h5>
      <div class="dash-stats">
        <div class="dash-stat"><span class="ds-val">₹47,230</span><div class="ds-label">Total Collected</div></div>
        <div class="dash-stat"><span class="ds-val">₹3,100</span><div class="ds-label">Today</div></div>
        <div class="dash-stat"><span class="ds-val">₹12,000</span><div class="ds-label">Last Withdrawal</div></div>
        <div class="dash-stat"><span class="ds-val">843</span><div class="ds-label">Supporters</div></div>
      </div>
      <div class="fund-usage">
        <div style="font-size: 11px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Funds Used For</div>
        <div class="fund-row"><span class="fund-label">Ration</span><div class="fund-bar-wrap"><div class="fund-bar" style="width: 70%"></div></div><span class="fund-amount">₹5,000</span></div>
        <div class="fund-row"><span class="fund-label">Electricity</span><div class="fund-bar-wrap"><div class="fund-bar" style="width: 27%"></div></div><span class="fund-amount">₹2,000</span></div>
        <div class="fund-row"><span class="fund-label">Loan EMI</span><div class="fund-bar-wrap"><div class="fund-bar" style="width: 67%"></div></div><span class="fund-amount">₹5,000</span></div>
      </div>
    </div>

    <h3>Data Fields Tracked</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Field</th><th>Source</th><th>Update Frequency</th><th>Visibility</th></tr></thead>
        <tbody>
          <tr><td>Total collected (all time)</td><td>Database sum</td><td>Real-time</td><td>Public</td></tr>
          <tr><td>Today's collection</td><td>Database, filtered by date</td><td>Real-time</td><td>Public</td></tr>
          <tr><td>Last withdrawal amount + date</td><td>Admin panel input</td><td>Manual update</td><td>Public</td></tr>
          <tr><td>Withdrawal purpose breakdown</td><td>Admin panel input</td><td>Per withdrawal</td><td>Public</td></tr>
          <tr><td>Loan original amount</td><td>Static</td><td>Never changes</td><td>Public</td></tr>
          <tr><td>Loan remaining</td><td>Calculated</td><td>Per withdrawal</td><td>Public</td></tr>
          <tr><td>Creator's daily earnings</td><td>Admin panel input</td><td>Daily</td><td>Public</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- ═══════════════ S10: PERSONAL PROGRESS ═══════════════ -->
<div class="section" id="s10">
  <div class="container">
    <div class="section-header">
      <span class="section-num">10</span>
      <h2>Personal Progress vs. Donation Tracker <span class="new-badge">NEW</span></h2>
    </div>
    <p>This feature separates this platform from every other crowdfunding site. It shows the creator's <strong>own effort and earnings</strong> alongside donation figures.</p>

    <div class="callout warning">
      <span class="callout-icon">💪</span>
      <div class="callout-body">
        <strong>Core Message</strong>
        <p>"Main bhi fight kar raha hoon, sirf depend nahi hoon." This builds profound respect — donors are supporting someone who is actively fighting, not just asking.</p>
      </div>
    </div>

    <h3>Daily Progress Card (shown in Daily Log section)</h3>
    <div class="feature-grid">
      <div class="feature-card" style="border: 2px solid #0B1D2A;">
        <span class="fc-tag">My Effort Today</span>
        <h4>Today I Earned: ₹850</h4>
        <p>From my own work (shop, freelance, etc.). Updated daily by creator via admin panel.</p>
      </div>
      <div class="feature-card" style="border: 2px solid var(--gold);">
        <span class="fc-tag">From Community</span>
        <h4>From Donations: ₹3,200</h4>
        <p>Today's donation total. Shows the community's multiplier effect on creator's solo effort.</p>
      </div>
    </div>

    <h3>Monthly Breakdown</h3>
    <p>A monthly bar chart showing personal earnings vs. donation income. As the months pass, the ideal trajectory shows personal earnings <em>growing</em> while the donation dependency decreases — demonstrating genuine progress toward self-sufficiency.</p>
    <p><strong>Copy goal:</strong> "Dekho — March me mujhe aapki zaroorat zyada thi. Ab April me kam. Hum milke kaam kar rahe hain."</p>
  </div>
</div>

<!-- ═══════════════ S11: STREAK SYSTEM ═══════════════ -->
<div class="section" id="s11">
  <div class="container">
    <div class="section-header">
      <span class="section-num">11</span>
      <h2>Streak / Consistency System <span class="new-badge">NEW</span></h2>
    </div>
    <p>Followers should have a reason to check back every single day. The streak system creates that habit loop.</p>

    <h3>Creator Streak</h3>
    <p>Displayed prominently in the hero or header: <strong>"Day 27 of showing up"</strong> — counter of consecutive days the creator has posted an update, logged earnings, or uploaded a video.</p>
    <p>Badge unlocks at milestones: Day 7 → "First Week Fighter", Day 30 → "Consistent Fighter", Day 100 → "100 Day Warrior", Day 365 → "Year One Survivor"</p>
    <p>If the creator misses a day: streak pauses (not resets) with a honest explanation note. <em>"Kal nahi ho paya… lekin main vapas hoon."</em> This authentic accountability is content itself.</p>

    <h3>Donor Streak</h3>
    <p>Optional: if a user donates on consecutive days (even ₹1), they receive a "Daily Supporter" badge and a streak counter visible on the supporter wall.</p>

    <h3>Implementation</h3>
    <p>Creator streak is maintained via admin panel daily check-in. System sends a reminder notification to creator at 9 PM if no update posted that day. Streak data is stored in the <code>creator_logs</code> database table with timestamps.</p>
  </div>
</div>

<!-- ═══════════════ S12: SOCIAL PROOF ═══════════════ -->
<div class="section" id="s12">
  <div class="container">
    <div class="section-header">
      <span class="section-num">12</span>
      <h2>Social Proof & FOMO Boosters <span class="new-badge">NEW</span></h2>
    </div>

    <h3>Live Activity Feed</h3>
    <p>A real-time ticker at the top or side of the page: <em>"Rahul from Delhi donated ₹100 — 2 minutes ago"</em>, <em>"Priya from Mumbai donated ₹500 — just now"</em>. This creates urgency and validates that others are participating.</p>
    <p>For privacy: only show name + city + amount for users who opted in. For opt-out users: show "A supporter from [State] donated ₹X."</p>

    <h3>Social Proof Counter Badges</h3>
    <div class="feature-grid">
      <div class="feature-card">
        <span class="fc-tag">Live Count</span>
        <h4>X people supported today</h4>
        <p>Updates in real-time. Shown near the donate button. Resets at midnight.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Live View</span>
        <h4>Y people viewing this now</h4>
        <p>Shows current active sessions (or an estimate ± noise for very low numbers). Creates real-time social pressure.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Milestone</span>
        <h4>Level X% complete</h4>
        <p>Shown prominently. As percentage rises, visual progress bar animates — visible encouragement.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Scarcity</span>
        <h4>Only X days left in level</h4>
        <p>Time scarcity creates urgency. Honest — this is a real deadline.</p>
      </div>
    </div>

    <div class="callout danger">
      <span class="callout-icon">⚠️</span>
      <div class="callout-body">
        <strong>Honesty Constraint</strong>
        <p>Never fake the "viewing now" number. Use real session data. If 0 people are viewing, show nothing rather than a fabricated number. Trust is the entire value proposition.</p>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ S13: EXIT INTENT ═══════════════ -->
<div class="section" id="s13">
  <div class="container">
    <div class="section-header">
      <span class="section-num">13</span>
      <h2>Exit Intent Hook <span class="new-badge">NEW</span></h2>
    </div>
    <p>When a user shows exit intent (mouse moves to close tab on desktop; back button or rapid scroll-up on mobile), a gentle, non-aggressive popup appears.</p>

    <h3>Desktop Trigger</h3>
    <p>Mouse moves above viewport threshold → popup appears after 300ms delay.</p>

    <h3>Mobile Trigger</h3>
    <p>User rapidly scrolls back to top OR address bar reappears (scroll-up signal) → popup appears.</p>

    <h3>Popup Design</h3>
    <p><strong>Copy:</strong> "Even ₹10 can help today 🙏" — with the Father character looking directly at the viewer.</p>
    <p><strong>CTA:</strong> Large gold "Support ₹10" button (pre-selects ₹10 and initiates UPI flow). Secondary: "Not today" link (plain text, no button styling — never say "No thanks" which creates cognitive friction with self-identity).</p>
    <p><strong>Design constraints:</strong> Single appearance per session. Never shows twice in the same visit. Never shows if user has already donated. Never shows during Rescue Mode (user is already engaged).</p>
  </div>
</div>

<!-- ═══════════════ S14: SURPRISE MOMENTS ═══════════════ -->
<div class="section" id="s14">
  <div class="container">
    <div class="section-header">
      <span class="section-num">14</span>
      <h2>Surprise Moments / Hidden Events <span class="new-badge">NEW</span></h2>
    </div>
    <p>Unexpected moments of delight keep users emotionally invested and returning. These are <strong>rare, random unlocks</strong> — not triggered by donation amount but by time, milestones, or random chance.</p>

    <h3>Event Types</h3>
    <div class="feature-grid">
      <div class="feature-card">
        <span class="fc-tag">Hidden Unlock</span>
        <h4>Special Thank You Video</h4>
        <p>On the 100th donation of any day, a pre-recorded personal thank-you video from the creator auto-plays on the next visitor's screen. "Aaj 100 log aaye… mujhe rona aa gaya."</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Hidden Unlock</span>
        <h4>Papa Ka Message</h4>
        <p>At random (1-in-50 chance for donors above ₹100), a short recorded message from the Father appears. Quiet, simple, genuine. Most users will never see it — those who do will share it.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Milestone Event</span>
        <h4>Journey Milestone Video</h4>
        <p>At Day 30, Day 100, Day 365 — a special video diary entry unlocks for all users. "30 din baad… ye mera haal hai." Builds longitudinal engagement.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Random Delight</span>
        <h4>Handwritten Thank You</h4>
        <p>Every 7th donor of the day receives a notification: "Your name will be written in my diary tonight. Shukriya." A photo of the actual diary entry is posted next day.</p>
      </div>
    </div>

    <h3>Implementation Note</h3>
    <p>All surprise events are pre-planned content, not spontaneous. Create a content calendar of 20+ surprise moments before launch. The "randomness" is orchestrated through the admin panel's event scheduler.</p>
  </div>
</div>

<!-- ═══════════════ S15: HOLD TO DONATE ═══════════════ -->
<div class="section" id="s15">
  <div class="container">
    <div class="section-header">
      <span class="section-num">15</span>
      <h2>Hold-to-Donate Button <span class="new-badge">NEW</span></h2>
    </div>
    <p>Instead of a standard tap/click, the primary donation CTA uses a <strong>hold-to-confirm</strong> interaction. This creates a deliberate, slightly addictive micro-interaction that feels intentional and meaningful.</p>

    <h3>Interaction Specification</h3>
    <div class="flow-steps">
      <div class="flow-step">
        <span class="step-num">1</span>
        <div class="step-content"><strong>User presses and holds the button</strong><p>A circular progress ring fills around the button edge over 1.5 seconds. The button text changes from "Donate ₹100" to "Hold to confirm..."</p></div>
      </div>
      <div class="flow-step">
        <span class="step-num">2</span>
        <div class="step-content"><strong>Ring fills completely</strong><p>Haptic feedback (on supported devices). Gold flash animation. Button transforms into a checkmark for 500ms.</p></div>
      </div>
      <div class="flow-step">
        <span class="step-num">3</span>
        <div class="step-content"><strong>UPI flow initiates</strong><p>Deep link opens payment app. If user releases before ring completes, button resets without triggering payment — no accidental donations.</p></div>
      </div>
    </div>

    <h3>Why This Works</h3>
    <p>The hold action creates a <strong>commitment moment</strong>. The physical engagement of holding the button for 1.5 seconds makes the act feel intentional and meaningful — not like clicking "OK" on a dialog. It also prevents accidental donations (reducing refund requests) and creates a memorable UI signature that users will mention when sharing.</p>
    <p><strong>Fallback:</strong> Standard tap for users who prefer it. Hold-to-donate is the default on mobile; standard click on desktop.</p>
  </div>
</div>

<!-- ═══════════════ S16: POST-DONATION ═══════════════ -->
<div class="section" id="s16">
  <div class="container">
    <div class="section-header">
      <span class="section-num">16</span>
      <h2>Post-Donation & Community Systems</h2>
    </div>

    <h3>Post-Payment Interaction Flow</h3>
    <div class="flow-steps">
      <div class="flow-step"><span class="step-num">1</span><div class="step-content"><strong>Dynamic Thank You Screen</strong><p>Full-screen thank you with character reaction animation appropriate to donation amount. Personalized if name was provided.</p></div></div>
      <div class="flow-step"><span class="step-num">2</span><div class="step-content"><strong>Feature Opt-In</strong><p>"Do you want to be featured on the Supporter Wall?" — Name input, State/City, optional selfie/camera capture.</p></div></div>
      <div class="flow-step"><span class="step-num">3</span><div class="step-content"><strong>Auto Story Generator (Canvas API)</strong><p>Generates a shareable Instagram Story: user selfie (if provided) + amount donated + progress snapshot + "I supported this journey." One-tap share to Instagram Stories.</p></div></div>
      <div class="flow-step"><span class="step-num">4</span><div class="step-content"><strong>Reward Notification</strong><p>₹100+ → Thank you message, ₹500+ → Instagram story mention, ₹1000+ → Personal shoutout, ₹5000+ → Special video message.</p></div></div>
    </div>

    <h3>Supporter Wall</h3>
    <p>Public list (opt-in) with badge tiers: Supporter (₹1–₹99), Backbone (₹100–₹999), Life Saver (₹1000–₹4999), Legend (₹5000+). Each entry shows: name, city, donation amount, date, optional selfie thumbnail.</p>
  </div>
</div>

<!-- ═══════════════ S17: ANTI-FRAUD ═══════════════ -->
<div class="section" id="s17">
  <div class="container">
    <div class="section-header">
      <span class="section-num">17</span>
      <h2>Anti-Fraud Trust Layer <span class="new-badge">NEW</span></h2>
    </div>
    <div class="callout info">
      <span class="callout-icon">🔐</span>
      <div class="callout-body">
        <strong>Why This Matters</strong>
        <p>Any donation platform without visible accountability mechanisms raises immediate skepticism. The anti-fraud layer is also a trust marketing tool — it shows you have nothing to hide.</p>
      </div>
    </div>

    <h3>Transparency Mechanisms</h3>
    <div class="feature-grid">
      <div class="feature-card">
        <span class="fc-tag">Public Record</span>
        <h4>All Donations Trackable</h4>
        <p>Every donation logged with timestamp and (if opted in) donor name. Public ledger page shows all transactions. "Every rupee is accountable."</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Transaction Log</span>
        <h4>Unique Transaction IDs</h4>
        <p>Every UPI transaction generates a unique ID logged in database. Donors can verify their specific transaction appears in the public log.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Withdrawal Proof</span>
        <h4>Photo Evidence per Withdrawal</h4>
        <p>Every withdrawal is documented: screenshot of bank transfer + receipt of what it was used for (ration bill, electricity bill, loan receipt). Uploaded to platform.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">No Fakes</span>
        <h4>No Fake Entries Policy</h4>
        <p>Admin panel has zero mechanism for adding fake donations. All donations must originate from verified UPI transactions. System prevents manual entry.</p>
      </div>
    </div>

    <h3>Trust Messaging</h3>
    <p>Persistent footer message: "Har donation publicly trackable hai. Koi chhupa nahi. Koi nakli nahi. Ye meri zindagi hai — aur aap uske saathi hain."</p>
  </div>
</div>

<!-- ═══════════════ S18: ANALYTICS ═══════════════ -->
<div class="section" id="s18">
  <div class="container">
    <div class="section-header">
      <span class="section-num">18</span>
      <h2>Analytics & Tracking <span class="new-badge">NEW</span></h2>
    </div>

    <h3>Tools</h3>
    <div class="tech-grid">
      <div class="tech-pill"><span class="tp-layer">Primary</span><span class="tp-name">PostHog</span></div>
      <div class="tech-pill"><span class="tp-layer">Backup</span><span class="tp-name">Google Analytics 4</span></div>
      <div class="tech-pill"><span class="tp-layer">Heatmaps</span><span class="tp-name">Microsoft Clarity</span></div>
      <div class="tech-pill"><span class="tp-layer">Custom</span><span class="tp-name">Supabase Queries</span></div>
    </div>

    <h3>Key Events to Track</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Event</th><th>Trigger</th><th>Data Captured</th></tr></thead>
        <tbody>
          <tr><td>page_view</td><td>Any page load</td><td>Source (UTM), device, referrer</td></tr>
          <tr><td>amount_selected</td><td>User taps any amount button</td><td>Amount, button position, previous amount</td></tr>
          <tr><td>donation_initiated</td><td>Hold-to-donate completed</td><td>Amount, time spent on page</td></tr>
          <tr><td>donation_confirmed</td><td>User returns post-UPI payment</td><td>Amount, time from initiation</td></tr>
          <tr><td>share_generated</td><td>Canvas API story created</td><td>Amount, whether selfie included</td></tr>
          <tr><td>exit_intent_shown</td><td>Exit trigger activated</td><td>Time on page, scroll depth</td></tr>
          <tr><td>exit_intent_converted</td><td>User donates via exit popup</td><td>Amount, time to conversion</td></tr>
          <tr><td>rescue_mode_seen</td><td>User sees rescue banner</td><td>Time remaining, gap amount</td></tr>
          <tr><td>rescue_mode_converted</td><td>Donation during rescue mode</td><td>Amount, minutes before deadline</td></tr>
          <tr><td>drop_off</td><td>User leaves at specific section</td><td>Scroll depth, section name</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Key Metrics Dashboard (Internal)</h3>
    <div class="metrics-grid">
      <div class="metric-card"><span class="metric-val">CVR</span><div class="metric-label">Visitor → Donor Rate</div></div>
      <div class="metric-card"><span class="metric-val">AOV</span><div class="metric-label">Avg. Donation Value</div></div>
      <div class="metric-card"><span class="metric-val">RVR</span><div class="metric-label">Return Visitor Rate</div></div>
      <div class="metric-card"><span class="metric-val">SSR</span><div class="metric-label">Social Share Rate</div></div>
      <div class="metric-card"><span class="metric-val">LCR</span><div class="metric-label">Level Completion Rate</div></div>
      <div class="metric-card"><span class="metric-val">RMCR</span><div class="metric-label">Rescue Mode Conv. Rate</div></div>
    </div>
  </div>
</div>

<!-- ═══════════════ S19: INSTAGRAM CONTENT ═══════════════ -->
<div class="section" id="s19">
  <div class="container">
    <div class="section-header">
      <span class="section-num">19</span>
      <h2>Content Hook Library — Instagram Funnel <span class="new-badge">NEW</span></h2>
    </div>
    <p>Instagram is the acquisition engine. The website converts. This content library ensures you always have high-converting hooks ready without creative block.</p>

    <h3>Hook Formula Categories</h3>
    <div class="feature-grid">
      <div class="feature-card">
        <span class="fc-tag">Raw Reality</span>
        <h4>Struggle Hooks</h4>
        <p>"Aaj ₹0 aaya… aur ghar me tension badh gaya." / "Loan wale ne aaj phir call kiya. Sunna chahoge kya hua?"</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Progress</span>
        <h4>Update Hooks</h4>
        <p>"Level 3 complete! ₹5,000 ho gaye. Kitne log aaye dekhte hain." / "Day 30. Ye main soch bhi nahi sakta tha."</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Curiosity</span>
        <h4>Cliffhanger Hooks</h4>
        <p>"Aaj kuch aisa hua jo main expect nahi kar raha tha [stay to end]" / "Ek donor ne aaj ₹5000 diye — unka message sunke aankh bhar aayi."</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Community</span>
        <h4>Social Proof Hooks</h4>
        <p>"843 log mere saath hain. Kya aap 844th honge?" / "Priya ne Delhi se ₹500 bheje. Unka message sunoge?"</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Failure</span>
        <h4>Honest Failure Hooks</h4>
        <p>"Level fail ho gaya. Ye moment camera pe capture kiya — raw, unedited." / "Aaj bahut mushkil raha. Aap sab ke support ne rokh liya."</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Challenge</span>
        <h4>Rescue Mode Hooks</h4>
        <p>"4 ghante baaki hain. ₹3,200 chahiye. Kya community kar sakti hai?" / "LIVE: Rescue mode active. Dekhte hain kya hota hai."</p>
      </div>
    </div>

    <h3>Content Calendar Rhythm</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Day</th><th>Content Type</th><th>Hook Style</th><th>CTA</th></tr></thead>
        <tbody>
          <tr><td>Monday</td><td>Week start update + goal</td><td>Progress</td><td>"Link in bio — support this week's level"</td></tr>
          <tr><td>Wednesday</td><td>Mid-week reality check</td><td>Raw Reality</td><td>"Comment if you want to help"</td></tr>
          <tr><td>Friday</td><td>Story / emotional moment</td><td>Curiosity or Failure</td><td>"Full story on website — link in bio"</td></tr>
          <tr><td>Daily</td><td>Short 15-sec life clip</td><td>Varies</td><td>"Support: link in bio"</td></tr>
          <tr><td>Rescue days</td><td>Rescue mode live update</td><td>Rescue</td><td>"Urgent: donate now — link in bio"</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- ═══════════════ S20: ADMIN PANEL ═══════════════ -->
<div class="section" id="s20">
  <div class="container">
    <div class="section-header">
      <span class="section-num">20</span>
      <h2>Backend Admin Panel <span class="new-badge">NEW</span></h2>
    </div>
    <p>The creator needs full control over the platform without touching code. The admin panel is a critical operational tool used daily.</p>

    <h3>Admin Panel Modules</h3>
    <div class="feature-grid">
      <div class="feature-card">
        <span class="fc-tag">Level Management</span>
        <h4>Level Control</h4>
        <p>Manually advance levels, extend deadlines, set rescue mode, update target amounts, add level emotional context text.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Content</span>
        <h4>Daily Log Manager</h4>
        <p>Add daily updates, embed YouTube/Instagram videos, update today's personal earnings, maintain streak counter.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Transparency</span>
        <h4>Withdrawal Logger</h4>
        <p>Log each withdrawal with: amount, date, purpose, proof image upload. Publishes to transparency dashboard.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Community</span>
        <h4>Supporter Approval</h4>
        <p>Review and approve supporter wall entries. Remove spam. Feature specific supporters. Manage badge assignments.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Events</span>
        <h4>Surprise Event Scheduler</h4>
        <p>Schedule hidden unlock events, upload surprise videos, set Papa message probability, manage milestone events.</p>
      </div>
      <div class="feature-card">
        <span class="fc-tag">Analytics</span>
        <h4>Real-Time Dashboard</h4>
        <p>Today's donations, active visitors, conversion rate, top referrer, rescue mode performance, level completion forecast.</p>
      </div>
    </div>

    <h3>Access Control</h3>
    <p>Admin panel is accessible only via authenticated URL (Supabase Auth). No admin login on the public domain. Separate admin subdomain (admin.domain.com) with 2FA. Creator is the sole admin.</p>
  </div>
</div>

<!-- ═══════════════ S21: TECH STACK ═══════════════ -->
<div class="section" id="s21">
  <div class="container">
    <div class="section-header">
      <span class="section-num">21</span>
      <h2>Tech Stack & Architecture</h2>
    </div>

    <div class="tech-grid">
      <div class="tech-pill"><span class="tp-layer">Frontend</span><span class="tp-name">Next.js 14</span></div>
      <div class="tech-pill"><span class="tp-layer">Styling</span><span class="tp-name">Tailwind CSS</span></div>
      <div class="tech-pill"><span class="tp-layer">Database</span><span class="tp-name">Supabase</span></div>
      <div class="tech-pill"><span class="tp-layer">Auth</span><span class="tp-name">Supabase Auth</span></div>
      <div class="tech-pill"><span class="tp-layer">Payments</span><span class="tp-name">PhonePe UPI</span></div>
      <div class="tech-pill"><span class="tp-layer">Real-time</span><span class="tp-name">Supabase Realtime</span></div>
      <div class="tech-pill"><span class="tp-layer">Image Gen</span><span class="tp-name">Canvas API</span></div>
      <div class="tech-pill"><span class="tp-layer">Analytics</span><span class="tp-name">PostHog</span></div>
      <div class="tech-pill"><span class="tp-layer">Hosting</span><span class="tp-name">Vercel</span></div>
      <div class="tech-pill"><span class="tp-layer">CDN</span><span class="tp-name">Cloudflare</span></div>
      <div class="tech-pill"><span class="tp-layer">Media</span><span class="tp-name">Cloudinary</span></div>
      <div class="tech-pill"><span class="tp-layer">Heatmaps</span><span class="tp-name">MS Clarity</span></div>
    </div>

    <h3>Architecture Overview</h3>
    <div class="code-block">
      <pre><span class="comment">// High-level system architecture</span>

<span class="kw">Instagram</span> → <span class="type">Next.js Frontend (Vercel)</span>
                      ↓
              <span class="kw">Supabase Backend</span>
              ├── donations (real-time)
              ├── levels (game state)
              ├── activity_feed
              ├── creator_logs (daily)
              ├── withdrawals (transparency)
              └── surprise_events
                      ↓
         <span class="kw">PhonePe UPI</span> ← Payment trigger
         <span class="kw">Canvas API</span> ← Story generation
         <span class="kw">PostHog</span>    ← Event tracking</pre>
    </div>

    <h3>Real-Time Features</h3>
    <p>Supabase Realtime subscriptions power: live donation counter, activity feed updates, rescue mode trigger, progress bar, viewer count (via presence channels). All real-time updates push to the client without page refresh.</p>
  </div>
</div>

<!-- ═══════════════ S22: DATABASE SCHEMA ═══════════════ -->
<div class="section" id="s22">
  <div class="container">
    <div class="section-header">
      <span class="section-num">22</span>
      <h2>Database Schema</h2>
    </div>

    <div class="schema-grid">
      <div class="schema-table">
        <div class="st-header">donations</div>
        <div class="st-row"><span class="field">id</span><span class="field-type">uuid <span class="pk">PK</span></span></div>
        <div class="st-row"><span class="field">amount</span><span class="field-type">integer</span></div>
        <div class="st-row"><span class="field">name</span><span class="field-type">text?</span></div>
        <div class="st-row"><span class="field">state</span><span class="field-type">text?</span></div>
        <div class="st-row"><span class="field">is_public</span><span class="field-type">boolean</span></div>
        <div class="st-row"><span class="field">upi_transaction_id</span><span class="field-type">text</span></div>
        <div class="st-row"><span class="field">level_id</span><span class="field-type">uuid <span class="fk">FK</span></span></div>
        <div class="st-row"><span class="field">selfie_url</span><span class="field-type">text?</span></div>
        <div class="st-row"><span class="field">created_at</span><span class="field-type">timestamptz</span></div>
      </div>
      <div class="schema-table">
        <div class="st-header">levels</div>
        <div class="st-row"><span class="field">id</span><span class="field-type">uuid <span class="pk">PK</span></span></div>
        <div class="st-row"><span class="field">level_number</span><span class="field-type">integer</span></div>
        <div class="st-row"><span class="field">name</span><span class="field-type">text</span></div>
        <div class="st-row"><span class="field">target_amount</span><span class="field-type">integer</span></div>
        <div class="st-row"><span class="field">collected_amount</span><span class="field-type">integer</span></div>
        <div class="st-row"><span class="field">deadline</span><span class="field-type">timestamptz</span></div>
        <div class="st-row"><span class="field">status</span><span class="field-type">enum (active/complete/failed)</span></div>
        <div class="st-row"><span class="field">sponsor_donor_id</span><span class="field-type">uuid? <span class="fk">FK</span></span></div>
        <div class="st-row"><span class="field">emotional_context</span><span class="field-type">text</span></div>
      </div>
      <div class="schema-table">
        <div class="st-header">activity_feed</div>
        <div class="st-row"><span class="field">id</span><span class="field-type">uuid <span class="pk">PK</span></span></div>
        <div class="st-row"><span class="field">message</span><span class="field-type">text</span></div>
        <div class="st-row"><span class="field">amount</span><span class="field-type">integer?</span></div>
        <div class="st-row"><span class="field">event_type</span><span class="field-type">enum</span></div>
        <div class="st-row"><span class="field">created_at</span><span class="field-type">timestamptz</span></div>
      </div>
      <div class="schema-table">
        <div class="st-header">creator_logs</div>
        <div class="st-row"><span class="field">id</span><span class="field-type">uuid <span class="pk">PK</span></span></div>
        <div class="st-row"><span class="field">log_date</span><span class="field-type">date</span></div>
        <div class="st-row"><span class="field">personal_earnings</span><span class="field-type">integer</span></div>
        <div class="st-row"><span class="field">daily_donations</span><span class="field-type">integer</span></div>
        <div class="st-row"><span class="field">update_text</span><span class="field-type">text</span></div>
        <div class="st-row"><span class="field">video_url</span><span class="field-type">text?</span></div>
        <div class="st-row"><span class="field">streak_day</span><span class="field-type">integer</span></div>
      </div>
      <div class="schema-table">
        <div class="st-header">withdrawals</div>
        <div class="st-row"><span class="field">id</span><span class="field-type">uuid <span class="pk">PK</span></span></div>
        <div class="st-row"><span class="field">amount</span><span class="field-type">integer</span></div>
        <div class="st-row"><span class="field">purpose</span><span class="field-type">text</span></div>
        <div class="st-row"><span class="field">proof_image_url</span><span class="field-type">text</span></div>
        <div class="st-row"><span class="field">withdrawal_date</span><span class="field-type">date</span></div>
        <div class="st-row"><span class="field">created_at</span><span class="field-type">timestamptz</span></div>
      </div>
      <div class="schema-table">
        <div class="st-header">surprise_events</div>
        <div class="st-row"><span class="field">id</span><span class="field-type">uuid <span class="pk">PK</span></span></div>
        <div class="st-row"><span class="field">event_type</span><span class="field-type">enum</span></div>
        <div class="st-row"><span class="field">trigger_condition</span><span class="field-type">jsonb</span></div>
        <div class="st-row"><span class="field">content_url</span><span class="field-type">text</span></div>
        <div class="st-row"><span class="field">is_active</span><span class="field-type">boolean</span></div>
        <div class="st-row"><span class="field">times_shown</span><span class="field-type">integer</span></div>
        <div class="st-row"><span class="field">scheduled_at</span><span class="field-type">timestamptz?</span></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ S23: USER FLOWS ═══════════════ -->
<div class="section" id="s23">
  <div class="container">
    <div class="section-header">
      <span class="section-num">23</span>
      <h2>User Flows & Wireframe Specifications</h2>
    </div>

    <h3>Primary Flow: First-Time Visitor → Donor</h3>
    <div class="flow-steps">
      <div class="flow-step"><span class="step-num">1</span><div class="step-content"><strong>Instagram → Link in Bio</strong><p>User arrives from Instagram story/reel. UTM tracked. Already emotionally primed.</p></div></div>
      <div class="flow-step"><span class="step-num">2</span><div class="step-content"><strong>Hero Section</strong><p>Headline lands. Live progress bar shows momentum. Character visible. "Support Now" CTA prominent. Social proof count visible.</p></div></div>
      <div class="flow-step"><span class="step-num">3</span><div class="step-content"><strong>Scroll: Story Section</strong><p>The Problem → The Reality → The Mission. User reads. Emotional investment builds. Loan proof shown.</p></div></div>
      <div class="flow-step"><span class="step-num">4</span><div class="step-content"><strong>Scroll: Current Level Card</strong><p>User sees current level, how close it is to completion, countdown timer. Urgency created.</p></div></div>
      <div class="flow-step"><span class="step-num">5</span><div class="step-content"><strong>Donation Widget</strong><p>User taps ₹50 or ₹100. Dynamic message appears. Upsell nudge shown (optional). Character reacts.</p></div></div>
      <div class="flow-step"><span class="step-num">6</span><div class="step-content"><strong>Hold-to-Donate</strong><p>User holds button for 1.5 seconds. Haptic confirmation. UPI app opens.</p></div></div>
      <div class="flow-step"><span class="step-num">7</span><div class="step-content"><strong>Payment Completes</strong><p>User returns to website. Thank you screen. Character animation. Share prompt.</p></div></div>
      <div class="flow-step"><span class="step-num">8</span><div class="step-content"><strong>Social Share</strong><p>User generates Instagram story with Canvas API. Shares. New visitors arrive from that story.</p></div></div>
    </div>

    <h3>Secondary Flow: Rescue Mode</h3>
    <p>Rescue banner activates → Donor sees gap + countdown → Emergency donate CTA → UPI → Thank you → Social share with "I helped complete this level!"</p>

    <h3>Mobile Wireframe: Hero Screen (390px)</h3>
    <div class="feature-grid">
      <div class="feature-card" style="font-family: monospace; font-size: 11px; line-height: 1.8; background: #0B1D2A; color: #FFD54F;">
        <pre style="white-space: pre-wrap; margin: 0;">
┌─────────────────────────┐
│ [Day 27 of showing up]  │
│                         │
│ ₹50,00,000 Loan.        │
│ 1 Son. 1 Mission.       │
│                         │
│ [Father] [Son]          │
│                         │
│ ████████░░░░ 23% raised │
│ ₹11,50,000 of ₹50L     │
│                         │
│  843 supporters · LIVE  │
│                         │
│ ┌─────────────────────┐ │
│ │   SUPPORT NOW   →   │ │
│ └─────────────────────┘ │
│                         │
│ ↓ Read the full story   │
└─────────────────────────┘</pre>
      </div>
      <div class="feature-card" style="font-family: monospace; font-size: 11px; line-height: 1.8; background: #102233; color: #A0AEC0;">
        <pre style="white-space: pre-wrap; margin: 0;">
┌─────────────────────────┐
│ LEVEL 6 — MOMENTUM      │
│ Target: ₹50,000         │
│                         │
│ ████████████░ 87%       │
│ ₹43,500 raised          │
│ ₹6,500 remaining        │
│                         │
│ ⏰ 14:23:07 remaining   │
│                         │
│ [₹1][₹5][₹10][₹50]    │
│ [₹100]★[₹500][₹1000]  │
│        [Custom]         │
│                         │
│ ┌─────────────────────┐ │
│ │ ████ Hold to donate │ │
│ └─────────────────────┘ │
└─────────────────────────┘</pre>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ S24: MVP TIMELINE ═══════════════ -->
<div class="section" id="s24">
  <div class="container">
    <div class="section-header">
      <span class="section-num">24</span>
      <h2>MVP Build Plan & Timeline</h2>
    </div>

    <div class="timeline">
      <div class="timeline-row">
        <div class="timeline-phase">Week 1–2</div>
        <div class="timeline-content">
          <strong>Foundation</strong>
          <ul>
            <li>Next.js project setup, Supabase schema creation</li>
            <li>Hero section with live progress bar</li>
            <li>Static story section</li>
            <li>Basic donation button grid</li>
            <li>PhonePe UPI deep link integration</li>
          </ul>
        </div>
      </div>
      <div class="timeline-row">
        <div class="timeline-phase">Week 3–4</div>
        <div class="timeline-content">
          <strong>Core Gamification</strong>
          <ul>
            <li>Level system with countdown timers</li>
            <li>Dynamic message system (amount → message mapping)</li>
            <li>Real-time donation updates via Supabase Realtime</li>
            <li>Basic thank you screen + character static images</li>
            <li>Activity feed component</li>
          </ul>
        </div>
      </div>
      <div class="timeline-row">
        <div class="timeline-phase">Week 5–6</div>
        <div class="timeline-content">
          <strong>Trust & Social</strong>
          <ul>
            <li>Transparency dashboard with withdrawal logging</li>
            <li>Admin panel (levels, logs, withdrawals, supporters)</li>
            <li>Supporter wall with badges</li>
            <li>Social proof counters ("X people today")</li>
            <li>PostHog analytics integration</li>
          </ul>
        </div>
      </div>
      <div class="timeline-row">
        <div class="timeline-phase">Week 7–8</div>
        <div class="timeline-content">
          <strong>Engagement Loops</strong>
          <ul>
            <li>Hold-to-donate button interaction</li>
            <li>Exit intent popup</li>
            <li>Rescue mode banner and logic</li>
            <li>Level failure state UI</li>
            <li>Creator streak system</li>
            <li>Smart suggestion engine</li>
          </ul>
        </div>
      </div>
      <div class="timeline-row">
        <div class="timeline-phase">Week 9–10</div>
        <div class="timeline-content">
          <strong>Advanced Features</strong>
          <ul>
            <li>Canvas API story generator</li>
            <li>Character animation system</li>
            <li>Surprise event scheduler in admin</li>
            <li>Anti-fraud transaction logging</li>
            <li>Personal progress vs. donation tracker</li>
          </ul>
        </div>
      </div>
      <div class="timeline-row">
        <div class="timeline-phase">Week 11–12</div>
        <div class="timeline-content">
          <strong>Launch Prep</strong>
          <ul>
            <li>Performance optimization (Core Web Vitals)</li>
            <li>Mobile QA across 5+ devices</li>
            <li>Content pre-loading (Day 1–30 content ready)</li>
            <li>Analytics verification</li>
            <li>Security audit</li>
            <li>Soft launch to small audience</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ S25: PRIORITY MATRIX ═══════════════ -->
<div class="section" id="s25">
  <div class="container">
    <div class="section-header">
      <span class="section-num">25</span>
      <h2>Feature Prioritization Matrix</h2>
    </div>

    <div class="priority-matrix">
      <div class="priority-cell mvp">
        <span class="pc-label">✅ MVP — Launch Blockers</span>
        <ul>
          <li>Hero + live progress bar</li>
          <li>Story section</li>
          <li>Donation button grid</li>
          <li>Dynamic amount messages</li>
          <li>PhonePe UPI integration</li>
          <li>Level system with timer</li>
          <li>Basic thank you screen</li>
          <li>Activity feed</li>
          <li>Admin panel (basic)</li>
          <li>PostHog analytics</li>
        </ul>
      </div>
      <div class="priority-cell v1">
        <span class="pc-label">🔵 V1.1 — Week 2–4 Post Launch</span>
        <ul>
          <li>Transparency dashboard</li>
          <li>Rescue mode banner</li>
          <li>Exit intent popup</li>
          <li>Smart suggestion engine</li>
          <li>Supporter wall + badges</li>
          <li>Creator streak system</li>
          <li>Social proof counters</li>
          <li>Level failure state</li>
          <li>Personal progress tracker</li>
        </ul>
      </div>
      <div class="priority-cell v2">
        <span class="pc-label">🟡 V1.2 — Month 2</span>
        <ul>
          <li>Hold-to-donate button</li>
          <li>Canvas API story generator</li>
          <li>Character animations (full)</li>
          <li>Anti-fraud transaction log</li>
          <li>Surprise event system</li>
          <li>Withdrawal proof uploads</li>
          <li>Level sponsor feature</li>
          <li>Donor streak badges</li>
        </ul>
      </div>
      <div class="priority-cell future">
        <span class="pc-label">🟣 Future — Month 3+</span>
        <ul>
          <li>Push notification system</li>
          <li>Multi-language (Hindi UI)</li>
          <li>Advanced character animations</li>
          <li>Monthly progress bar chart</li>
          <li>Community challenge features</li>
          <li>Papa message random unlock</li>
          <li>Video diary milestone system</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ S26: SUCCESS METRICS ═══════════════ -->
<div class="section" id="s26">
  <div class="container">
    <div class="section-header">
      <span class="section-num">26</span>
      <h2>Success Metrics & Targets</h2>
    </div>

    <div class="table-wrap">
      <table>
        <thead><tr><th>Metric</th><th>Month 1 Target</th><th>Month 3 Target</th><th>Month 12 Target</th></tr></thead>
        <tbody>
          <tr><td>Visitor → Donor CVR</td><td>2–4%</td><td>5–8%</td><td>8–12%</td></tr>
          <tr><td>Average Donation Value</td><td>₹80</td><td>₹120</td><td>₹150</td></tr>
          <tr><td>Return Visitor Rate</td><td>15%</td><td>25%</td><td>35%</td></tr>
          <tr><td>Social Share Rate</td><td>5% of donors</td><td>15% of donors</td><td>25% of donors</td></tr>
          <tr><td>Level Completion Rate</td><td>60%</td><td>75%</td><td>85%</td></tr>
          <tr><td>Rescue Mode Conv. Rate</td><td>—</td><td>15%</td><td>25%</td></tr>
          <tr><td>Exit Intent Conv. Rate</td><td>3%</td><td>6%</td><td>8%</td></tr>
          <tr><td>Monthly Donation Total</td><td>₹25,000</td><td>₹1,00,000</td><td>₹3,00,000+</td></tr>
          <tr><td>Creator Streak</td><td>30 days</td><td>90 days</td><td>365 days</td></tr>
        </tbody>
      </table>
    </div>

    <div class="callout success">
      <span class="callout-icon">🏁</span>
      <div class="callout-body">
        <strong>The Only Metric That Matters</strong>
        <p>₹50,00,000 cleared. Loan paid. Family free. Every feature, every metric, every decision serves this one outcome. Build ruthlessly toward it.</p>
      </div>
    </div>

    <div class="metrics-grid" style="margin-top: 24px;">
      <div class="metric-card"><span class="metric-val">₹50L</span><div class="metric-label">Ultimate Goal</div></div>
      <div class="metric-card"><span class="metric-val">18–24mo</span><div class="metric-label">Timeline</div></div>
      <div class="metric-card"><span class="metric-val">17</span><div class="metric-label">Levels to Complete</div></div>
    </div>
  </div>
</div>

<!-- ═══════════════ FOOTER ═══════════════ -->
<div class="doc-footer">
  <span>PRD v2.0 — Donation Platform</span>
  <span>₹50,00,000 Loan · 1 Son · 1 Mission</span>
  <span>Confidential</span>
</div>

</body>
</html>

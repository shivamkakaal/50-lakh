// ─── Level System Types ───
export type LevelPhase = 'trust' | 'momentum' | 'growth' | 'advanced' | 'final';
export type LevelStatus = 'active' | 'complete' | 'failed' | 'locked';

export interface Level {
  id: string;
  level_number: number;
  name: string;
  hindi_name: string;
  target_amount: number;
  collected_amount: number;
  deadline: string; // ISO timestamp
  status: LevelStatus;
  phase: LevelPhase;
  emotional_context: string;
  sponsor_donor_id?: string;
}

// ─── Donation Types ───
export interface Donation {
  id: string;
  amount: number;
  name?: string;
  state?: string;
  is_public: boolean;
  upi_transaction_id: string;
  level_id: string;
  selfie_url?: string;
  created_at: string;
}

export interface DonationButton {
  amount: number;
  label?: string;
  message: string;
  badge?: 'most-popular' | 'recommended';
}

export interface SmartSuggestion {
  from_min: number;
  from_max: number;
  suggest_amount: number;
  copy: string;
}

// ─── Activity Feed ───
export type ActivityEventType = 'donation' | 'level_complete' | 'level_failed' | 'rescue_mode' | 'milestone' | 'streak';

export interface ActivityFeedItem {
  id: string;
  message: string;
  amount?: number;
  event_type: ActivityEventType;
  created_at: string;
}

// ─── Character Dialogues ───
export interface CharacterDialogue {
  father: string;
  son: string;
}

// ─── Creator Log ───
export interface CreatorLog {
  id: string;
  log_date: string;
  personal_earnings: number;
  daily_donations: number;
  update_text: string;
  video_url?: string;
  streak_day: number;
}

// ─── Withdrawal ───
export interface Withdrawal {
  id: string;
  amount: number;
  purpose: string;
  proof_image_url: string;
  withdrawal_date: string;
  created_at: string;
}

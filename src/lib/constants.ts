import type { Level, DonationButton, SmartSuggestion, CharacterDialogue } from './types';

// ─── UPI Configuration ───
export const UPI_ID = 'placeholder@ybl'; // TODO: Replace with real UPI ID
export const UPI_NAME = 'Mission 50 Lakh';
export const TOTAL_GOAL = 5000000; // ₹50,00,000

// ─── Level Definitions (PRD Section 4) ───
export const LEVELS: Omit<Level, 'id' | 'collected_amount' | 'deadline' | 'status' | 'sponsor_donor_id'>[] = [
  // Trust Phase
  { level_number: 1, name: 'Shuruaat', hindi_name: 'शुरुआत', target_amount: 100, phase: 'trust', emotional_context: 'Pehla kadam. Shuruaat yahin se hoti hai.' },
  { level_number: 2, name: 'Pehli Umeed', hindi_name: 'पहली उम्मीद', target_amount: 1000, phase: 'trust', emotional_context: 'Umeed jaagi hai. Log saath aa rahe hain.' },
  { level_number: 3, name: 'Vishwas', hindi_name: 'विश्वास', target_amount: 5000, phase: 'trust', emotional_context: 'Vishwas badh raha hai. Community ban rahi hai.' },
  { level_number: 4, name: 'Community', hindi_name: 'समुदाय', target_amount: 10000, phase: 'trust', emotional_context: 'Ek community bani hai. Akele nahi hain hum.' },
  // Momentum Phase
  { level_number: 5, name: 'Momentum', hindi_name: 'रफ्तार', target_amount: 25000, phase: 'momentum', emotional_context: 'Raftaar pakad li hai. Ab rukna nahi hai.' },
  { level_number: 6, name: 'Dhaara', hindi_name: 'धारा', target_amount: 50000, phase: 'momentum', emotional_context: 'Dhaara beh rahi hai. Sab saath hain.' },
  { level_number: 7, name: 'Lakh Paar', hindi_name: 'लाख पार', target_amount: 100000, phase: 'momentum', emotional_context: '₹1 lakh. Ye sochna bhi mushkil tha.' },
  // Growth Phase
  { level_number: 8, name: 'Udaan', hindi_name: 'उड़ान', target_amount: 200000, phase: 'growth', emotional_context: 'Udaan shuru hui. Sapne sach ho rahe hain.' },
  { level_number: 9, name: 'Himmat', hindi_name: 'हिम्मत', target_amount: 300000, phase: 'growth', emotional_context: 'Himmat rang la rahi hai. Loan kam ho raha hai.' },
  { level_number: 10, name: 'Paanch Lakh', hindi_name: 'पाँच लाख', target_amount: 500000, phase: 'growth', emotional_context: '10% goal done. Bahut bada milestone.' },
  // Advanced Phase
  { level_number: 11, name: 'Majboot', hindi_name: 'मज़बूत', target_amount: 700000, phase: 'advanced', emotional_context: 'Foundation mazboot hai. Aage badhte hain.' },
  { level_number: 12, name: 'Das Lakh', hindi_name: 'दस लाख', target_amount: 1000000, phase: 'advanced', emotional_context: '₹10 lakh. 20% done. Ye real hai.' },
  // Final Phase
  { level_number: 13, name: 'Iraada', hindi_name: 'इरादा', target_amount: 1500000, phase: 'final', emotional_context: 'Iraada pakka hai. Rasta saaf hai.' },
  { level_number: 14, name: 'Junoon', hindi_name: 'जुनून', target_amount: 2000000, phase: 'final', emotional_context: 'Junoon chadh gaya hai. ₹20 lakh done.' },
  { level_number: 15, name: 'Vishwaas', hindi_name: 'विश्वास', target_amount: 3000000, phase: 'final', emotional_context: '60% done. Vishwaas aur mazboot.' },
  { level_number: 16, name: 'Azaadi', hindi_name: 'आज़ादी', target_amount: 4000000, phase: 'final', emotional_context: 'Azaadi nazar aa rahi hai. ₹40 lakh.' },
  { level_number: 17, name: 'Mission Complete', hindi_name: 'मिशन पूरा', target_amount: 5000000, phase: 'final', emotional_context: '₹50,00,000. Loan paid. Family free.' },
];

// ─── Donation Buttons (PRD Section 7) ───
export const DONATION_BUTTONS: DonationButton[] = [
  { amount: 1, message: 'Shuruaat yahin se hoti hai 🙏' },
  { amount: 5, message: 'Aap jaise log hope zinda rakhte hain 💙' },
  { amount: 10, message: 'Meaningful step liya hai' },
  { amount: 50, message: 'Aaj ka ek zaroori kharch cover hoga', badge: 'most-popular' },
  { amount: 100, label: 'Official Supporter 🙏', message: '= 1 day expense support', badge: 'recommended' },
  { amount: 500, message: 'Backbone 💪' },
  { amount: 1000, message: 'Strong push ❤️' },
  { amount: 5000, message: 'Life Saver 🔥' },
];

// ─── Smart Suggestion Engine (PRD Section 7) ───
export const SMART_SUGGESTIONS: SmartSuggestion[] = [
  { from_min: 1, from_max: 5, suggest_amount: 10, copy: 'Even ₹10 makes a bigger difference today 🙏' },
  { from_min: 6, from_max: 10, suggest_amount: 50, copy: 'Most users choose ₹50 — aap bhi try kar sakte hain' },
  { from_min: 11, from_max: 50, suggest_amount: 100, copy: '₹100 se aap Official Supporter ban jaate hain' },
  { from_min: 51, from_max: 100, suggest_amount: 500, copy: '₹500 makes a real dent in this week\'s gap' },
];

// ─── Character Dialogue Library (PRD Section 8) ───
export function getDialogue(amount: number): CharacterDialogue {
  if (amount >= 5000) {
    return {
      father: 'Aaj dil bhar aaya... aankh bhi.',
      son: 'Aapne aaj hamare ghar me ek diya jalaya.',
    };
  }
  if (amount >= 1000) {
    return {
      father: 'Bhagwan aapka bhala kare.',
      son: 'Ye push bahut zaroori tha. Dil se shukriya.',
    };
  }
  if (amount >= 500) {
    return {
      father: 'Aaj dil bhar aaya.',
      son: 'Aap backbone hain is mission ke.',
    };
  }
  if (amount >= 50) {
    return {
      father: 'Beta… log humare saath hain.',
      son: 'Thank you. Aapne ek step aage badhaya.',
    };
  }
  return {
    father: '…',
    son: 'Shukriya. Har rupaya maayane rakhta hai.',
  };
}

// ─── Phase Colors ───
export const PHASE_COLORS: Record<string, string> = {
  trust: '#4CAF50',
  momentum: '#2196F3',
  growth: '#9C27B0',
  advanced: '#F9A825',
  final: '#F44336',
};

// ─── Mock Data for Development ───
export const MOCK_CURRENT_LEVEL: Level = {
  id: 'mock-level-1',
  level_number: 1,
  name: 'Shuruaat',
  hindi_name: 'शुरुआत',
  target_amount: 100,
  collected_amount: 0,
  deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  status: 'active',
  phase: 'trust',
  emotional_context: 'Pehla kadam. Shuruaat yahin se hoti hai.',
};

export const MOCK_ACTIVITY_FEED = [
  { id: '1', message: 'Rahul from Delhi donated ₹100', amount: 100, event_type: 'donation' as const, created_at: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: '2', message: 'Priya from Mumbai donated ₹500', amount: 500, event_type: 'donation' as const, created_at: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: '3', message: 'A supporter from Karnataka donated ₹50', amount: 50, event_type: 'donation' as const, created_at: new Date(Date.now() - 8 * 60000).toISOString() },
  { id: '4', message: 'Amit from UP donated ₹1,000', amount: 1000, event_type: 'donation' as const, created_at: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: '5', message: 'Sneha from Chennai donated ₹200', amount: 200, event_type: 'donation' as const, created_at: new Date(Date.now() - 22 * 60000).toISOString() },
];

export const MOCK_TOTAL_COLLECTED = 0;
export const MOCK_TOTAL_SUPPORTERS = 0;
export const MOCK_STREAK_DAY = 1;

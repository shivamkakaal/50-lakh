-- Seed script to populate the 17 levels for Mission 50 Lakh
-- Run this in your Supabase SQL Editor

INSERT INTO public.levels (level_number, name, hindi_name, target_amount, deadline, status, phase, emotional_context) VALUES
(1, 'Shuruaat', 'शुरुआत', 100, NOW() + INTERVAL '1 day', 'active', 'trust', 'Pehla kadam. Shuruaat yahin se hoti hai.'),
(2, 'Pehli Umeed', 'पहली उम्मीद', 1000, NOW() + INTERVAL '2 days', 'locked', 'trust', 'Umeed jaagi hai. Log saath aa rahe hain.'),
(3, 'Vishwas', 'विश्वास', 5000, NOW() + INTERVAL '5 days', 'locked', 'trust', 'Vishwas badh raha hai. Community ban rahi hai.'),
(4, 'Community', 'समुदाय', 10000, NOW() + INTERVAL '7 days', 'locked', 'trust', 'Ek community bani hai. Akele nahi hain hum.'),
(5, 'Momentum', 'रफ्तार', 25000, NOW() + INTERVAL '10 days', 'locked', 'momentum', 'Raftaar pakad li hai. Ab rukna nahi hai.'),
(6, 'Dhaara', 'धारा', 50000, NOW() + INTERVAL '15 days', 'locked', 'momentum', 'Dhaara beh rahi hai. Sab saath hain.'),
(7, 'Lakh Paar', 'लाख पार', 100000, NOW() + INTERVAL '20 days', 'locked', 'momentum', '₹1 lakh. Ye sochna bhi mushkil tha.'),
(8, 'Udaan', 'उड़ान', 200000, NOW() + INTERVAL '25 days', 'locked', 'growth', 'Udaan shuru hui. Sapne sach ho rahe hain.'),
(9, 'Himmat', 'हिम्मत', 300000, NOW() + INTERVAL '30 days', 'locked', 'growth', 'Himmat rang la rahi hai. Loan kam ho raha hai.'),
(10, 'Paanch Lakh', 'पाँच लाख', 500000, NOW() + INTERVAL '45 days', 'locked', 'growth', '10% goal done. Bahut bada milestone.'),
(11, 'Majboot', 'मज़बूत', 700000, NOW() + INTERVAL '60 days', 'locked', 'advanced', 'Foundation mazboot hai. Aage badhte hain.'),
(12, 'Das Lakh', 'दस लाख', 1000000, NOW() + INTERVAL '75 days', 'locked', 'advanced', '₹10 lakh. 20% done. Ye real hai.'),
(13, 'Iraada', 'इरादा', 1500000, NOW() + INTERVAL '90 days', 'locked', 'final', 'Iraada pakka hai. Rasta saaf hai.'),
(14, 'Junoon', 'जुनून', 2000000, NOW() + INTERVAL '110 days', 'locked', 'final', 'Junoon chadh gaya hai. ₹20 lakh done.'),
(15, 'Vishwaas', 'विश्वास', 3000000, NOW() + INTERVAL '130 days', 'locked', 'final', '60% done. Vishwaas aur mazboot.'),
(16, 'Azaadi', 'आज़ादी', 4000000, NOW() + INTERVAL '160 days', 'locked', 'final', 'Azaadi nazar aa rahi hai. ₹40 lakh.'),
(17, 'Mission Complete', 'मिशन पूरा', 5000000, NOW() + INTERVAL '200 days', 'locked', 'final', '₹50,00,000. Loan paid. Family free.')
ON CONFLICT (level_number) DO NOTHING;

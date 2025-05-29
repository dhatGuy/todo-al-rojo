# TodoAlRojo.cl – Gamification + FTD System

## Overview

TodoAlRojo.cl is a loyalty-based gamification platform combined with an affiliate FTD (First-Time Deposit) tracking system, designed to boost user engagement and conversions.

### 🧩 Gamification System: Red Chips

Users earn Red Chips (virtual points) for completing various tasks, unlocking new levels and rewards. Key features include:

- **Point Tasks:**

  - Daily login (+5 chips)
  - Join WhatsApp/Telegram (+50 chips)
  - Refer a user (+100 chips)
  - First deposit (manual check) (+200 chips)
  - Participate in trivia (+10 chips)
  - Share promos on social (+20 chips)

- **User Dashboard:**

  - Chip balance
  - Level & progress bar
  - Task checklist
  - Rewards store (redeem chips)
  - Public leaderboard

- **Admin Dashboard:**
  - Approve deposit confirmations
  - Manage chip rewards & redemptions
  - Track user logs and detect anomalies

---

### 🎯 FTD Tracking System

Affiliate tracking is handled via UTM parameters and cookies, with logic to:

- Store UTM and click data (user_id, timestamp)
- Match user registration to click
- Confirm FTD on deposit via:
  - Pixel tracking
  - Postback (server-to-server)
  - Manual fallback if needed
- Periodically cross-check with casino operator reports

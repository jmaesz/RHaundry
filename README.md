# RHaundry 🧺

RHaundry is a gamified laundry tracker for Raffles Hall residents. Monitor machine availability in real-time and earn points for on-time collection (+1) or lose them for delays (-1). Features include Telegram alerts when the "MacRHine" is done and an in-app chat for residents to nudge one another. Stay clean, stay fast, and top the leaderboard!

---

# Features

- Live Machine Status – Real-time availability of washers and dryers across all blocks
- Booking System – Reserve machines and track remaining time with live countdown timers
- Leaderboard – Community punctuality rankings based on on-time laundry collection
- Instant Alerts – Email notifications when your laundry is done
- Messaging – In-app chat with other residents about laundry coordination
- Block Navigation – Browse and filter machines by block and level
- User Profiles – Manage your display name, telegram handle, and contact info
- Responsive Design – Optimized for desktop and mobile with Tailwind CSS

---

# Project Structure

```
RHaundry/
├── client/                 # Frontend React app (Vite)
│   ├── src/
│   │   ├── components/     # React components (UI, machines, bookings, etc.)
│   │   ├── pages/          # Page routes (Home, Login, Profile, etc.)
│   │   ├── hooks/          # Custom hooks (auth, bookings, leaderboard, etc.)
│   │   ├── lib/            # Utilities & mock data
│   │   ├── App.tsx         # Main app router
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json
│
├── server/                 # Backend Express app
│   ├── routes/
│   │   └── email.ts        # Email alert API route
│   └── index.ts            # Express server setup
│
├── shared/                 # Shared types & schemas
│   ├── schema.ts           # TypeScript interfaces
│   └── routes.ts           # Route definitions
│
├── .env                    # Environment variables (create this!)
├── package.json            # Root dependencies
└── README.md               # This file
```

---

# Quick Start

# Prerequisites
- Node.js 18+ 
- npm 9+
- Gmail account with App Password (for email alerts)

# Installation

1. Clone the repository
   ```bash
   git clone <repo-url>
   cd RHaundry
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. **Setup Environment Variables** (`.env` file)
   
   Create a `.env` file in the project root with Gmail credentials for email alerts:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   EMAIL_SERVER_PORT=3001
   ```
   
   **Important Notes:**
   - `.env` is automatically ignored by git (see `.gitignore`) — it's never committed
   - The file must exist locally for the email server to work
   - If the email server starts but `GMAIL_USER` or `GMAIL_APP_PASSWORD` are missing, you'll see a warning in the server console and email alerts will fail
   
   **How to get a Gmail App Password:**
   1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) (requires 2FA enabled)
   2. Select **"Mail"** and **"Windows (or your device)"**
   3. Google generates a 16-character password with spaces (e.g., `abcd efgh ijkl mnop`)
   4. Copy and paste it into `GMAIL_APP_PASSWORD` — spaces are automatically stripped by the server
   
   **Reference:** See `.env.example` for a template of all available environment variables.

# Running the App

Terminal 1: Start the frontend
```bash
cd client
npm run dev
```
Frontend runs on http://localhost:5173

Terminal 2: Start the email server
```bash
npm run dev:email
```
Email API runs on http://localhost:3001


---

# Troubleshooting

## Email Alerts Not Working

**Issue:** "Email service not configured" error or "No recipients defined"

**Solutions:**
1. **Check `.env` file exists** at project root with `GMAIL_USER` and `GMAIL_APP_PASSWORD`
2. **Verify Gmail credentials:**
   - `GMAIL_USER` should be your full Gmail address (e.g., `user@gmail.com`)
   - `GMAIL_APP_PASSWORD` should be 16 characters (spaces are automatically removed)
   - Make sure 2FA is enabled on your Gmail account
3. **Restart the email server:**
   ```bash
   npm run dev:email
   ```
   Look for "Email credentials configured: true" in the console
4. **Check the Network tab** in browser DevTools to see the actual request/response
5. **Review server logs** in the terminal running `npm run dev:email` for detailed error messages

## Frontend Can't Reach Backend Server

- Ensure email server is running on port 3001 (start with `npm run dev:email`)
- Check firewall isn't blocking localhost traffic
- Verify CORS is enabled in `server/index.ts`

---
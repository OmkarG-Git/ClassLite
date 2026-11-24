# ClassPro — clickable tuition-class demo

A mobile-first React demo for Gurukul Coaching Classes, Kothrud, Pune. It uses local React state and hardcoded mock data only. No backend, authentication, or real messaging/payment integrations.

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Included
- Class owner/teacher workspace with dashboard, attendance, fees, students, batches, tests, homework, announcements and settings.
- Parent preview with child selector; parent data reads the same shared state.
- English, Hindi and Marathi dictionaries in `src/i18n/`.
- Light/dark mode with localStorage preference and system preference default.
- Recharts dashboards and marks charts.
- Mock actions update shared React state and show toast confirmations.

## Demo limitations
Receipt download/share, WhatsApp/SMS delivery, online payments, file uploads, and actual report-card export are represented as UI/demo actions only. Data resets when browser storage/session is cleared because this is intentionally a frontend-only prototype.

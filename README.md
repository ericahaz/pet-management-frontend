# Community Pet and Stray Animal Management System — Frontend

React (Vite) client for the backend API in `pet-management-system/`.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` (defaults to `http://localhost:5000/api`,
   matching the backend's default port):
   ```bash
   cp .env.example .env
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```
   Runs on `http://localhost:5173`.

Make sure the backend (`pet-management-system/`) is running first.

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/login`, `/register` | Auth |
| `/pets` | My pets, with renewal |
| `/pets/register` | Register a pet (shows generated QR code) |
| `/pet-lookup/:qrId` | Public page shown when someone scans a pet's QR tag — no login required |
| `/reports`, `/reports/new` | Stray / lost / found reports |
| `/sightings/new` | Color-coded sighting report — the no-scan path for aggressive/unapproachable animals |
| `/staff/dashboard` | Metrics overview (barangay officials/admin only) |
| `/staff/queue` | Priority-sorted sighting report queue (staff only) |

## Notes

- Auth token is stored in `localStorage` and attached automatically to API
  requests via an axios interceptor (`src/api/client.js`).
- `ProtectedRoute` (`src/components/ProtectedRoute.jsx`) redirects
  unauthenticated users to `/login`, and non-staff away from `staffOnly` routes.
- This was scaffolded without a live network connection to run `npm install`
  end-to-end, so if you hit a dependency resolution issue, run
  `npm install` fresh and check the versions in `package.json` against
  what's current.

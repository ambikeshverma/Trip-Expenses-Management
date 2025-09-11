# TripApp Backend

1. Copy `.env.example` to `.env` and fill values (especially MONGO_URI, JWT_SECRET).
2. Install dependencies:
   ```
   cd backend
   npm install
   ```
3. (optional) Generate VAPID keys:
   ```
   cd backend
   npm i web-push
   node utils/generateVAPID.js
   ```
   Copy the printed keys into `.env`.
4. Run:
   ```
   npm run dev
   ```
5. API runs on `http://localhost:5000/api` by default.

Routes:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/subscribe
- DELETE /api/subscribe/:tripId
- POST /api/trips
- GET /api/trips
- GET /api/trips/:id
- POST /api/trips/:id/add-member
- POST /api/transactions
- GET /api/transactions/trip/:tripId
- PUT /api/transactions/:id
- DELETE /api/transactions/:id
- GET /api/users/search?q=

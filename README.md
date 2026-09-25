## Backend

REST API for ShutterRank — teams, tournois (brackets), matches, and gift-card prizes, with JWT auth and role-based access control.

---

### Tech stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

| Purpose | Library |
|---|---|
| Runtime | Node.js (ESM) |
| HTTP framework | Express 5 |
| ODM | Mongoose 9 |
| Auth | jsonwebtoken + bcryptjs |
| Validation | express-validator |
| CORS + env | cors, dotenv |

---

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** running locally or a MongoDB Atlas connection string

### Installation

```bash
cd Backend
npm install
```

### Environment variables

Create `Backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/shutterrank
JWT_SECRET=<a long random string>
JWT_EXPIRES_IN=7d
PORT=3000
FRONTEND_URL=http://localhost:5173

# Bootstrapped on first boot; promotes existing user to admin if email matches
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme
```

### Run

```bash
node server.js
```

Boot sequence: `connectDB()` → `seedAdmin()` → `app.listen(PORT)`.

### Seed test data

Wipes every collection and reseeds a fresh dataset (20 players, 4 teams of 5, 2 tournois with generated brackets, 5 giftcards):

```bash
node script.js
```

All seeded players share the password `password123`. Login as any of them:
```
email:    player1@example.com … player20@example.com
password: password123
```

---

### Project structure

```
Backend/
├─ controllers/                # Thin request handlers (parse → call service → respond)
│  ├─ auth.controller.js
│  ├─ player.controller.js
│  ├─ team.controller.js
│  ├─ match.controller.js
│  ├─ tournoi.controller.js
│  └─ giftcard.controller.js
│
├─ services/                   # Business logic + DB access
│  ├─ auth.service.js
│  ├─ player.service.js
│  ├─ team.service.js
│  ├─ match.service.js
│  ├─ tournoi.service.js
│  └─ giftcard.service.js
│
├─ models/                     # Mongoose schemas
│  ├─ Player.js
│  ├─ Team.js
│  ├─ Match.js
│  ├─ Tournoi.js
│  └─ Giftcards.js
│
├─ routes/                     # Express routers, one per resource
│  └─ *.route.js
│
├─ middleware/
│  ├─ authenticate.js          # verifies JWT → req.user; requireRole('admin')
│  ├─ validate.js              # express-validator result → error handler
│  ├─ pagination.js            # parses ?page=N → req.pagination
│  ├─ errorhandler.js          # global error handler
│  └─ validators/              # per-resource express-validator chains
│
├─ utils/
│  ├─ db.js                    # mongoose.connect
│  ├─ jwt.js                   # generateToken / verifyToken
│  ├─ seedAdmin.js             # bootstrap admin from .env
│  ├─ paginate.js              # shared paginate(Model, opts) helper
│  └─ Respond.js               # successRes(res, code, message, data)
│
├─ server.js                   # Express entry point
├─ script.js                   # DB seed / reset script
├─ API.md                      # Full endpoint reference
└─ .env
```

---

### Architecture

**Layering** (routes → controllers → services → models):

```
HTTP request
   │
   ▼
routes/*.route.js  ── middleware (authenticate, validators, pagination) ──►
   │
   ▼
controllers/*.controller.js  ── (thin: no logic, no DB) ──►
   │
   ▼
services/*.service.js  ── (business rules, DB access) ──►
   │
   ▼
models/*.js  (Mongoose schemas)
```

**Auth flow**

1. `POST /api/auth/register` or `/login` → returns `{ player, token }` (password stripped).
2. Client stores the token, sends `Authorization: Bearer <token>` on every subsequent request.
3. `authenticate` middleware verifies the token, loads the Player (`-password`), attaches to `req.user`.
4. Admin-only routes stack `requireRole('admin')` on top.

**Response envelope**

Success:
```json
{ "success": true, "status": "success", "message": "…", "data": <payload> }
```

Error (via global handler):
```json
{ "success": false, "status": "fail", "message": "…" }
```

**Pagination**

List endpoints accept `?page=N` (default `1`, fixed limit of `10`) and return:
```json
{ "items": [...], "page": 1, "limit": 10, "total": 34, "pages": 4 }
```

---

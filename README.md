# Echo — Real-time Terminal Sharing

Share your terminal in the browser for collaboration and demos.

**Live:** Frontend: https://echo-dsbr.onrender.com · Backend: https://echo-backend-aw1g.onrender.com

## Quick start

```bash
npm install -g echo-terminal
echo-terminal            # read-only share
echo-terminal --edit     # allow viewers to type
```

Open the printed link (`/share/<roomId>`) or paste the session ID on the landing page.

## Repo layout

- `server/` — Socket.io relay (`node index.js`) + CLI (`cli.js`, published as `echo-terminal`)
- `frontend/` — React viewer/landing page

## Dev

```bash
# backend
cd server && npm install && node index.js
# frontend
cd frontend && npm install && npm run dev
```

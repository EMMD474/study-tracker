@echo off
echo Starting Meridian Stratum Database...
docker compose up -d

echo Starting Meridian Stratum Development Server...
pnpm dev

pause

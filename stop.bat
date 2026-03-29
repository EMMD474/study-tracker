@echo off
echo 🛑 Stopping Study Tracker Services...

Rem Stop the database
docker compose down

Rem Stop the web server (pnpm/next-dev)
Rem Note: This will stop all node.exe processes.
taskkill /F /IM node.exe /T >nul 2>&1

if %errorlevel% neq 0 (
    echo ℹ️ Web server not found or already stopped.
) else (
    echo ✅ Web server stopped.
)

echo ✅ All services stopped.
pause

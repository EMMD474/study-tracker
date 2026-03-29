@echo off
pushd "%~dp0.."
echo 🛑 Stopping Study Tracker Services...
docker compose down
taskkill /F /IM node.exe /T >nul 2>&1
if %errorlevel% neq 0 (
    echo ℹ️ Web server not found or already stopped.
) else (
    echo ✅ Web server stopped.
)
echo ✅ All services stopped.
popd
pause

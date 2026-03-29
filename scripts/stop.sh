#!/bin/bash
cd "$(dirname "$0")/.."

echo "🛑 Stopping Study Tracker Services..."
docker compose down
pkill -f "next-dev" || echo "Web server not found or already stopped."
echo "✅ All services stopped."

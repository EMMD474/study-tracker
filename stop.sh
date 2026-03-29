#!/bin/bash

echo "🛑 Stopping Study Tracker Services..."

# Stop the database
docker-compose down

# Stop the web server (if running via pnpm dev) 
# Note: This is an aggressive pkill. Use caution if running multiple node projects.
pkill -f "next-dev" || echo "Web server not found or already stopped."

echo "✅ All services stopped."

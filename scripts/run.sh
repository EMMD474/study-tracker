#!/bin/bash
# Move to project root
cd "$(dirname "$0")/.."

# Start PostgreSQL database
echo "Starting Meridian Stratum Database..."
docker-compose up -d

# Start Development Server
echo "Starting Meridian Stratum Development Server..."
pnpm dev

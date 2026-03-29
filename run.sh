#!/bin/bash

# Start PostgreSQL database
echo "Starting Meridian Stratum Database..."
docker-compose up -d

# Start Development Server
echo "Starting Meridian Stratum Development Server..."
pnpm dev
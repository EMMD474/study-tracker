#!/bin/bash

# Start PostgreSQL database
docker-compose up -d

# Start Development Server
pnpm dev
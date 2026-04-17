#!/bin/bash

# delete container
docker compose down

# create container
docker compose up -d then echo "Container created, check db connection"

# check db
pnpm prisma status
pnpm prisma studio

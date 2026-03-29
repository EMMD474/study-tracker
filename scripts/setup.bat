@echo off
pushd "%~dp0.."
echo Setting up Meridian Stratum...

echo "Installing node packages..."
pnpm install
echo "Node packages installed."

echo "Generating database schema..."
pnpm db:generate
echo "Database schema generated."

echo "Pushing database schema..."
pnpm db:push
echo "Database schema pushed."

echo "Starting development server..."
pnpm dev
popd
pause

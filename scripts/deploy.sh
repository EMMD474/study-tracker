#!/bin/bash
cd "$(dirname "$0")/.."

echo "🚀 Starting build check..."
if pnpm build; then
  echo "✅ Build successful! Pushing to origin..."
  CURRENT_BRANCH=$(git branch --show-current)
  git push origin "$CURRENT_BRANCH" && \
  git checkout main && \
  git merge "$CURRENT_BRANCH" && \
  git checkout "$CURRENT_BRANCH"
  echo "🎉 Successfully pushed and merged $CURRENT_BRANCH into main!"
else
  echo "❌ Build failed. Fix the errors above before deploying."
  exit 1
fi

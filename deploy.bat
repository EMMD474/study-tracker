@echo off
setlocal enabledelayedexpansion

echo 🚀 Starting build check...

call pnpm build
if %errorlevel% neq 0 (
    echo ❌ Build failed. Fix the errors above before deploying.
    exit /b 1
)

echo ✅ Build successful! Pushing to origin...

for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i

git push origin %CURRENT_BRANCH% && ^
git checkout main && ^
git merge %CURRENT_BRANCH% && ^
git checkout %CURRENT_BRANCH%

if %errorlevel% neq 0 (
    echo ❌ Git operations failed. Please check your git status manually.
    exit /b 1
)

echo 🎉 Successfully pushed and merged %CURRENT_BRANCH% into main!
pause

#!/bin/bash
# Push team-foti-site vers GitHub
# Usage: depuis la racine du projet → ./push-to-github.sh

set -e
cd "$(dirname "$0")"

echo "1. Init Git (si besoin)..."
git init

echo "2. Remote origin..."
git remote add origin git@github.com:MokoyS/team-foti-site.git 2>/dev/null || \
  git remote set-url origin git@github.com:MokoyS/team-foti-site.git

echo "3. Add + commit..."
git add -A
git status

if git diff --staged --quiet; then
  echo "Rien à commiter (tout est à jour)."
else
  git commit -m "Initial commit: Team Foti site Next.js"
fi

echo "4. Push main..."
git branch -M main
git push -u origin main

echo "OK → https://github.com/MokoyS/team-foti-site"

#!/usr/bin/env bash
set -euo pipefail

# Bootstraps Homebrew for local development on macOS/Linux.
# Safe to re-run: skips installation if brew is already available.

if command -v brew >/dev/null 2>&1; then
  echo "Homebrew already installed at $(command -v brew)"
else
  echo "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

if [ -f "$(dirname "$0")/../Brewfile" ]; then
  echo "Installing project dependencies from Brewfile..."
  brew bundle --file="$(dirname "$0")/../Brewfile"
fi

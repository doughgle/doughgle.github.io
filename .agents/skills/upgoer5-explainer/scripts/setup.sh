#!/bin/bash
set -euo pipefail

echo "=== UpGoer5 Explainer Skill Setup ==="

if ! command -v python3 &>/dev/null; then
    echo "Error: python3 not found. Requires Python >=3.10." >&2
    exit 1
fi

PY_VERSION=$(python3 --version 2>&1 | grep -oP '\d+\.\d+')
if awk "BEGIN {exit !($PY_VERSION < 3.10)}"; then
    echo "Error: Python $PY_VERSION detected; need >=3.10." >&2
    exit 1
fi
echo "Python $PY_VERSION OK"

echo "Installing upgoer5-validator..."
pip install git+https://github.com/doughgle/upgoer5-validator.git

echo "Verifying installation..."
if ! upgoer5 check --help &>/dev/null; then
    echo "Error: upgoer5 check --help failed" >&2
    exit 1
fi
echo "upgoer5-validator installed and working"

echo "=== Setup complete ==="

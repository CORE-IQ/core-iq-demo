#!/bin/bash
# Install project dependencies. If npm install fails (e.g. no network),
# fall back to local stub modules.
set -e

if npm install; then
  echo "npm install succeeded"
else
  echo "npm install failed; using local stubs"
  mkdir -p node_modules
  cp -r stubs/* node_modules/
fi

#!/bin/bash
# Install project dependencies. If npm install fails, stub modules are copied.

npm install && exit 0

echo "npm install failed; using local stubs" >&2
mkdir -p node_modules/openai node_modules/dotenv
cp stubs/openai.js node_modules/openai/index.js
cp stubs/dotenv.js node_modules/dotenv/index.js

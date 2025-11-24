#!/bin/bash

# Read .env and create PM2 ecosystem config with environment variables

echo "module.exports = {
  apps: [{
    name: 'stealmyprompts',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/stealmyprompts',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {" > ecosystem.config.js

# Parse .env file and add each variable
while IFS='=' read -r key value; do
  # Skip comments and empty lines
  [[ "$key" =~ ^#.*$ ]] && continue
  [[ -z "$key" ]] && continue
  
  # Remove quotes from value
  value=$(echo "$value" | sed 's/^"//' | sed 's/"$//')
  
  # Add to config
  echo "      $key: '$value'," >> ecosystem.config.js
done < .env

echo "    }
  }]
}" >> ecosystem.config.js

echo "✅ Generated ecosystem.config.js with environment variables"
cat ecosystem.config.js

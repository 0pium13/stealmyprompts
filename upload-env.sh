#!/bin/bash

SERVER_IP="88.222.215.156"
APP_DIR="/var/www/stealmyprompts"

echo "🚀 Uploading .env file to $SERVER_IP..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found in current directory!"
    exit 1
fi

# Upload .env using scp
scp .env root@$SERVER_IP:$APP_DIR/.env

# Restart PM2 to apply changes
echo "🔄 Restarting application..."
ssh root@$SERVER_IP "cd $APP_DIR && pm2 restart stealmyprompts"

echo "✅ Environment variables uploaded and app restarted successfully!"

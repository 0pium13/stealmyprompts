#!/bin/bash

SERVER_IP="88.222.215.156"
PASSWORD="fh7A&2wKnjMW@+t91Yj+"

echo "🚀 Uploading .next folder to server..."

# Use sshpass to automate password entry
cd /Users/opium/vvvv
sshpass -p "$PASSWORD" rsync -avz --delete .next/ root@$SERVER_IP:/var/www/stealmyprompts/.next/

echo "🔄 Restarting PM2..."
sshpass -p "$PASSWORD" ssh root@$SERVER_IP "cd /var/www/stealmyprompts && pm2 restart stealmyprompts"

echo "✅ Deployment complete!"

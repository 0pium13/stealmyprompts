#!/bin/bash

# Configuration
SERVER_IP="88.222.215.156"
DOMAIN="stealmyprompts.ai"
REPO_URL="https://github.com/0pium13/news-scraper.git" # Assuming this is the repo, please update if different
APP_DIR="/var/www/stealmyprompts"

# Colors
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}🚀 Starting Deployment to $SERVER_IP...${NC}"

ssh root@$SERVER_IP << 'EOF'

# 1. Update System
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# 2. Install Dependencies (Node.js 20, Nginx, Git, Certbot)
echo "📦 Installing dependencies..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs nginx git certbot python3-certbot-nginx

# 3. Install PM2
echo "📦 Installing PM2..."
npm install -g pm2

# 4. Setup Directory
echo "📂 Setting up application directory..."
mkdir -p /var/www/stealmyprompts
cd /var/www/stealmyprompts

# 5. Clone/Pull Repository
if [ -d ".git" ]; then
    echo "🔄 Pulling latest changes..."
    git pull
else
    echo "⬇️ Cloning repository..."
    # NOTE: You might need to set up deploy keys if repo is private
    # For now assuming public or https with token
    git clone https://github.com/0pium13/news-scraper.git .
fi

# 6. Install App Dependencies
echo "📦 Installing app dependencies..."
npm install

# 7. Build Application
echo "🏗️ Building Next.js app..."
# We need environment variables for build. 
# Ideally we copy .env here. For now, we'll create a placeholder.
if [ ! -f .env ]; then
    echo "⚠️  Creating placeholder .env file. YOU MUST UPDATE THIS!"
    cp .env.example .env 2>/dev/null || touch .env
fi
npm run build

# 8. Configure Nginx
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/stealmyprompts << NGINX
server {
    server_name stealmyprompts.ai www.stealmyprompts.ai;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/stealmyprompts /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

# 9. Start Application with PM2
echo "🚀 Starting application..."
pm2 start npm --name "stealmyprompts" -- start
pm2 save
pm2 startup

# 10. SSL Setup (Interactive part usually, trying non-interactive)
echo "🔒 Setting up SSL..."
# This might fail if DNS isn't propagated yet
certbot --nginx -d stealmyprompts.ai -d www.stealmyprompts.ai --non-interactive --agree-tos -m admin@stealmyprompts.ai --redirect || echo "⚠️ SSL setup failed. Run 'certbot --nginx' manually later."

echo "✅ Deployment script finished!"

EOF

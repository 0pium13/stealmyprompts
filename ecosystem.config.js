module.exports = {
  apps: [
    {
      name: 'stealmyprompts',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/stealmyprompts',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: 'postgresql://neondb_owner:npg_cYGmL2g3vsPM@ep-wild-shadow-adz0a0mx-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_live_Y2xlcmsuc3RlYWxteXByb21wdHMuYWkk',
        CLERK_SECRET_KEY: 'sk_live_g_dsroJ6bOW',
        R2_ACCOUNT_ID: 'aca34c812a9fff2ebca728babff026f4',
        R2_ACCESS_KEY_ID: '56cad3b8c4e420390e89ad2c2ae8dd15',
        R2_SECRET_ACCESS_KEY: 'cb2808c96e368e0f29b62090b1acdbfc1255dab8cb49d5ea1e5a2cdf93d21681',
        R2_BUCKET_NAME: 'stealmyprompts-images',
        R2_PUBLIC_DOMAIN: 'https://pub-f443ddedcebd405a96e4041d23bdfef2.r2.dev',
        GEMINI_API_KEY: 'AIzaSyDM0acmwcHl0ohDEdG8GE1ZRxV2gPrp7j8',
        GEMINI_MODEL_TEXT: 'gemini-2.5-flash-lite',
        GEMINI_MODEL_IMAGE: 'gemini-2.0-flash-exp',
        UPSTASH_REDIS_REST_URL: 'https://evolving-urchin-10285.upstash.io',
        UPSTASH_REDIS_REST_TOKEN: 'ASgtAAIncDIzNDAwMjBkMTUxZDM0MjBlODFjOGQ1ODNkNjljMDA0YXAyMTAyODU'
      }
    }
  ]
};

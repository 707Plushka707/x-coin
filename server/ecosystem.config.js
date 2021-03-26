module.exports = {
  apps: [
    {
      name: 'xcoin-server',
      script: './dist/server.js',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

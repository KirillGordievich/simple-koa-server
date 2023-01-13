module.exports = {
  apps: [
    {
      name: 'simple-koa-server-api',
      cwd: __dirname,
      script: 'dist/api.js',
      watch: false,
      max_memory_restart: '1G',
      merge_logs: true,
      log_type: 'json',
    },
  ],
};

const { PORT } = require('./common/config');
const app = require('./app');

try {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
} catch (err) {
  app.log.error(err);
  process.exit(1);
}



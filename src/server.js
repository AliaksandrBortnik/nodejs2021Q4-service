const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () => {
  app.log.info(`App is running on http://localhost:${PORT}`);
});
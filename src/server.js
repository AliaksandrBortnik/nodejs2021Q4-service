const app = require('./app');
const { PORT } = require('./common/config');

app.listen(PORT).catch(error => app.log.error(error.message));
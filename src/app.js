const path = require('path');
const fastify = require('fastify');
const fastifySwagger = require('fastify-swagger');

const app = fastify({ logger: true });

app.register(require('./resources/users/user.router'));
app.register(require('./resources/boards/board.router'));
app.register(require('./resources/tasks/task.router'));

app.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  swagger: {
    info: { title: 'REST API' }
  },
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml')
  }
});

module.exports = app;

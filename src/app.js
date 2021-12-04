const path = require('path');

const app = require("fastify")({ logger: true }); // TODO: remove logger

app.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/doc',
  swagger: {
    info: { title: 'rest-api' }
  },
  mode: 'static', // TODO: do I really need it?
  specification: {  // TODO: do I really need it?
    path: path.join(__dirname, '../doc/api.yaml')
  }
})

app.register(require('./resources/users/user.router'));

module.exports = app;

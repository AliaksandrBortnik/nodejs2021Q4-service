const User = {
  type: 'object',
  required: ['name', 'login', 'password'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    login: { type: 'string' }
  }
};

module.exports = User;
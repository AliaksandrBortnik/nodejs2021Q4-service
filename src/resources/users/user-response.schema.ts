const UserResponseSchema = {
  type: 'object',
  required: ['name', 'login'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    login: { type: 'string' }
  }
};

export default UserResponseSchema;
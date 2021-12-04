module.exports = {
  users: [
    {
      id: '2ebc353d-b7a5-4f88-a7a5-e78c78b332da',
      name: 'TEST_USER',
      login: 'test_user',
      password: 'T35t_P@55w0rd'
    },
  ],
  boards: [
    {
      id: 'ad5e0b0a-5d2d-41a9-93ff-04ec3e8a0b7a',
      title: 'Initial board',
      columns: [
        {
          id: '521e4f03-a811-4535-b045-182759b8bc9f',
          title: 'Backlog',
          order: 1
        },
        {
          id: '58a5fbed-68b4-41fe-b4f7-fb5511638edd',
          title: 'Sprint',
          order: 2
        }
      ],
    }
  ],
  tasks: [
    {
      id: 'd5267a03-53fe-4ef8-86f3-4a8242b51552',
      title: 'Initial task',
      order: 1,
      description: 'Lorem ipsum',
      userId: null, // assignee
      boardId: null,
      columnId: null
    }
  ]
};
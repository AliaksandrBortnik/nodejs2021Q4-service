import User from "resources/users/user.model";
import Task from "resources/tasks/task.model";
import Board from "resources/boards/board.model";

const store: Store = {
  users: [],
  boards: [],
  tasks: []
};

interface Store {
  users: User[],
  boards: Board[],
  tasks: Task[]
}

export default store;
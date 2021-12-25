import {User} from "./resources/users/user.model";
import {Task} from "./resources/tasks/task.model";
import {Board} from "./resources/boards/board.model";

export const store: Store = {
  users: [],
  boards: [],
  tasks: []
};

export interface Store {
  users: User[],
  boards: Board[],
  tasks: Task[]
}
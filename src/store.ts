import {User} from "./entity/user.model";
import {Task} from "./entity/task.model";
import {Board} from "./entity/board.model";

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
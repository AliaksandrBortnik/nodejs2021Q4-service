import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {BoardColumn} from "./board-column.model";
import {Task} from "./task.model";

@Entity()
export class Board {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => BoardColumn, column => column.board)
  columns!: BoardColumn[];

  @OneToMany(() => Task, task => task.board)
  tasks!: Task[];
}

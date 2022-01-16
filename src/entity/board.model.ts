import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {BoardColumn} from "./board-column.model";
import {Task} from "./task.model";

@Entity()
export class Board {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => BoardColumn, column => column.board, { eager: true, onDelete: "CASCADE" })
  columns!: BoardColumn[];

  @OneToMany(() => Task, task => task.board)
  tasks!: Task[];
}

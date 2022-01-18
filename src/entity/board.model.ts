import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BoardColumn} from "./board-column.model";
import {Task} from "./task.model";

@Entity()
export class Board {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => BoardColumn, column => column.board, { onDelete: 'CASCADE', cascade: ['insert', 'remove'], eager: true })
  columns!: BoardColumn[];

  // @OneToMany(() => Task, task => task.board)
  tasks!: Task[];
}

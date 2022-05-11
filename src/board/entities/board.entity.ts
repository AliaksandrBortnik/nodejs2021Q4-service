import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BoardColumnEntity} from "./board-column.entity";
import {TaskEntity} from "../../task/entities/task.entity";

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @OneToMany(() => BoardColumnEntity, column => column.board, { cascade: true })
  columns: BoardColumnEntity[];

  @OneToMany(() => TaskEntity, task => task.board)
  tasks: TaskEntity[];
}

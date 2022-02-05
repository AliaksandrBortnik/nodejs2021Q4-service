import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BoardEntity} from "./board.entity";
import {TaskEntity} from "../../task/entities/task.entity";

@Entity('column')
export class BoardColumnEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  boardId?: string;
  @ManyToOne(() => BoardEntity, board => board.columns, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'boardId' })
  board: BoardEntity;

  @OneToMany(() => TaskEntity, task => task.column)
  tasks: TaskEntity[];
}
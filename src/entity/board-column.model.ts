import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Board} from "./board.model";
import {Task} from "./task.model";

@Entity({ name: 'column'})
export class BoardColumn {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => Board, board => board.columns, { onDelete: "CASCADE"})
  @JoinColumn()
  board!: Board;

  @OneToMany(() => Task, task => task.column)
  tasks!: Task[];
}
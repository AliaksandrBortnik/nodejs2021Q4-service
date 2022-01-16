import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {Board} from "./board.model";
import {Task} from "./task.model";

@Entity({ name: 'column'})
export class BoardColumn {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => Board, board => board.columns)
  @JoinColumn()
  board!: Board;

  @OneToMany(() => Task, task => task.column)
  tasks!: Task[];
}
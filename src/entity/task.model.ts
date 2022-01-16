import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.model";
import {Board} from "./board.model";
import {BoardColumn} from "./board-column.model";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @ManyToOne(() => User, user => user.tasks, { nullable: true })
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Board, board => board.tasks)
  @JoinColumn()
  board!: Board;

  @ManyToOne(() => BoardColumn, column => column.tasks)
  @JoinColumn()
  column!: BoardColumn;
}
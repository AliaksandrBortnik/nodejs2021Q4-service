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

  @ManyToOne(() => User, user => user.tasks, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  user!: User;
  userId!: string;

  @ManyToOne(() => Board, board => board.tasks, { eager: true})
  @JoinColumn()
  board!: Board;
  boardId!: string;

  @ManyToOne(() => BoardColumn, column => column.tasks, { eager: true, nullable: true })
  @JoinColumn()
  column!: BoardColumn;
  columnId!: string;
}
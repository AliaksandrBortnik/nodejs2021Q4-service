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

  @Column({ nullable: true })
  userId!: string;
  @ManyToOne(() => User, user => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ nullable: true })
  boardId!: string;
  @ManyToOne(() => Board, board => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board!: Board;

  @Column({ nullable: true })
  columnId!: string;
  @ManyToOne(() => BoardColumn, column => column.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'columnId' })
  column!: BoardColumn;
}
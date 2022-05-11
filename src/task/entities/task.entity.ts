import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import {BoardEntity} from "../../board/entities/board.entity";
import {BoardColumnEntity} from "../../board/entities/board-column.entity";

@Entity('task')
export class TaskEntity {
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
  @ManyToOne(() => UserEntity, user => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column({ nullable: true })
  boardId!: string;
  @ManyToOne(() => BoardEntity, board => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board!: BoardEntity;

  @Column({ nullable: true })
  columnId!: string;
  @ManyToOne(() => BoardColumnEntity, column => column.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'columnId' })
  column!: BoardColumnEntity;
}
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TaskEntity} from "../../task/entities/task.entity";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => TaskEntity, task => task.user)
  tasks!: TaskEntity[];
}
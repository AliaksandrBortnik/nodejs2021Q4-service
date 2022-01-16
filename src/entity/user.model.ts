import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Task} from "./task.model";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => Task, task => task.user)
  tasks!: Task[];
}
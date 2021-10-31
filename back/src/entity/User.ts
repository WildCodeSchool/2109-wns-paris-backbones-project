import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { Role } from "./Role";
import { Task } from "./Task";
@Entity()
export class BackBonesUser {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	email: string;

	@Column({ nullable: true })
	avatar: string;

	@Column({ nullable: true })
	password: string;

	@ManyToOne(() => Role, (role) => role.users, { eager: true })
	role: Role;

	@ManyToMany((type) => Task, (task) => task.users, { eager: true })
	@JoinTable()
	tasks: Task[];
}

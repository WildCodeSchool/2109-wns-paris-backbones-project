import { Field, ID, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	ManyToMany,
	JoinTable,
	BaseEntity,
} from "typeorm";
import { Role } from "./Role";
import { Task } from "./Task";
@Entity()
@ObjectType()
export class BackBonesUser extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => String)
	@Column()
	firstName: string;

	@Field(() => String)
	@Column()
	lastName: string;

	@Field(() => String)
	@Column()
	email: string;

	@Field(() => String)
	@Column({ nullable: true })
	avatar: string;

	@Field(() => String)
	@Column({ nullable: true })
	password: string;

	@ManyToOne(() => Role, (role) => role.users, { eager: true })
	role: Role;

	@ManyToMany((type) => Task, (task) => task.users, { eager: true })
	@JoinTable()
	tasks: Task[];
}

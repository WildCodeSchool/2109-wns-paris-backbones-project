import { Field, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	ManyToMany,
	JoinTable,
	BaseEntity,
} from "typeorm";
import { Project } from "./Project";
import { Role } from "./Role";
import { Task } from "./Task";
@Entity()
@ObjectType()
export class BackBonesUser extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Field()
	@Column({ unique: true })
	email: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	avatar: string;

	@Field({ nullable: true })
	@Column()
	password: string;

	@Field((type) => Role, { nullable: true })
	@ManyToOne(() => Role, (role) => role.users, {
		lazy: true,
		nullable: true,
	})
	role: Role;

	@Field(() => [Task], { nullable: true })
	@ManyToMany((type) => Task, (task) => task.users, {
		lazy: true,
		nullable: true,
	})
	@JoinTable()
	tasks: Task[];

	@Field(() => [Project], { nullable: true })
	@ManyToMany((type) => Project, (project) => project.users, {
		lazy: true,
		nullable: true,
	})
	@JoinTable()
	projects: Project[];
}

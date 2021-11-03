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
		eager: true,
		nullable: true,
	})
	role: Role;

	@Field(() => [Task], { nullable: true })
	@ManyToMany((type) => Task, (task) => task.users, {
		eager: true, //Eager relations are loaded automatically each time you load entities from the database
		nullable: true,
		cascade: ["insert"], //you can create a new Task in DB by doing something like this: newuser.tasks = [Task]
	})
	@JoinTable()
	tasks: Task[];
}

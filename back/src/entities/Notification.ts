import { Field, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
} from "typeorm";

import { Task } from "./Task";
import { BackBonesUser } from "./User";
import { Project } from "./Project";

@Entity()
@ObjectType()
export class Notification extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	title: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	description: string;

	@Field({ nullable: true })
	@Column({ nullable: true, default: true })
	read: boolean = false;

	@Field({ nullable: true })
	@Column({ nullable: true })
	created_at: Date;

	@Field(() => BackBonesUser)
	@ManyToOne(() => BackBonesUser, (user) => user.notifications, {
		lazy: true,
		nullable: true,
		onDelete: "CASCADE",
	})
	user: BackBonesUser;

	@Field(() => Task, { nullable: true })
	@ManyToOne(() => Task, (task) => task.notifications, {
		lazy: true,
		nullable: true,
		onDelete: "CASCADE",
	})
	task: Task;

	@Field(() => Project, { nullable: true })
	@ManyToOne(() => Project, (project) => project.notifications, {
		lazy: true,
		nullable: true,
		onDelete: "CASCADE",
	})
	project: Project;
}

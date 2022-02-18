import { Field, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	ManyToMany,
	BaseEntity,
} from "typeorm";
import { Status } from "./Status";
import { BackBonesUser } from "./User";
import { Project } from "./Project";
import { Notification } from "./Notification";

@Entity()
// @Unique(["title", "project"]) TO MAKE title unique for one project, work with PG but not with SQLITE3
@ObjectType()
export class Task extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ nullable: false })
	title: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	description: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	effective_time: Date;

	@Field({ nullable: true })
	@Column({ nullable: true })
	estimated_time: Date;

	@Field({ nullable: true })
	@Column({ nullable: true })
	start_date: Date;

	@Field({ nullable: true })
	@Column({ nullable: true })
	end_date: Date;

	@Field(() => Status, { nullable: true })
	@ManyToOne(() => Status, (status) => status.tasks, {
		lazy: true,
		nullable: true,
	})
	status: Status;

	@Field(() => [BackBonesUser], { nullable: true })
	@ManyToMany(() => BackBonesUser, (user) => user.tasks, {
		lazy: true,
		nullable: true,
	})
	users: BackBonesUser[];

	@Field(() => Project, { nullable: true })
	@ManyToOne(() => Project, (project) => project.tasks, {
		lazy: true,
		nullable: true,
	})
	project: Project;

	@Field(() => [Notification], { nullable: true })
	@ManyToOne(() => Notification, (notification) => notification.task, {
		lazy: true,
		nullable: true,
	})
	notifications: Notification[];
}

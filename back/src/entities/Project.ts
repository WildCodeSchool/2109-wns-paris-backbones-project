import { Field, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    OneToMany,
    BaseEntity, ManyToOne,
} from "typeorm";

import { Status } from "./Status";
import { Task } from "./Task";
import { BackBonesUser } from "./User";
import { Role } from "./Role";
import {Notification} from "./Notification";

@Entity()
@ObjectType()
export class Project extends BaseEntity {
	// Simple Fields
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
	@Column({ nullable: true })
	photo: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	start_date: Date;

	@Field({ nullable: true })
	@Column({ nullable: true })
	end_date: Date;

	// Relations
	@Field(() => [Status], { nullable: true })
	@OneToMany(() => Status, (status) => status.project, {
		lazy: true,
		nullable: true,
	})
	statuses: Status[];

	@Field(() => [BackBonesUser], { nullable: true })
	@ManyToMany(() => BackBonesUser, (user) => user.projects, {
		lazy: true,
		nullable: true,
	})
	users: BackBonesUser[];

	@Field(() => [Task], { nullable: true })
	@OneToMany(() => Task, (task) => task.project, {
		lazy: true,
		nullable: true,
	})
	tasks: Task[];

	@Field(() => [Role], { nullable: true })
	@OneToMany(() => Role, (role) => role.project, {
		lazy: true,
		nullable: true,
	})
	roles: Role[];

    @Field(() => [Notification], {nullable: true})
    @ManyToOne(() => Notification, (notification) => notification.project, {
        lazy: true,
        nullable: true,
    })
    notifications: Notification[];
}

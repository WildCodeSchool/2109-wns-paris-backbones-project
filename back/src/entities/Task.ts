import { Field, ID, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	ManyToMany,
	JoinTable,
	BaseEntity,
	OneToMany,
} from "typeorm";
import { Status } from "./Status";
import { BackBonesUser } from "./User";
import { Project } from "./Project";

@Entity()
@ObjectType()
export class Task extends BaseEntity {
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
	@ManyToMany((type) => BackBonesUser, (user) => user.tasks, {
		lazy: true,
		nullable: true,
	})
	users: BackBonesUser[];

	@Field(() => [Project], { nullable: true })
	@ManyToOne((type) => Project, (project) => project.tasks, {
		lazy: true,
		nullable: true,
	})
	project: Project

}

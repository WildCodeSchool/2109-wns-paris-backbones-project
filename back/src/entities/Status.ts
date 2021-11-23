import { Field, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	BaseEntity,
} from "typeorm";
import { Project } from "./Project";
import { Task } from "./Task";

@Entity()
@ObjectType()
export class Status extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	title: string;

	@Field(() => [Task], { nullable: true })
	@OneToMany(() => Task, (task) => task.status, {
		lazy: true,
		nullable: true,
	})
	tasks: Task[];

	@Field(() => [Task], { nullable: true })
	@OneToMany(() => Task, (task) => task.status, {
		lazy: true,
		nullable: true,
	})
	projects: Project[];
}

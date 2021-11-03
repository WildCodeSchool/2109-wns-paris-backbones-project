import { Field, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	BaseEntity,
} from "typeorm";
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

	@Field(() => [Task])
	@OneToMany(() => Task, (task) => task.status)
	tasks: Task[];
}

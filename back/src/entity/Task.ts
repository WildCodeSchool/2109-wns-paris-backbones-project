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
import { Status } from "./Status";
import { BackBonesUser } from "./User";

@Entity()
@ObjectType()
export class Task extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	title: string;

	@Field()
	@Column()
	description: string;

	@Field()
	@Column()
	effective_time: Date;

	@Field()
	@Column()
	estimated_time: Date;

	@Field()
	@Column()
	start_date: Date;

	@Field()
	@Column()
	end_date: Date;

	@Field(() => Status)
	@ManyToOne(() => Status, (status) => status.tasks, { eager: true })
	status: Status;

	@Field(() => [BackBonesUser])
	@ManyToMany((type) => BackBonesUser, (user) => user.tasks, {
		cascade: true,
	})
	@JoinTable()
	users: BackBonesUser[];
}

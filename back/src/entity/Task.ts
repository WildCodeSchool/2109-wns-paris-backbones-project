import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { Status } from "./Status";
import { BackBonesUser } from "./User";

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	effective_time: Date;

	@Column()
	estimated_time: Date;

	@Column()
	start_date: Date;

	@Column()
	end_date: Date;

	@ManyToOne(() => Status, (status) => status.tasks, { eager: true })
	status: Status;

	@ManyToMany((type) => BackBonesUser, (user) => user.tasks, {
		cascade: true,
	})
	@JoinTable()
	users: BackBonesUser[];
}

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
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

	@OneToOne(() => Status)
	@JoinColumn()
	role: Status;

	@ManyToMany(() => BackBonesUser)
	@JoinTable()
	users: BackBonesUser[];
}

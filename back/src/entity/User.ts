import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { Role } from "./Role";
@Entity()
export class BackBonesUser {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	email: string;

	@Column({ nullable: true })
	avatar: string;

	@Column({ nullable: true })
	password: string;

	@OneToOne(() => Role)
	@JoinColumn()
	role: Role;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
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

	@ManyToOne(() => Role, (role) => role.users, { eager: true })
	role: Role;
}

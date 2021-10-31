import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BackBonesUser } from "./User";

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@OneToMany(() => BackBonesUser, (user) => user.role)
	users: BackBonesUser[];
}

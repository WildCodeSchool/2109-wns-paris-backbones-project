import { Field, ID, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	BaseEntity,
} from "typeorm";
import { BackBonesUser } from "./User";

@Entity()
@ObjectType()
export class Role extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	title: string;

	@OneToMany(() => BackBonesUser, (user) => user.role)
	users: BackBonesUser[];
}

import { Field, ObjectType } from "type-graphql";
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
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	title: string;

	@Field(() => [BackBonesUser], { nullable: true })
	@OneToMany(() => BackBonesUser, (user) => user.role, {
		lazy: true,
		nullable: true,
	})
	users: BackBonesUser[];
}

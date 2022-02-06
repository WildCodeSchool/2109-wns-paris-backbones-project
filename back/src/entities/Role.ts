import { Field, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
	ManyToMany,
} from "typeorm";
import { BackBonesUser } from "./User";
import {Project} from "./Project";

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
	@ManyToMany(() => BackBonesUser, (user) => user.roles, {
		lazy: true,
		nullable: true,
	})
	users: BackBonesUser[];

	@Field(() => Project, { nullable: true })
	@ManyToOne(() => Project, (project) => project.roles, {
		lazy: true,
		nullable: true,
	})
	project: Project;

}

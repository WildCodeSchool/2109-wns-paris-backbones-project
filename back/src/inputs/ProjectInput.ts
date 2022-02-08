import { Status } from "../entities/Status";
import { Task } from "../entities/Task";
import { BackBonesUser } from "../entities/User";
import { InputType, Field } from "type-graphql";
import { StatusInput } from "./StatusInput";
import { TaskInput } from "./TaskInput";
import { UserInput } from "./UserInput";
import {RoleInput} from "./RoleInput";
import {Role} from "../entities/Role";

@InputType()
export class ProjectInput {
	@Field()
	id: number;
}

@InputType()
export class CreateProjectInput {

	@Field()
	title: string;

	@Field({ nullable: true })
	description: string;

	@Field({ nullable: true })
	photo: string;

	@Field({ nullable: true })
	start_date: Date;

	@Field({ nullable: true })
	end_date: Date;

	// Relations
	@Field(() => [StatusInput], { nullable: true })
	statuses: [Status];

	@Field(() => [TaskInput], { nullable: true })
	tasks: [Task];

	@Field(() => [UserInput], { nullable: true })
	users: [BackBonesUser];

	@Field(() => [RoleInput], { nullable: true })
	roles: [Role];
}

@InputType()
export class UpdateProjectInput {

	@Field({ nullable: true })
	title: string;

	@Field({ nullable: true })
	description: string;

	@Field({ nullable: true })
	photo: string;

	@Field({ nullable: true })
	start_date: Date;

	@Field({ nullable: true })
	end_date: Date;

	// Relations
	@Field(() => [StatusInput], { nullable: true })
	statuses: [Status];

	@Field(() => [TaskInput], { nullable: true })
	tasks: [Task];

	@Field(() => [UserInput], { nullable: true })
	users: [BackBonesUser];

	@Field(() => [RoleInput], { nullable: true })
	roles: [Role];
}

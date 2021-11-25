import { Task } from "../entities/Task";
import { InputType, Field } from "type-graphql";
import { TaskInput } from "./TaskInput";
import { RoleInput } from "./RoleInput";
import { Role } from "../entities/Role";

@InputType()
export class UserInput {
	@Field()
	id: number;
}
@InputType()
export class CreateUserInput {
	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@Field()
	email: string;

	@Field()
	password: string;

	@Field({ nullable: true })
	avatar: string;

	@Field((input) => RoleInput, { nullable: true })
	role: Role;

	@Field((input) => [TaskInput], { nullable: true })
	tasks: [Task];
}

@InputType()
export class UpdateUserInput {
	@Field({ nullable: true })
	firstName: string;

	@Field({ nullable: true })
	lastName: string;

	@Field({ nullable: true })
	email: string;

	@Field({ nullable: true })
	password: string;

	@Field({ nullable: true })
	avatar: string;

	@Field((input) => RoleInput, { nullable: true })
	role: Role;

	@Field((input) => [TaskInput], { nullable: true })
	tasks: [Task];
}

import { Task } from "../entities/Task";
import { InputType, Field } from "type-graphql";
import { TaskInput } from "./TaskInput";
import { ProjectInput } from "./ProjectInput";
import { Project } from "src/entities/Project";

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

	@Field(() => [TaskInput], { nullable: true })
	tasks: [Task];

	@Field(() => [ProjectInput], { nullable: true })
	projects: [Project];
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

	@Field(() => [TaskInput], { nullable: true })
	tasks: [Task];

	@Field(() => [ProjectInput], { nullable: true })
	projects: [Project];
}
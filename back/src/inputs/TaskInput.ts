import { Status } from "../entities/Status";
import { InputType, Field } from "type-graphql";
import { StatusInput } from "./StatusInput";
import { UserInput } from "./UserInput";
import { BackBonesUser } from "../entities/User";
import { Project } from "../entities/Project";
import { ProjectInput } from "./ProjectInput";

@InputType()
export class TaskInput {
	@Field()
	id: number;
}

@InputType()
export class CreateTaskInput {
	@Field()
	title: string;

	@Field({ nullable: true })
	description: string;

	@Field({ nullable: true })
	effective_time: string;

	@Field({ nullable: true })
	estimated_time: string;

	@Field({ nullable: true })
	start_date: Date;

	@Field({ nullable: true })
	end_date: Date;

	@Field(() => StatusInput, { nullable: true })
	status: Status;

	@Field(() => [UserInput], { nullable: true })
	users: BackBonesUser[];

	@Field(() => ProjectInput)
	project: Project;
}

@InputType()
export class UpdateTaskInput {
	@Field({ nullable: true })
	title: string;

	@Field({ nullable: true })
	description: string;

	@Field({ nullable: true })
	effective_time: string;

	@Field({ nullable: true })
	estimated_time: string;

	@Field({ nullable: true })
	start_date: Date;

	@Field({ nullable: true })
	end_date: Date;

	@Field({ nullable: true })
	effective_date: number;

	@Field(() => StatusInput, { nullable: true })
	status: Status;

	@Field(() => [UserInput], { nullable: true })
	users: BackBonesUser[];
}

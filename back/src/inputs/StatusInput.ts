import { InputType, Field } from "type-graphql";
import { ProjectInput } from "./ProjectInput";
import { Project } from "../entities/Project";
import { TaskInput } from "./TaskInput";
import { Task } from "../entities/Task";

@InputType()
export class StatusInput {
	@Field()
	id: number;
}

@InputType()
export class CreateStatusInput {
	@Field()
	title: string;

	@Field()
	isDoneStatus: boolean;

	@Field(() => [TaskInput], { nullable: true })
	tasks: Task[];

	@Field(() => ProjectInput, { nullable: true })
	project: Project;
}

@InputType()
export class UpdateStatusInput {
	@Field({ nullable: true })
	title: string;

	@Field({ nullable: true })
	isDoneStatus: boolean;

	@Field(() => [TaskInput], { nullable: true })
	tasks: Task[];
}

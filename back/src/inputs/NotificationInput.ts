import { InputType, Field } from "type-graphql";
import { UserInput } from "./UserInput";
import { BackBonesUser } from "../entities/User";
import { Project } from "../entities/Project";
import { ProjectInput } from "./ProjectInput";
import { TaskInput } from "./TaskInput";
import { Task } from "../entities/Task";

@InputType()
export class NotificationInput {
	@Field()
	id: number;
}

@InputType()
export class CreateNotificationInput {
	@Field()
	title: string;

	@Field({ nullable: true })
	description: string;

	@Field({ nullable: true })
	created_at: Date;

	@Field(() => UserInput)
	user: BackBonesUser;

	@Field(() => ProjectInput, { nullable: true })
	project: Project;

	@Field(() => TaskInput, { nullable: true })
	task: Task;
}

@InputType()
export class UpdateNotificationInput {
	@Field({ nullable: true })
	title: string;

	@Field({ nullable: true })
	description: string;

	@Field({ nullable: true })
	created_at: Date;

	@Field(() => ProjectInput, { nullable: true })
	project: Project;

	@Field(() => TaskInput, { nullable: true })
	task: Task;
}

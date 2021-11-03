import { Status } from "../entities/Status";
import { InputType, Field } from "type-graphql";
import { StatusInput } from "./StatusInput";

@InputType()
export class TaskInput {
	@Field()
	title: string;

	@Field({ nullable: true })
	description: string;

	@Field({ nullable: true })
	effective_time: Date;

	@Field({ nullable: true })
	estimated_time: Date;

	@Field({ nullable: true })
	start_date: Date;

	@Field({ nullable: true })
	end_date: Date;

	@Field((input) => StatusInput, { nullable: true })
	status: Status;
}

@InputType()
export class UpdateTaskInput extends TaskInput {
	@Field()
	id: number;
}

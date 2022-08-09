import { BackBonesUser } from "../entities/User";
import { InputType, Field } from "type-graphql";
import { UserInput } from "./UserInput";
import { CreateStatusInput } from "./StatusInput";

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

	@Field(() => [UserInput], { nullable: true })
	users: BackBonesUser[];

	@Field(() => [CreateStatusInput], { nullable: true })
	statuses: CreateStatusInput[];
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

	@Field(() => [UserInput], { nullable: true })
	users: BackBonesUser[];
}

import { InputType, Field } from "type-graphql";
import {UserInput} from "./UserInput";
import {BackBonesUser} from "../entities/User";
import {ProjectInput} from "./ProjectInput";
import {Project} from "../entities/Project";

@InputType()
export class RoleInput {
	@Field()
	id: number;
}

@InputType()
export class CreateRoleInput {
	@Field()
	title: string;

	@Field(() => [UserInput], { nullable: true })
	users: [BackBonesUser];

	@Field(() => ProjectInput)
	project: Project;
}

@InputType()
export class UpdateRoleInput {
	@Field({ nullable: true })
	title: string;

	@Field(() => ProjectInput, { nullable: true })
	project: Project;
}

import { InputType, Field } from "type-graphql";
import {UserInput} from "./UserInput";
import {BackBonesUser} from "../entities/User";

@InputType()
export class RoleInput {
	@Field()
	id: number;
}

@InputType()
export class CreateRoleInput {
	@Field()
	title: string;

	@Field((input) => [UserInput], { nullable: true })
	users: [BackBonesUser];
}

@InputType()
export class UpdateRoleInput {
	@Field({ nullable: true })
	title: string;

	@Field((input) => [UserInput], { nullable: true })
	users: [BackBonesUser];
}

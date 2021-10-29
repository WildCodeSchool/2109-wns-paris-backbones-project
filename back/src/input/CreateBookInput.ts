import { InputType, Field } from "type-graphql";

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

	@Field()
	avatar: string;
}

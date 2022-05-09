import { Field, InputType } from "type-graphql";

@InputType()
export class SignInInput {
	@Field()
	email: string;

	@Field()
	password: string;
}

@InputType()
export class SignUpInput {
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
}

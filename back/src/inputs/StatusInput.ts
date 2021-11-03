import { InputType, Field } from "type-graphql";

@InputType()
export class StatusInput {
	@Field()
	id: number;
}

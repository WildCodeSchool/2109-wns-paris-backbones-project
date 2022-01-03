import { Resolver, Query } from "type-graphql";
import { Status } from "../entities/Status";

@Resolver()
export class StatusResolver {
	@Query(() => [Status])
	async getStatuses() {
		return await Status.find();
	}
}

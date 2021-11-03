import { Resolver, Query } from "type-graphql";
import { Status } from "../entities/Status";

@Resolver()
export class StatusResolver {
	@Query(() => [Status], { name: "getStatuses" })
	async statuses() {
		try {
			return await Status.find();
		} catch (error) {
			console.log(error);
		}
	}
}

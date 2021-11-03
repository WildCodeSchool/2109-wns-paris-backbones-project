import { Resolver, Query } from "type-graphql";
import { Role } from "../entities/Role";

@Resolver()
export class RoleResolver {
	@Query(() => [Role], { name: "getRoles" })
	async roles() {
		try {
			return await Role.find();
		} catch (error) {
			console.log(error);
		}
	}
}

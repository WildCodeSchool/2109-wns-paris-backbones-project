import { Resolver, Query } from "type-graphql";
import { Role } from "../entities/Role";

@Resolver()
export class RoleResolver {
	@Query(() => [Role])
	async getRoles() {
		try {
			return await Role.find();
		} catch (error) {
			console.log(error);
		}
	}
}

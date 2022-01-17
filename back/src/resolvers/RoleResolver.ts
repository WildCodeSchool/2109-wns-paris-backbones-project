import { Resolver, Query } from "type-graphql";
import { Role } from "../entities/Role";

@Resolver()
export class RoleResolver {
	// READ
	@Query(() => [Role])
	async getRoles() {
		return await Role.find();
	}
}

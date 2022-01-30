import {Resolver, Query, Arg, Mutation} from "type-graphql";
import { Role } from "../entities/Role";
import {Status} from "../entities/Status";
import {CreateRoleInput, UpdateRoleInput} from "../inputs/RoleInput";

@Resolver()
export class RoleResolver {
	// READ
	@Query(() => [Role])
	async getRoles() {
		return await Role.find();
	}
	@Query(() => Status)
	async getRoleById(@Arg("roleId") id: number) {
		try {
			const role = await Role.findOne(id);
			if (role) {
				return role;
			} else {
				throw `there in no role with id: ${id}`;
			}
		} catch (error) {
			console.log(error);
		}
	}

	//CREATE
	@Mutation(() => Role)
	async addRole(@Arg("createRoleInput") createRoleInput: CreateRoleInput) {
		let newRoleId = 0;
		const role = Role.create(createRoleInput);
		try {
			if (!role.title) {
				throw "role title can't be null";
			}
			await Role.save(role);
			newRoleId = role.id;
			console.log("Successfully create: ", role);
		} catch (error) {
			console.log(error);
		}
		return await Role.findOne(newRoleId);
	}

	//UPDATE
	@Mutation(() => Role)
	async updateRole(
		@Arg("roleId") roleId: number,

		@Arg("updateRoleInput") updateRoleInput: UpdateRoleInput
	) {
		try {
			const role = await Role.findOne(roleId);
			if (role) {
				await Role.update(roleId, updateRoleInput);
				console.log("Successfully update: ", role);
			} else {
				throw `Role with id : ${roleId} doesn't exists`;
			}
		} catch (error) {
			console.log(error);
		}
		return await Role.findOne(roleId);
	}
}

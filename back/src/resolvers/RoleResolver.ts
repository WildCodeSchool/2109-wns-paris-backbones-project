import {Resolver, Query, Arg, Mutation} from "type-graphql";
import { Role } from "../entities/Role";
import {Status} from "../entities/Status";
import {CreateRoleInput, UpdateRoleInput} from "../inputs/RoleInput";
import {errorHandler} from "../utils/errorHandler";

@Resolver()
export class RoleResolver {
	// READ
	@Query(() => [Role])
	async getRoles() {
		return await Role.find();
	}
	@Query(() => Status)
	async getRoleById(@Arg("roleId") roleId: number) {
		try {
			const role = await Role.findOne(roleId);
			if (!role) {
				errorHandler(`there in no role with id: ${roleId}`);
			} else {
				return role;
			}
		} catch (error) {
			throw error;
		}
	}

	//CREATE
	@Mutation(() => Role)
	async addRole(@Arg("createRoleInput") createRoleInput: CreateRoleInput) {
		try {
			const createdRole = Role.create(createRoleInput);
			if (!createdRole.title) {
				errorHandler("role title can't be null");
			}
			await Role.save(createdRole);
			console.log("Successfully create: ", createdRole);
			return await Role.findOne(createdRole.id);
		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => Role)
	async updateRole(
		@Arg("roleId") roleId: number,

		@Arg("updateRoleInput") updateRoleInput: UpdateRoleInput
	) {
		try {
			const role = await Role.findOne(roleId);
			if (!role) {
				errorHandler(`Role with id : ${roleId} doesn't exists`);
			} else {
				await Role.update(roleId, updateRoleInput);
				console.log("Successfully update: ", role);
				return await Role.findOne(roleId);
			}
		} catch (error) {
			throw error;
		}
	}
}

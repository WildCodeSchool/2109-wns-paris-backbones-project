import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Role } from "../entities/Role";
import { Status } from "../entities/Status";
import { CreateRoleInput, UpdateRoleInput } from "../inputs/RoleInput";
import { errorHandler } from "../utils/errorHandler";
import { findSameTitle, resolveNotOnProject } from "../utils/resolverHelpers";

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
			return await Role.findOneOrFail(roleId);
		} catch (error) {
			throw error;
		}
	}

	//CREATE
	@Mutation(() => Role)
	async addRole(@Arg("createRoleInput") input: CreateRoleInput) {
		try {
			const role = await Role.create(input);
			const project = await role?.project;
			const { roles, users } = await project;
			const userNotOnProject = resolveNotOnProject(
				input?.users,
				await users
			);
			if (!role.title) {
				errorHandler("role title can't be null");
			} else if (findSameTitle(await roles, role.title)) {
				errorHandler(
					`Role with title ${role.title} already exists on this project`
				);
			} else if (userNotOnProject) {
				errorHandler(
					`User with id ${userNotOnProject[0].id} is not referenced on the project ${project.id}`
				);
			}
			await Role.save(role);
			console.log("Successfully create: ", role);
			return await Role.findOne(role.id);
		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => Role)
	async updateRole(
		@Arg("roleId") roleId: number,

		@Arg("updateRoleInput", { nullable: true }) input: UpdateRoleInput
	) {
		try {
			const role = await Role.findOneOrFail(roleId);
			const project = await role?.project;
			const { roles, users } = project;
			const usersNotOnProject = resolveNotOnProject(
				input.users,
				await users
			);
			if (usersNotOnProject) {
				errorHandler(
					`User with id ${usersNotOnProject[0].id} is not referenced on the project ${role.project?.id}`
				);
			} else if (findSameTitle(await roles, input.title, roleId)) {
				errorHandler(
					`Role with title ${input.title} already exists on this project`
				);
			}
			Object.assign(role, input);
			await role.save();
			console.log(
				`Role: [id: ${roleId}, ${role.title}] was successfully created`
			);
			return await Role.findOne(roleId);
		} catch (error) {
			throw error;
		}
	}
}

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Role } from "../entities/Role";
import { Status } from "../entities/Status";
import { CreateRoleInput, UpdateRoleInput } from "../inputs/RoleInput";
import { errorHandler } from "../utils/errorHandler";
import {
	createNotification,
	findSameTitle,
	resolveNotOnProject,
} from "../utils/resolverHelpers";
import { BackBonesUser } from "../entities/User";
import { Project } from "../entities/Project";

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
			const project = await Project.findOneOrFail(input.project);
			const roles = await project?.roles;
			const users = await project?.users;
			const userNotOnProject = resolveNotOnProject(input?.users, users);
			if (!role.title) {
				errorHandler("role title can't be null");
			} else if (findSameTitle(roles, role.title)) {
				errorHandler(
					`Role with title ${role.title} already exists on this project`
				);
			} else if (userNotOnProject) {
				errorHandler(
					`User with id ${userNotOnProject[0].id} is not referenced on the project ${project.id}`
				);
			}
			await Role.save(role);
			console.log(`Role ${role.id} Created: [project: ${project.title}]`);
			if (input.users) {
				const users = await BackBonesUser.findByIds(input.users);
				await createNotification(
					`${project.title}: Enjoy promotion you're now: ${role.title}`,
					users,
					undefined,
					project
				);
			}
			return await Role.findOneOrFail(role.id);
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
			const project = await Project.findOneOrFail(role.project);
			const roles = await project?.roles;
			const users = await project?.users;
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
			console.log(`Role ${role.id} Updated: [project: ${project.title}]`);
			if (input.users) {
				const users = await BackBonesUser.findByIds(input.users);
				await createNotification(
					`${project.title}: your role name change to ${role.title}`,
					users,
					undefined,
					project
				);
			}
			return await Role.findOneOrFail(roleId);
		} catch (error) {
			throw error;
		}
	}
}

import {Resolver, Query, Arg, Mutation} from "type-graphql";
import { Role } from "../entities/Role";
import {Status} from "../entities/Status";
import {CreateRoleInput, UpdateRoleInput} from "../inputs/RoleInput";
import {errorHandler} from "../utils/errorHandler";
import {findSameTitle, resolveNotOnProject} from "../utils/resolverHelpers";
import {BackBonesUser} from "../entities/User";

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
			const createdRole = await Role.create(createRoleInput);
			const project = await createdRole?.project;
			const roles = await project.roles;
			const usersProject = (await project.users).map(user => user.id);
			const userNotOnProject = resolveNotOnProject(createRoleInput?.users, usersProject);
			if (!createdRole.title) {
				errorHandler("role title can't be null");
			} else if (findSameTitle(roles, createdRole.title)) {
				errorHandler(`Role with title ${createdRole.title} already exists on this project`)
			} else if (userNotOnProject.length > 0) {
				errorHandler(`User with id ${userNotOnProject[0].id} is not referenced on the project ${project.id}`)
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

		@Arg('userId', { nullable: true }) userId: number,

		@Arg("updateRoleInput") updateRoleInput: UpdateRoleInput
	) {
		try {
			const role = await Role.findOne(roleId)
			const roleProject = await role?.project;
			const user = await BackBonesUser.findOne(userId)
			const userProjects = await user?.projects
			const isUserExistsOnRoleProjects = userProjects?.find((project) => roleProject?.id === project.id);
			const roles = await roleProject?.roles;
			if (!role) {
				errorHandler(`Role with id : ${roleId} doesn't exists`);
			} else if (!isUserExistsOnRoleProjects) {
				errorHandler(`User with id ${userId} is not referenced on the project ${role.project?.id}`)
			} else if (findSameTitle(roles, updateRoleInput.title, roleId)) {
				errorHandler(`Role with title ${updateRoleInput.title} already exists on this project`)
			} else {
				const roleUsers = await role?.users;
				const uniqueUser =  roleUsers?.find(u => u.id === user?.id)
				if (role && user && !uniqueUser) {
					role.users = [...roleUsers, user]
					await role.save()
				}
				await Role.update(role.id, updateRoleInput)
				console.log(`Role: [id: ${roleId}, ${role.title}] was successfully created`);
				return await Role.findOne(roleId);
			}
		} catch (error) {
			throw error;
		}
	}
}

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { BackBonesUser } from "../entities/User";
import { CreateUserInput, UpdateUserInput } from "../inputs/UserInput";
import { errorHandler } from "../utils/errorHandler";
import {
	handleUserNotification,
	resolveNotOnProject,
} from "../utils/resolverHelpers";
import { Task } from "../entities/Task";
import { Role } from "../entities/Role";
import { Project } from "../entities/Project";

@Resolver()
export class UserResolver {
	//READ
	@Query(() => [BackBonesUser])
	async getUsers() {
		return await BackBonesUser.find();
	}

	@Query(() => BackBonesUser)
	async getUserById(@Arg("userId") userId: number) {
		try {
			return await BackBonesUser.findOneOrFail(userId);
		} catch (error) {
			throw error;
		}
	}

	//CREATE
	@Mutation(() => BackBonesUser)
	async addUser(@Arg("createUserInput") input: CreateUserInput) {
		try {
			const user = BackBonesUser.create(input);
			//REFACTO A FAIRE
			const tasks: Task[] = [];
			const roles: Role[] = [];
			for (const project of await user?.projects) {
				const projectTasks = await project?.tasks;
				const projectRoles = await project?.roles;
				projectTasks.forEach((task) => tasks.push(task));
				projectRoles.forEach((role) => roles.push(role));
			}
			const tasksNotOnProject = resolveNotOnProject(
				await user?.tasks,
				tasks
			);
			const rolesNotOnProject = resolveNotOnProject(
				await user?.roles,
				roles
			);
			// FIN DE LA REFACTO

			if (!user.firstName || !user.lastName || !user.email) {
				errorHandler("Firstname, lastname or email cannot be empty");
			} else if (rolesNotOnProject) {
				errorHandler(
					`Role with id ${rolesNotOnProject[0].id} is not referenced on users projects`
				);
			} else if (tasksNotOnProject) {
				errorHandler(
					`Role with id ${tasksNotOnProject[0].id} is not referenced on users projects`
				);
			}
			await user.save();
			console.log("Successfully create: ", user);
			await handleUserNotification(user, input.tasks, input.projects);
			return BackBonesUser.findOneOrFail(user.id);
		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => BackBonesUser)
	async updateUser(
		@Arg("userId") userId: number,
		@Arg("updateUserInput") input: UpdateUserInput
	) {
		try {
			const user = await BackBonesUser.findOneOrFail(userId);
			const projects = await Project.findByIds(input.projects);

			//REFACTO A FAIRE
			const tasks: Task[] = [];
			const roles: Role[] = [];
			for (const project of projects) {
				const projectTasks = await project?.tasks;
				const projectRoles = await project?.roles;
				projectTasks.forEach((task) => tasks.push(task));
				projectRoles.forEach((role) => roles.push(role));
			}
			const tasksNotOnProject = resolveNotOnProject(
				await input?.tasks,
				tasks
			);
			const rolesNotOnProject = resolveNotOnProject(
				await input?.roles,
				roles
			);
			// FIN DE LA REFACTO
			if (rolesNotOnProject) {
				errorHandler(
					`Role with id ${rolesNotOnProject[0].id} is not referenced on users projects`
				);
			} else if (tasksNotOnProject) {
				errorHandler(
					`Role with id ${tasksNotOnProject[0].id} is not referenced on users projects`
				);
			}
			Object.assign(user, input);
			await user.save();
			console.log("Successfully update: ", user);
			await handleUserNotification(user, input.tasks, input.projects);
			return BackBonesUser.findOneOrFail(user.id);
		} catch (error) {
			throw error;
		}
	}
}

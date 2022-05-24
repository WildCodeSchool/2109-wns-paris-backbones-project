import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../entities/Task";
import { CreateTaskInput, UpdateTaskInput } from "../inputs/TaskInput";
import { errorHandler } from "../utils/errorHandler";
import {
	createNotification,
	findSameTitle,
	resolveNotOnProject,
} from "../utils/resolverHelpers";
import { BackBonesUser } from "../entities/User";
import { Project } from "../entities/Project";

@Resolver()
export class TaskResolver {
	// READ
	@Query(() => [Task])
	async getTasks() {
		return await Task.find();
	}

	@Query(() => Task)
	async getTaskById(@Arg("taskId") id: number) {
		try {
			return await Task.findOneOrFail(id);
		} catch (error) {
			throw error;
		}
	}

	//CREATE
	@Mutation(() => Task)
	async addTask(@Arg("createTaskInput") input: CreateTaskInput) {
		try {
			const task = Task.create(input);
			const project = await Project.findOneOrFail(input.project);
			const users = await project?.users;
			const statuses = await project?.statuses;
			const tasks = await project?.tasks;
			const userNotOnProject = resolveNotOnProject(input?.users, users);
			const statusNotOnProject = resolveNotOnProject(
				[input?.status],
				statuses
			);
			if (!task.title) {
				errorHandler("task title can't be null");
			} else if (findSameTitle(tasks, task.title)) {
				errorHandler(
					`Task with title ${task.title} already exists on this project`
				);
			} else if (userNotOnProject) {
				errorHandler(
					`User with id ${userNotOnProject[0].id} is not referenced on the project ${project.id}`
				);
			} else if (statusNotOnProject) {
				errorHandler(
					`Status with id ${statusNotOnProject[0].id} is not referenced on the project ${project.id}`
				);
			}
			await task.save();
			console.log(`Task ${task.id} Created: [project: ${project.title}]`);
			if (input.users) {
				const users = await BackBonesUser.findByIds(input.users);
				await createNotification(
					`${project.title}: You have a new task: ${task.title}`,
					users,
					task
				);
			}
			return Task.findOneOrFail(task.id);
		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => Task)
	async updateTask(
		@Arg("taskId") taskId: number,
		@Arg("updateTaskInput", { nullable: true }) input: UpdateTaskInput
	) {
		try {
			const task = await Task.findOneOrFail(taskId);
			const project = await Project.findOneOrFail(task.project);
			const users = await project?.users;
			const statuses = await project?.statuses;
			const tasks = await project?.tasks;
			const usersNotOnProject = resolveNotOnProject(input.users, users);
			const statusesNotOnProject = resolveNotOnProject(
				[input?.status],
				statuses
			);
			if (usersNotOnProject) {
				errorHandler(
					`User with id ${usersNotOnProject[0].id} is not referenced on the project ${task.project?.id}`
				);
			} else if (statusesNotOnProject) {
				errorHandler(
					`Status with id ${input?.status.id} is not referenced on the project ${project?.id}`
				);
			} else if (findSameTitle(tasks, input.title, taskId)) {
				errorHandler(
					`Task with title ${input.title} already exists on this project`
				);
			}
			const usersToNotify = input.users;
			if (input.users) {
				input.users = [...input.users, ...(await task?.users)];
			}
			Object.assign(task, input);
			await task.save();
			console.log(`Task ${task.id} Updated: [project: ${project.title}]`);
			if (usersToNotify) {
				const users = await BackBonesUser.findByIds(usersToNotify);
				await createNotification(
					`${project.title}: You have a new task: ${task.title}`,
					users,
					task
				);
			}
			return Task.findOneOrFail(task.id);
		} catch (error) {
			throw error;
		}
	}

	//DELETE
	@Mutation(() => [Task])
	async deleteTask(
		@Arg("taskId") taskId: number,
		// @Arg("deleteTaskInput", { nullable: true }) input: UpdateTaskInput
	) { try {
			const task = await Task.findOneOrFail(taskId);
			const users = await task?.users;
			const userNotOnProject = users.map((user) => !user);
			if (userNotOnProject) {
				errorHandler(`user is not allowed :D`);
				return;
			}
			await task.softRemove();
			return await Task.find();
		} catch (error) {
			throw error;
		}
	}
}

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../entities/Task";
import { CreateTaskInput, UpdateTaskInput } from "../inputs/TaskInput";
import { errorHandler } from "../utils/errorHandler";
import { findSameTitle, resolveNotOnProject } from "../utils/resolverHelpers";

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
			const project = await task?.project;
			const { users, statuses, tasks } = await project;
			const userNotOnProject = resolveNotOnProject(
				input?.users,
				await users
			);
			const statusNotOnProject = resolveNotOnProject(
				[input?.status],
				await statuses
			);
			if (!task.title) {
				errorHandler("task title can't be null");
			} else if (findSameTitle(await tasks, task.title)) {
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
			console.log("Successfully create: ", task);
			return Task.findOne(task.id);
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
			const project = await task?.project;
			const { users, statuses, tasks } = await project;
			const usersNotOnProject = resolveNotOnProject(
				input.users,
				await users
			);
			const statusesNotOnProject = resolveNotOnProject(
				[input?.status],
				await statuses
			);
			if (usersNotOnProject) {
				errorHandler(
					`User with id ${usersNotOnProject[0].id} is not referenced on the project ${task.project?.id}`
				);
			} else if (statusesNotOnProject) {
				errorHandler(
					`Status with id ${input?.status.id} is not referenced on the project ${project?.id}`
				);
			} else if (findSameTitle(await tasks, input.title, taskId)) {
				errorHandler(
					`Task with title ${input.title} already exists on this project`
				);
			}
			Object.assign(task, input);
			await task.save();
			console.log(
				`Task: [id: ${task.id}, ${task.title}] was successfully updated`
			);
			return await Task.findOne(task.id);
		} catch (error) {
			throw error;
		}
	}
}

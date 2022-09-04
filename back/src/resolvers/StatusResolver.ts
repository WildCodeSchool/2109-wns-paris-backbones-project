import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Status } from "../entities/Status";
import { CreateStatusInput, UpdateStatusInput } from "../inputs/StatusInput";
import { errorHandler } from "../utils/errorHandler";
import {
	createNotification,
	findSameTitle,
	resolveNotOnProject,
} from "../utils/resolverHelpers";
import { Project } from "../entities/Project";
import { Task } from "../entities/Task";

@Resolver()
export class StatusResolver {
	// READ
	@Query(() => [Status])
	async getStatuses() {
		return await Status.find();
	}

	@Query(() => Status)
	async getStatusById(@Arg("statusId") statusId: number) {
		try {
			return await Status.findOneOrFail(statusId);
		} catch (error) {
			throw error;
		}
	}

	//CREATE
	@Authorized()
	@Mutation(() => Status)
	async addStatus(
		@Arg("createStatusInput") input: CreateStatusInput,
		@Ctx() context: { userId: number }
	) {
		try {
			const status = await Status.create(input);
			const project = await Project.findOneOrFail(input.project);
			const statuses = await project?.statuses;
			const tasks = await project?.tasks;
			const taskNotOnProject = resolveNotOnProject(input.tasks, tasks);
			if (!status.title) {
				errorHandler("status title can't be null");
			} else if (findSameTitle(statuses, status.title)) {
				errorHandler(
					`Status with title ${status.title} already exists on this project`
				);
			} else if (taskNotOnProject) {
				errorHandler(
					`Task with id ${taskNotOnProject[0].id} is not referenced on the project ${project.id}`
				);
			}
			await Status.save(status);
			console.log(
				`Status ${status.id} Created: [project: ${project.title}]`
			);
			await this.notifyUsers(tasks, context, status);
			return await Status.findOneOrFail(status.id);
		} catch (error) {
			throw error;
		}
	}

	private async notifyUsers(
		tasks: Task[] | undefined,
		context: { userId: number },
		status: Status
	) {
		if (tasks) {
			for (const task of tasks) {
				const taskUsers = await task?.users;
				if (taskUsers) {
					const users = taskUsers.filter(
						(user) => user.id !== context.userId
					);
					await createNotification(
						`${task.title}: status change to ${status.title}`,
						users,
						task
					);
				}
			}
		}
	}

	//UPDATE
	@Authorized()
	@Mutation(() => Status)
	async updateStatus(
		@Arg("statusId") statusId: number,
		@Arg("updateStatusInput") input: UpdateStatusInput,
		@Ctx() context: { userId: number }
	) {
		try {
			const status = await Status.findOneOrFail(statusId);
			//const project = await Project.findOneOrFail(await status.project);
			const project = await status?.project;
			const statuses = await project?.statuses;
			const tasks = await project?.tasks;
			const taskNotOnProject = resolveNotOnProject(input.tasks, tasks);
			if (findSameTitle(statuses, input.title, statusId)) {
				errorHandler(
					`Status with title ${input.title} already exists on this project`
				);
			} else if (taskNotOnProject) {
				errorHandler(
					`Task with id ${taskNotOnProject[0].id} is not referenced on the project ${project.id}`
				);
			}
			Object.assign(status, input);
			await status.save();
			console.log(
				`Status ${status.id} Updated: [project: ${project.title}]`
			);
			await this.notifyUsers(tasks, context, status);
			return await Status.findOneOrFail(statusId);
		} catch (error) {
			throw error;
		}
	}

	//DELETE
	@Authorized()
	@Mutation(() => Boolean)
	async deleteStatus(
		@Arg("statusId") statusId: number,
		@Ctx() context: { userId: number }
	) {
		try {
			const status = await Status.findOneOrFail(statusId);
			const project = await Project.findOneOrFail(await status.project);
			//check if status is on tasks
			const tasks = await project?.tasks;
			// change status on tasks to default status
			for (const task of tasks) {
				const taskStatus = await task?.status;
				if (taskStatus?.id === statusId) {
					task.status = await Status.findOne({
						where: { project: project.id, title: "to do" },
					});
					await task.save();
				}
			}
			await Status.delete(statusId);
			console.log(
				`Status ${status.id} Deleted: [project: ${project.title}]`
			);
			return true;
		} catch (error) {
			throw error;
		}
	}
}

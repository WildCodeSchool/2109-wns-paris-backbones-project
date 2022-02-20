import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Status } from "../entities/Status";
import { CreateStatusInput, UpdateStatusInput } from "../inputs/StatusInput";
import { errorHandler } from "../utils/errorHandler";
import {
	createNotification,
	findSameTitle,
	resolveNotOnProject,
} from "../utils/resolverHelpers";
import { Project } from "../entities/Project";

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
	@Mutation(() => Status)
	async addStatus(@Arg("createStatusInput") input: CreateStatusInput) {
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
			for (const task of tasks) {
				const taskUsers = await task?.users;
				await createNotification(
					`${task.title}: status change to ${status.title}`,
					taskUsers,
					task
				);
			}
			return await Status.findOneOrFail(status.id);
		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => Status)
	async updateStatus(
		@Arg("statusId") statusId: number,
		@Arg("updateStatusInput") input: UpdateStatusInput
	) {
		try {
			const status = await Status.findOneOrFail(statusId);
			const project = await Project.findOneOrFail(status.project);
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
			for (const task of tasks) {
				const taskUsers = await task?.users;
				await createNotification(
					`${task.title}: status change to ${status.title}`,
					taskUsers,
					task
				);
			}
			return await Status.findOneOrFail(statusId);
		} catch (error) {
			throw error;
		}
	}
}

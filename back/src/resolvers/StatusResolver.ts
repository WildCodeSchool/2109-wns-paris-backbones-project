import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Status } from "../entities/Status";
import { CreateStatusInput, UpdateStatusInput } from "../inputs/StatusInput";
import { errorHandler } from "../utils/errorHandler";
import { findSameTitle, resolveNotOnProject } from "../utils/resolverHelpers";

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
			const project = await status?.project;
			const { statuses, tasks } = await project;
			const taskNotOnProject = resolveNotOnProject(
				input.tasks,
				await tasks
			);
			if (!status.title) {
				errorHandler("status title can't be null");
			} else if (findSameTitle(await statuses, status.title)) {
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
			const project = await status?.project;
			const { statuses, tasks } = await project;
			const taskNotOnProject = resolveNotOnProject(
				input.tasks,
				await tasks
			);
			if (findSameTitle(await statuses, input.title, statusId)) {
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
			// todo: createNotification
			console.log(
				`Status ${status.id} Updated: [project: ${project.title}]`
			);
			return await Status.findOneOrFail(statusId);
		} catch (error) {
			throw error;
		}
	}
}

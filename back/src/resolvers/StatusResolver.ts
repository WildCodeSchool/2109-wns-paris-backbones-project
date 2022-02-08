import {Resolver, Query, Arg, Mutation} from "type-graphql";
import { Status } from "../entities/Status";
import {CreateStatusInput, UpdateStatusInput} from "../inputs/StatusInput";
import {errorHandler} from "../utils/errorHandler";
import {findSameTitle, resolveNotOnProject} from "../utils/resolverHelpers";

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
			const status = await Status.findOne(statusId);
			if (!status) {
				errorHandler(`there in no task with id: ${statusId}`);
			} else {
				return status;
			}
		} catch (error) {
			throw error;
		}
	}

	//CREATE
	@Mutation(() => Status)
	async addStatus(@Arg("createStatusInput") createStatusInput: CreateStatusInput) {
		try {
			const createdStatus = await Status.create(createStatusInput);
			const project = await createdStatus?.project;
			const statuses = await project.statuses;
			const tasksProject = (await project.tasks).map(task => task.id);
			const taskNotOnProject = resolveNotOnProject(createStatusInput.tasks, tasksProject)
			if (!createdStatus.title) {
				errorHandler("status title can't be null");
			} else if (findSameTitle(statuses, createdStatus.title)) {
				errorHandler(`Status with title ${createdStatus.title} already exists on this project`)
			} else if (taskNotOnProject.length > 0) {
				errorHandler(`Task with id ${taskNotOnProject[0].id} is not referenced on the project ${project.id}`)
			}
			await Status.save(createdStatus);
			console.log("Successfully create: ", createdStatus);
			return await Status.findOne(createdStatus.id);
		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => Status)
	async updateStatus(
		@Arg("statusId") statusId: number,

		@Arg("updateStatusInput") updateStatusInput: UpdateStatusInput
	) {
		try {
			const status = await Status.findOne(statusId);
			const statusProject= await status?.project;
			const statuses = await statusProject?.statuses;
			if (!status) {
				errorHandler(`Status with id : ${statusId} doesn't exists`);
			} else if (findSameTitle(statuses, updateStatusInput.title, statusId)) {
				errorHandler(`Status with title ${updateStatusInput.title} already exists on this project`)
			} else {
				await Status.update(statusId, updateStatusInput);
				console.log("Successfully update: ", status);
				return await Status.findOne(statusId);
			}
		} catch (error) {
			throw error;
		}
	}
}

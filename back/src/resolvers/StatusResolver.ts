import {Resolver, Query, Arg, Mutation} from "type-graphql";
import { Status } from "../entities/Status";
import {CreateStatusInput, UpdateStatusInput} from "../inputs/StatusInput";
import {errorHandler} from "../utils/errorHandler";

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
			const createdStatus = Status.create(createStatusInput);
			if (!createdStatus.title) {
				errorHandler("status title can't be null");
			} else {
				await Status.save(createdStatus);
				console.log("Successfully create: ", createdStatus);
				return await Status.findOne(createdStatus.id);
			}
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
			const updatedStatus = await Status.findOne(statusId);
			if (!updatedStatus) {
				errorHandler(`Status with id : ${statusId} doesn't exists`);
			} else {
				await Status.update(statusId, updateStatusInput);
				console.log("Successfully update: ", updatedStatus);
				return await Status.findOne(statusId);
			}
		} catch (error) {
			throw error;
		}
	}
}

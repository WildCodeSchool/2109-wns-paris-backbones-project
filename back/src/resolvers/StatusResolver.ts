import {Resolver, Query, Arg, Mutation} from "type-graphql";
import { Status } from "../entities/Status";
import {CreateStatusInput, UpdateStatusInput} from "../inputs/StatusInput";

@Resolver()
export class StatusResolver {
	// READ
	@Query(() => [Status])
	async getStatuses() {
		return await Status.find();
	}
	@Query(() => Status)
	async getStatusById(@Arg("statusId") id: number) {
		try {
			const status = await Status.findOne(id);
			if (status) {
				return status;
			} else {
				throw `there in no task with id: ${id}`;
			}
		} catch (error) {
			console.log(error);
		}
	}

	//CREATE
	@Mutation(() => Status)
	async addStatus(@Arg("createStatusInput") createStatusInput: CreateStatusInput) {
		let newStatusId = 0;
		const status = Status.create(createStatusInput);
		try {
			if (!status.title) {
				throw "status title can't be null";
			}
			await Status.save(status);
			newStatusId = status.id;
			console.log("Successfully create: ", status);
		} catch (error) {
			console.log(error);
		}
		return await Status.findOne(newStatusId);
	}

	//UPDATE
	@Mutation(() => Status)
	async updateStatus(
		@Arg("statusId") statusId: number,

		@Arg("updateStatusInput") updateStatusInput: UpdateStatusInput
	) {
		try {
			const status = await Status.findOne(statusId);
			if (status) {
				await Status.update(statusId, updateStatusInput);
				console.log("Successfully update: ", status);
			} else {
				throw `Status with id : ${statusId} doesn't exists`;
			}
		} catch (error) {
			console.log(error);
		}
		return await Status.findOne(statusId);
	}
}

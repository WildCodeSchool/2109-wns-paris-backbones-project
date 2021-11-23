import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Task } from "../entities/Task";
import { CreateTaskInput } from "../inputs/TaskInput";

@Resolver()
export class TaskResolver {
	@Query(() => [Task])
	async getTasks() {
		try {
			return Task.find();
		} catch (error) {
			console.log(error);
		}
	}
	@Query(() => Task)
	async getTaskById(@Arg("TaskId") id: number) {
		try {
			return Task.findOne(id);
		} catch (error) {
			console.log(error);
		}
	}
	@Mutation(() => Task)
	async addTask(@Arg("CreateTaskInput") CreateTaskInput: CreateTaskInput) {
		let newTaskId = 0;
		console.log(CreateTaskInput);
		try {
			await Task.create(CreateTaskInput)
				.save()
				.then((result) => {
					if (result.id) {
						newTaskId = result.id;
						console.log("Succesfully create: ", result);
					} else {
						console.log("ERROR: We can't create this Task", result);
					}
				});
		} catch (error) {
			console.log(error);
		}
		return await Task.findOne(newTaskId);
	}

	//UPDATE
	@Mutation(() => Task)
	async updateTask(
		@Arg("taskId") taskId: number,
		@Arg("CreateTaskInput") CreateTaskInput: CreateTaskInput
	) {
		try {
			await Task.update(taskId, CreateTaskInput).then((result) => {
				if (result) {
					console.log("Succesfully update: ", result);
				} else {
					console.log("ERROR: We can't update this Task", result);
				}
			});
		} catch (error) {
			console.log(error);
		}
		return await Task.findOne(taskId);
	}
}

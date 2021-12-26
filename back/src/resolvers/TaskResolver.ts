import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Task } from "../entities/Task";
import { CreateTaskInput, UpdateTaskInput } from "../inputs/TaskInput";

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
			const task = await Task.create(CreateTaskInput).save();
			newTaskId = task.id;
			console.log("Succesfully create: ", task);
		} catch (error) {
			console.log(error);
		}
		return await Task.findOne(newTaskId);
	}

	//UPDATE
	@Mutation(() => Task)
	async updateTask(
		@Arg("TaskId") TaskId: number,

		@Arg("UpdateTaskInput") UpdateTaskInput: UpdateTaskInput
	) {
		try {
			const updatedTask = await Task.update(TaskId, UpdateTaskInput);
			console.log("Succesfully update: ", updatedTask);
		} catch (error) {
			console.log(error);
		}
		return await Task.findOne(TaskId);
	}
}

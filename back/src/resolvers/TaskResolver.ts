import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Task } from "../entities/Task";
import { CreateTaskInput, UpdateTaskInput } from "../inputs/TaskInput";

@Resolver()
export class TaskResolver {
	@Query(() => [Task])
	async getTasks() {
		return await Task.find();
	}
	@Query(() => Task)
	async getTaskById(@Arg("TaskId") id: number) {
		try {
			const task = await Task.findOne(id);
			if (task) {
				return task;
			} else {
				throw `there in no task with id: ${id}`;
			}
		} catch (error) {
			console.log(error);
		}
	}
	@Mutation(() => Task)
	async addTask(@Arg("CreateTaskInput") CreateTaskInput: CreateTaskInput) {
		let newTaskId = 0;
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
			const task = await Task.findOne(TaskId);
			if (task) {
				await Task.update(TaskId, UpdateTaskInput);
				console.log("Succesfully update: ", task);
			} else {
				throw `Task with id : ${TaskId} doesn't exists`;
			}
		} catch (error) {
			console.log(error);
		}
		return await Task.findOne(TaskId);
	}
}

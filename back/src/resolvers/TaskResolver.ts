import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Task } from "../entities/Task";
import { CreateTaskInput, UpdateTaskInput } from "../inputs/TaskInput";
import {Project} from "../entities/Project";

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

	//CREATE
	@Mutation(() => Task)
	async addTask(@Arg("createTaskInput") createTaskInput: CreateTaskInput) {
		let newTaskId = 0;
		const task = Task.create(createTaskInput);
		try {
			const project = await Project.findOne(task.project)
			const tasks = await project?.tasks
			if (!task.title) {
				throw "task title can't be null";
			} else if (tasks) {
				tasks?.forEach((t) => {
					if (t.title === task.title) {
						throw "a task with the same title already exists on this project"
					}
				})
			}
			await Task.save(task);
			newTaskId = task.id;
			console.log("Successfully create: ", task);
		} catch (error) {
			console.log(error);
		}
		return await Task.findOne(newTaskId);
	}

	//UPDATE
	@Mutation(() => Task)
	async updateTask(
		@Arg("taskId") taskId: number,

		@Arg("updateTaskInput") updateTaskInput: UpdateTaskInput
	) {
		try {
			const task = await Task.findOne(taskId);
			if (task) {
				await Task.update(taskId, updateTaskInput);
				console.log("Successfully update: ", task);
			} else {
				throw `Task with id : ${taskId} doesn't exists`;
			}
		} catch (error) {
			console.log(error);
		}
		return await Task.findOne(taskId);
	}
}

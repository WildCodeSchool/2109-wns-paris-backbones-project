import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Task } from "../entities/Task";
import { CreateTaskInput, UpdateTaskInput } from "../inputs/TaskInput";
import {Project} from "../entities/Project";
import {errorHandler} from "../utils/errorHandler";

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
			if (!task) {
				errorHandler(`there in no task with id: ${id}`);
			} else {
				return task;
			}
		} catch (error) {
			throw error;
		}
	}

	//CREATE
	@Mutation(() => Task)
	async addTask(@Arg("createTaskInput") createTaskInput: CreateTaskInput) {

		const task = Task.create(createTaskInput);
		try {
			const project = await Project.findOne(task.project)
			const tasks = await project?.tasks
			const taskWithSameTitle = tasks?.find((t) => t.title === task?.title)
			if (!task.title) {
				errorHandler("task title can't be null");
			} else if (taskWithSameTitle) {
				errorHandler("a task with the same title already exists on this project");
			} else {
				await Task.save(task);
				console.log("Successfully create: ", task);
				return await Task.findOne(task.id);
			}

		} catch (error) {
			throw error;
		}
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
				const project = await Project.findOne(updateTaskInput?.project)
				const tasks = await project?.tasks
				const title = updateTaskInput?.title ? updateTaskInput?.title : task.title;
				const taskWithSameTitle = tasks?.find((t) => t.title === title)
				if (taskWithSameTitle) {
					errorHandler("A task with the same title already exists on this project")
				} else {
					await Task.update(taskId, updateTaskInput);
					console.log("Successfully update: ", task);
					return await Task.findOne(taskId);
				}
			} else {
				errorHandler(`Task with id ${taskId} doesn't exists`);
			}
		} catch (error) {
			throw error;
		}
	}
}

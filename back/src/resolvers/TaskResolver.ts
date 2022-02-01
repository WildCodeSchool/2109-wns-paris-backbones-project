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
		try {
			const createdTask = Task.create(createTaskInput);
			const project = await Project.findOne(createdTask.project)
			const projectTasks = await project?.tasks
			const taskWithSameTitle = projectTasks?.find((t) => t.title === createdTask?.title)
			if (!createdTask.title) {
				errorHandler("task title can't be null");
			} else if (taskWithSameTitle) {
				errorHandler("a task with the same title already exists on this project");
			} else {
				await Task.save(createdTask);
				console.log("Successfully create: ", createdTask);
				return await Task.findOne(createdTask.id);
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
			const updatedTask = await Task.findOne(taskId);
			if (!updatedTask) {
				errorHandler(`Task with id ${taskId} doesn't exists`);
			} else {
				const project = await Project.findOne(updateTaskInput?.project)
				const tasks = await project?.tasks
				const title = updateTaskInput?.title ? updateTaskInput?.title : updatedTask.title;
				const taskWithSameTitle = tasks?.find((t) => t.title === title)
				if (taskWithSameTitle) {
					errorHandler("A task with the same title already exists on this project")
				} else {
					await Task.update(taskId, updateTaskInput);
					console.log("Successfully update: ", updatedTask);
					return await Task.findOne(taskId);
				}
			}
		} catch (error) {
			throw error;
		}
	}
}

import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Task } from "../entities/Task";
import { CreateTaskInput, UpdateTaskInput } from "../inputs/TaskInput";
import {Project} from "../entities/Project";
import { UserInputError } from "apollo-server";

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
				throw new UserInputError(`there in no task with id: ${id}`);
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
			const taskWithSameTitle = tasks?.find((t) => t.title === task?.title)
			if (!task.title) {
				throw new UserInputError("task title can't be null");
			} else if (taskWithSameTitle) {
				throw new UserInputError("a task with the same title already exists on this project");
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
				const project = await Project.findOne(updateTaskInput?.project)
				const tasks = await project?.tasks
				const title = updateTaskInput?.title ? updateTaskInput?.title : task.title;
				const taskWithSameTitle = tasks?.find((t) => t.title === title)
				if (taskWithSameTitle) {
					throw new UserInputError("A task with the same title already exists on this project")
				}
				await Task.update(taskId, updateTaskInput);
				console.log("Successfully update: ", task);
			} else {
				throw new UserInputError(`Task with id : ${taskId} doesn't exists`);
			}
		} catch (error) {
			console.log(error);
		}
		return await Task.findOne(taskId);
	}
}

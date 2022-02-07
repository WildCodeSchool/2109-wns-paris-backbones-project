import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Task } from "../entities/Task";
import { CreateTaskInput, UpdateTaskInput } from "../inputs/TaskInput";
import {errorHandler} from "../utils/errorHandler";
import {findSameTitle, resolveNotOnProject} from "../utils/resolverHelpers";
import {BackBonesUser} from "../entities/User";

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
			const project = await createdTask?.project;
			const tasks = await project.tasks;
			const usersProject = (await project?.users).map(user => user.id)
			const statusesProject = (await project?.statuses).map(status => status.id)
			const userNotOnProject = resolveNotOnProject(createTaskInput?.users, usersProject);
			const statusNotOnProject = resolveNotOnProject([createTaskInput?.status], statusesProject);
			if (!createdTask.title) {
				errorHandler("task title can't be null");
			} else if (findSameTitle(tasks, createdTask.title)) {
				errorHandler(`Task with title ${createdTask.title} already exists on this project`);
			} else if (userNotOnProject.length > 0) {
				errorHandler(`User with id ${userNotOnProject[0].id} is not referenced on the project ${project.id}`)
			} else if (statusNotOnProject.length > 0) {
				errorHandler(`Status with id ${createTaskInput?.status.id} is not referenced on the project ${project.id}`)
			}
			await Task.save(createdTask);
			console.log("Successfully create: ", createdTask);
			return await Task.findOne(createdTask.id);

		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => Task)
	async updateTask(
		@Arg("taskId") taskId: number,

		@Arg('userId', { nullable: true }) userId: number,

		@Arg("updateTaskInput", { nullable: true }) updateTaskInput: UpdateTaskInput
	) {
		try {
			const task = await Task.findOne(taskId);
			const taskProject = await task?.project;
			const user = await BackBonesUser.findOne(userId);
			const statuses = await taskProject?.statuses;
			const userProjects = await user?.projects
			const isUserExistsOnTaskProject = userProjects?.find((project) => taskProject?.id === project.id);
			const tasks = await taskProject?.tasks;
			const statusesProject = statuses?.map(status => status.id)
			const statusNotOnProject = resolveNotOnProject([updateTaskInput?.status], statusesProject);
			if (!task) {
				errorHandler(`Task with id ${taskId} doesn't exists`);
			} else if (!isUserExistsOnTaskProject) {
				errorHandler(`User with id ${userId} is not referenced on the project ${task.project?.id}`)
			} else if (findSameTitle(tasks, updateTaskInput.title, taskId)) {
				errorHandler(`Status with title ${updateTaskInput.title} already exists on this project`)
			} else if (statusNotOnProject.length > 0) {
				errorHandler(`Status with id ${updateTaskInput?.status.id} is not referenced on the project ${taskProject?.id}`)
			}  else {
				const taskUsers = await task?.users;
				const uniqueUser =  taskUsers?.find(u => u.id === user?.id)
				if (task && user && !uniqueUser) {
					task.users = [...taskUsers, user]
					await task.save()
				}
				await Task.update(taskId, updateTaskInput);
				console.log(`Role: [id: ${taskId}, ${task.title}] was successfully created`);
				return await Task.findOne(taskId);
			}
		} catch (error) {
			throw error;
		}
	}
}

import { BackBonesUser } from "../entities/User";
import { Project } from "../entities/Project";
import { Task } from "../entities/Task";
import { Notification } from "../entities/Notification";
import { TaskInput } from "../inputs/TaskInput";
import { ProjectInput } from "../inputs/ProjectInput";

export const findSameTitle = (
	array: any[] | undefined,
	title: String,
	id: Number = -1
) => {
	const matchingTitle =
		id != -1
			? array
					?.filter((element) => element.id != id)
					.find((element) => element.title === title)
			: array?.find((element) => element.title === title);
	return !!matchingTitle;
};

export const resolveNotOnProject = (
	inputArray: any[] | undefined,
	projectsArray: any[] | undefined
) => {
	let result = [];
	if (inputArray && inputArray[0] && projectsArray) {
		result = inputArray.filter((element) => {
			return !projectsArray?.map((el) => el.id).includes(element.id);
		});
	}
	return result.length > 0 ? result : false;
};

export const resolveOnProject = (
	inputArray: any[] | undefined,
	projectsArray: any[] | undefined
) => {
	let result = [];
	if (inputArray && inputArray[0] && projectsArray) {
		result = inputArray.filter((element) => {
			return projectsArray?.map((el) => el.id).includes(element.id);
		});
	}
	return result.length > 0 ? result : false;
};

export const resolveNewUsersList = (
	usersOnTask: any[] | undefined,
	usersInput: any[] | undefined
) => {
	let result: any | undefined = [];
	const userToAdd = resolveNotOnProject(usersInput, usersOnTask);
	const userToRemove = resolveOnProject(usersInput, usersOnTask);
	if (usersOnTask && userToRemove) {
		result = usersOnTask.filter((element) => {
			return !userToRemove.map((el) => el.id).includes(element.id);
		});
	} else if (usersOnTask && userToAdd) {
		result = [...usersOnTask, ...userToAdd];
	} else if (usersOnTask && userToAdd && userToRemove) {
		const newUsersOnTask = usersOnTask.filter((element) => {
			return !userToRemove.map((el) => el.id).includes(element.id);
		});
		result = [...newUsersOnTask, ...userToAdd];
	}
	return result;
};

export const createNotification = async (
	description: string,
	users: BackBonesUser[],
	task?: Task,
	project?: Project
) => {
	for (const user of users) {
		const notification = new Notification();
		notification.created_at = new Date();
		notification.description = description;
		notification.user = user;
		if (project) {
			notification.title = `${project.title}`;
			notification.project = project;
		}
		if (task) {
			const taskProject = await task?.project;
			notification.title = `${taskProject.title}: ${task.title}!`;
			notification.task = task;
		}
		await notification.save();
		console.log(
			`Notification ${notification.id} Created! [user: ${user.id} ${
				project
					? `for project: ${project.title}`
					: `for task: ${task?.title}`
			}]`
		);
	}
};

export const handleUserNotification = async (
	user: BackBonesUser,
	inputTasks?: TaskInput[],
	inputProjects?: ProjectInput[]
) => {
	if (inputProjects) {
		const projects = await Project.findByIds(inputProjects);
		for (const project of projects) {
			await createNotification(
				`You've been added to the project ${project.title}! Keep calm and take your mark`,
				[user],
				undefined,
				await project
			);
		}
	}
	if (inputTasks) {
		const tasks = await Task.findByIds(inputTasks);
		for (const task of tasks) {
			const taskProject = await task?.project;
			await createNotification(
				`${taskProject.title}: You have a new task: ${task.title}`,
				[user],
				task
			);
		}
	}
};

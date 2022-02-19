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

export const createNotification = async (
	users: BackBonesUser[],
	task?: Task,
	project?: Project
) => {
	for (const user of users) {
		const notification = new Notification();
		notification.created_at = new Date();
		notification.user = user;
		if (project) {
			notification.title = `Welcome to the project: ${project.title}!`;
			notification.description = `You've been added to the project ${project.title}! Keep calm and take your mark`;
			notification.project = project;
		}
		if (task) {
			const taskProject = await task?.project;
			notification.title = `${taskProject.title}: new ${task.title}!`;
			notification.description = `${taskProject.title}: You have a new task: ${task.title}`;
			notification.task = task;
		}
		await notification.save();
		console.log(
			`Saved a new Notification: ${notification.title}. On user id: ${user.id}`
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
			await createNotification([user], undefined, await project);
		}
	}
	if (inputTasks) {
		const tasks = await Task.findByIds(inputTasks);
		for (const task of tasks) {
			await createNotification([user], task);
		}
	}
};

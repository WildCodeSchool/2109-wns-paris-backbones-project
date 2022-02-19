import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { errorHandler } from "../utils/errorHandler";
import { resolveNotOnProject } from "../utils/resolverHelpers";
import { Notification } from "../entities/Notification";
import {
	CreateNotificationInput,
	UpdateNotificationInput,
} from "../inputs/NotificationInput";

@Resolver()
export class NotificationResolver {
	// READ
	@Query(() => [Notification])
	async getNotifications() {
		return await Notification.find();
	}

	@Query(() => Notification)
	async getNotificationsById(@Arg("notificationId") id: number) {
		try {
			return await Notification.findOneOrFail(id);
		} catch (error) {
			throw error;
		}
	}

	//CREATE
	@Mutation(() => Notification)
	async addNotification(
		@Arg("createNotificationInput") input: CreateNotificationInput
	) {
		try {
			const notification = Notification.create(input);
			const user = await notification?.user;
			const { projects, tasks } = await user;
			const userNotOnProject = resolveNotOnProject(
				[input?.project],
				await projects
			);
			const userNotOnTask = resolveNotOnProject(
				[input?.task],
				await tasks
			);
			if (!notification.title) {
				errorHandler("task title can't be null");
			} else if (userNotOnProject) {
				errorHandler(
					`User with id ${user.id} is not referenced on the project ${input.project.id}`
				);
			} else if (userNotOnTask) {
				errorHandler(
					`User with id ${user.id} is not referenced on the task ${input.task.id}`
				);
			}
			await notification.save();
			console.log("Successfully create: ", notification);
			return Notification.findOneOrFail(notification.id);
		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => Notification)
	async updateNotification(
		@Arg("notificationId") notificationId: number,
		@Arg("updateNotificationInput", { nullable: true })
		input: UpdateNotificationInput
	) {
		try {
			const notification = await Notification.findOneOrFail(
				notificationId
			);
			Object.assign(notification, input);
			await notification.save();
			console.log(
				`Task: [id: ${notification.id}, ${notification.title}] was successfully updated`
			);
			return Notification.findOneOrFail(notification.id);
		} catch (error) {
			throw error;
		}
	}
}

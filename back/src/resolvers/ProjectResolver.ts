import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Project } from "../entities/Project";
import { CreateProjectInput, UpdateProjectInput } from "../inputs/ProjectInput";
import { errorHandler } from "../utils/errorHandler";
import {
	createNotification,
	resolveNotOnProject,
} from "../utils/resolverHelpers";
import { BackBonesUser } from "../entities/User";
import { Status } from "../entities/Status";

@Resolver()
export class ProjectResolver {
	// READ
	@Query(() => [Project])
	async getProjects() {
		return await Project.find();
	}

	@Query(() => Project)
	async getProjectById(@Arg("projectId") id: number) {
		try {
			return await Project.findOneOrFail(id);
		} catch (error) {
			throw error;
		}
	}

	// CREATE
	@Authorized()
	@Mutation(() => Project)
	async addProject(
		@Arg("createProjectInput") input: CreateProjectInput,
		@Ctx() context: { userId: number }
	) {
		try {
			const user = await BackBonesUser.findOneOrFail(context.userId);
			input.users = input.users ? [...input.users, user] : [user];
			const project = Project.create(input);

			if (!project.title) {
				errorHandler("project title can't be null");
			}
			await project.save();
			if (input.statuses) {
				for (const status of input.statuses) {
					const newStatus = new Status();
					Object.assign(newStatus, status);
					newStatus.project = project;
					await newStatus.save();
				}
			}
			console.log(
				`Project ${project.id} Created: [title: ${project.title}]`
			);

			if (input.users) {
				const users = await BackBonesUser.findByIds(input.users);
				await createNotification(
					`You've been added to the project ${project.title}! Keep calm and take your mark`,
					users,
					undefined,
					project
				);
			}
			return Project.findOneOrFail(project.id);
		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => Project)
	async updateProject(
		@Arg("projectId") projectId: number,
		@Arg("updateProjectInput") input: UpdateProjectInput
	) {
		try {
			const project = await Project.findOneOrFail(projectId);
			const usersToNotify = input.users;
			if (input.users) {
				input.users = [...input?.users, ...(await project?.users)];
			}
			Object.assign(project, input);
			await Project.save(project);
			console.log(
				`Project ${project.id} Updated: [title: ${project.title}]`
			);
			if (usersToNotify) {
				const users = await BackBonesUser.findByIds(usersToNotify);
				await createNotification(
					`You've been added to the project ${project.title}! Keep calm and take your mark`,
					users,
					undefined,
					project
				);
			}
			return Project.findOneOrFail(project.id);
		} catch (error) {
			throw error;
		}
	}

	//DELETE
	@Authorized()
	@Mutation(() => Boolean)
	async deleteProject(
		@Arg("projectId") projectId: number,
		@Ctx() context: { userId: number }
	) {
		try {
			//check if user is the owner of the project
			const project = await Project.findOneOrFail(projectId);
			const projectUsers = await project?.users;
			const user = await BackBonesUser.findOneOrFail(context.userId);
			if (resolveNotOnProject([user], projectUsers)) {
				errorHandler("You can't delete this project");
			}
			await Project.softRemove(project);
			console.log(`Project ${project.id} Deleted`);
			return true;
		} catch (error) {
			throw error;
		}
	}
}

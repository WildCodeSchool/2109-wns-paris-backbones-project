import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Project } from "../entities/Project";
import { CreateProjectInput, UpdateProjectInput } from "../inputs/ProjectInput";
import { errorHandler } from "../utils/errorHandler";
import { createNotification } from "../utils/resolverHelpers";
import { BackBonesUser } from "../entities/User";

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
}

import { Arg, Mutation, Query, Resolver } from "type-graphql";
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
	@Mutation(() => Project)
	async addProject(@Arg("createProjectInput") input: CreateProjectInput) {
		try {
			const project = Project.create(input);
			if (!project.title) {
				errorHandler("project title can't be null");
			}
			await project.save();
			console.log("Successfully create: ", project);
			if (input.users) {
				const users = await BackBonesUser.findByIds(input.users);
				await createNotification(users, undefined, project);
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
			Object.assign(project, input);
			await Project.save(project);
			console.log("Successfully update: ", project);
			if (input.users) {
				const users = await BackBonesUser.findByIds(input.users);
				await createNotification(users, undefined, project);
			}
			return Project.findOneOrFail(project.id);
		} catch (error) {
			throw error;
		}
	}
}

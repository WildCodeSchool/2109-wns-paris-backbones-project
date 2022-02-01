import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Project } from "../entities/Project";
import { CreateProjectInput, UpdateProjectInput } from "../inputs/ProjectInput";
import {errorHandler} from "../utils/errorHandler";

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
			const project = await Project.findOne(id);
			if (!project) {
				errorHandler(`there in no project with id: ${id}`);
			} else {
				return project;
			}
		} catch (error) {
			throw error;
		}
	}

	// CREATE
	@Mutation(() => Project)
	async addProject(
		@Arg("createProjectInput") createProjectInput: CreateProjectInput
	) {
		try {
			const createdProject = Project.create(createProjectInput);
			if (!createdProject.title) {
				errorHandler("project title can't be null");
			} else {
				await Project.save(createdProject);
				console.log("Successfully create: ", createdProject);
				return await Project.findOne(createdProject.id);
			}
		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => Project)
	async updateProject(
		@Arg("projectId") projectId: number,

		@Arg("updateProjectInput") updateProjectInput: UpdateProjectInput
	) {
		try {
			const updatedProject = await Project.findOne(projectId);
			if (!updatedProject) {
				errorHandler(`Project with id : ${projectId} doesn't exists`);
			} else {
				await Project.update(projectId, updateProjectInput);
				console.log("Successfully update: ", updatedProject);
				return await Project.findOne(projectId);
			}
		} catch (error) {
			throw error;
		}
	}
}

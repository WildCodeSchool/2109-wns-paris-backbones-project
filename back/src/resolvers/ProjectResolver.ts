import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Project } from "../entities/Project";
import { CreateProjectInput, UpdateProjectInput } from "../inputs/ProjectInput";

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
			if (project) {
				return project;
			} else {
				throw `there in no project with id: ${id}`;
			}
		} catch (error) {
			console.log(error);
		}
	}

	// CREATE
	@Mutation(() => Project)
	async addProject(
		@Arg("createProjectInput") createProjectInput: CreateProjectInput
	) {
		let newProjectId = 0;
		const project = Project.create(createProjectInput);
		try {
			if (!project.title) {
				throw "project title can't be null";
			}
			await Project.save(project);
			console.log("Succesfully create: ", project);
			newProjectId = project.id;
		} catch (error) {
			console.log(error);
		}
		return await Project.findOne(newProjectId);
	}

	//UPDATE
	@Mutation(() => Project)
	async updateProject(
		@Arg("projectId") id: number,

		@Arg("updateProjectInput") updateProjectInput: UpdateProjectInput
	) {
		try {
			const project = await Project.findOne(id);
			if (project) {
				await Project.update(id, updateProjectInput);
				console.log("Succesfully update: ", project);
			} else {
				throw `Project with id : ${id} doesn't exists`;
			}
		} catch (error) {
			console.log(error);
		}
		return await Project.findOne(id);
	}
}

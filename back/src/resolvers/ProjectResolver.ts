import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Project } from "../entities/Project";
import { CreateProjectInput, UpdateProjectInput } from "../inputs/ProjectInput";

@Resolver()
export class ProjectResolver {
	// READ
	@Query(() => [Project])
	async getProjects() {
		try {
			return Project.find();
		} catch (error) {
			console.log(error);
		}
	}

	@Query(() => Project)
	async getProjectById(@Arg("ProjectId") id: number) {
		try {
			return Project.findOne(id);
		} catch (error) {
			console.log(error);
		}
	}

	// CREATE
	@Mutation(() => Project)
	async addProject(
		@Arg("CreateProjectInput") CreateProjectInput: CreateProjectInput
	) {
		let newProjectId = 0;
		try {
			const project = await Project.create(CreateProjectInput);
			newProjectId = project.id;
			console.log("Succesfully create: ", project);
		} catch (error) {
			console.log(error);
		}
		return await Project.findOne(newProjectId);
	}

	//UPDATE
	@Mutation(() => Project)
	async updateProject(
		@Arg("ProjectId") ProjectId: number,

		@Arg("UpdateProjectInput") UpdateProjectInput: UpdateProjectInput
	) {
		try {
			const project = await Project.findOne(ProjectId);
			if (project) {
				await Project.update(ProjectId, UpdateProjectInput);
				console.log("Succesfully update: ", project);
			} else {
				throw `Project with id : ${ProjectId} doesn't exists`;
			}
		} catch (error) {
			console.log(error);
		}
		return await Project.findOne(ProjectId);
	}
}

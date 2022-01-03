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
	async getProjectById(@Arg("ProjectId") id: number) {
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
		@Arg("CreateProjectInput") CreateProjectInput: CreateProjectInput
	) {
		let newProjectId = 0;
		try {
			const project = await Project.create(CreateProjectInput).save();
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

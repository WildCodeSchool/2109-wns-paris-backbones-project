import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Project } from "../entities/Project";
import { CreateProjectInput } from "../inputs/ProjectInput";

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
			const project = await Project.create(CreateProjectInput).save();
			if (project.id) {
				newProjectId = project.id;
				console.log("Succesfully create: ", project);
			} else {
				console.log("ERROR: We can't create project", project);
			}
		} catch (error) {
			console.log(error);
		}
		return await Project.findOne(newProjectId);
	}

	//UPDATE
	@Mutation(() => Project)
	async updateProject(
		@Arg("ProjectId") ProjectId: number,
		@Arg("CreateProjectInput") CreateProjectInput: CreateProjectInput
	) {
		try {
			await Project.update(ProjectId, CreateProjectInput).then(
				(result) => {
					if (result) {
						console.log("Succesfully update: ", result);
					} else {
						console.log(
							"ERROR: We can't update this Project",
							result
						);
					}
				}
			);
		} catch (error) {
			console.log(error);
		}
		return await Project.findOne(ProjectId);
	}
}

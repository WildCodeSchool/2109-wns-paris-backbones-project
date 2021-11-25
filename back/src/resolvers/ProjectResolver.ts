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
			await Project.create(CreateProjectInput)
				.save()
				.then((result) => {
					if (result.id) {
						newProjectId = result.id;
						console.log("Succesfully create: ", result);
					} else {
						console.log("ERROR: We can't create project", result);
					}
				});
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
			await Project.update(ProjectId, UpdateProjectInput).then(
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

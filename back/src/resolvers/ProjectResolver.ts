import { Resolver, Query } from "type-graphql";
import { Project } from '../entities/Project';

@Resolver()
export class ProjectResolver {
    // READ
    @Query(() => [Project])

    async getProjects() {
        try {
            return Project.find()
        }
        catch (error) {
            console.log(error)
        }
    }
}
import { Resolver, Query, Arg } from "type-graphql";
import { Task } from "../entities/Task";

@Resolver()
export class TaskResolver {
	@Query(() => [Task], { name: "getTasks" })
	async tasks() {
		try {
			return await Task.find();
		} catch (error) {
			console.log(error);
		}
	}
	@Query(() => Task, { name: "getTaskById" })
	async user(@Arg("id") id: string) {
		try {
			return (await Task.findOne(id))
				? Task.findOne(id)
				: console.log("there is no task with id: " + id);
		} catch (error) {
			console.log(error);
		}
	}
}

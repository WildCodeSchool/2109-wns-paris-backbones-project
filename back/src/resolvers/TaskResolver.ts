import { UserInput } from "src/inputs/UserInput";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Task } from "../entities/Task";
import { TaskInput } from "../inputs/TaskInput";

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
	@Mutation(() => Task)
	async addTask(@Arg("TaskInput") TaskInput: TaskInput) {
		let newTaskId = 0;
		try {
			await Task.create(TaskInput)
				.save()
				.then((result) => {
					if (result.id) {
						newTaskId = result.id;
						console.log("Succesfully create: ", result);
					} else {
						console.log("ERROR: We can't create this Task", result);
					}
				});
		} catch (error) {
			console.log(error);
		}
		return await Task.findOne(newTaskId);
	}
}

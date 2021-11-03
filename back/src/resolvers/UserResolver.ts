import { Resolver, Query, Arg, Mutation, ID } from "type-graphql";
import { BackBonesUser } from "../entities/User";
import { UserInput } from "../inputs/UserInput";

@Resolver()
export class UserResolver {
	@Query(() => [BackBonesUser])
	async getUsers() {
		try {
			return await BackBonesUser.find();
		} catch (error) {
			console.log(error);
		}
	}
	@Query(() => BackBonesUser)
	async getUserById(@Arg("id") id: string) {
		try {
			return (await BackBonesUser.findOne(id))
				? BackBonesUser.findOne(id)
				: console.log("there is no user with id: " + id);
		} catch (error) {
			console.log(error);
		}
	}

	@Mutation(() => BackBonesUser)
	async addUser(@Arg("UserInput") UserInput: UserInput) {
		let newUserId = 0;
		try {
			await BackBonesUser.create(UserInput)
				.save()
				.then((result) => {
					if (result.id) {
						newUserId = result.id;
						console.log("Succesfully create: ", result);
					} else {
						console.log("ERROR: We can't create this User", result);
					}
				});
		} catch (error) {
			console.log(error);
		}
		return await BackBonesUser.findOne(newUserId);
	}
}

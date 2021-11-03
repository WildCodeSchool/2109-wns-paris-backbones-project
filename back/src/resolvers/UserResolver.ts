import { Resolver, Query, Arg, Mutation, ID } from "type-graphql";
import { BackBonesUser } from "../entities/User";
import { UserInput, UpdateUserInput } from "../inputs/UserInput";

@Resolver()
export class UserResolver {
	//READ
	@Query(() => [BackBonesUser])
	async getUsers() {
		try {
			return BackBonesUser.find();
		} catch (error) {
			console.log(error);
		}
	}
	@Query(() => BackBonesUser)
	async getUserById(@Arg("UserId") id: number) {
		try {
			return BackBonesUser.findOne(id);
		} catch (error) {
			console.log(error);
		}
	}

	//CREATE
	@Mutation(() => BackBonesUser)
	async addUser(@Arg("UserInput") UserInput: UserInput) {
		let newUserId = 0;
		try {
			BackBonesUser.create(UserInput)
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

	//UPDATE
	@Mutation(() => BackBonesUser)
	async updateUser(@Arg("UpdateUserInput") UpdateUserInput: UpdateUserInput) {
		try {
			BackBonesUser.update(UpdateUserInput.id, UpdateUserInput).then(
				(result) => {
					if (result) {
						console.log("Succesfully update: ", result);
					} else {
						console.log("ERROR: We can't update this User", result);
					}
				}
			);
		} catch (error) {
			console.log(error);
		}
		return await BackBonesUser.findOne(UpdateUserInput.id);
	}
}

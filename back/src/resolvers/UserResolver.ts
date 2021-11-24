import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { BackBonesUser } from "../entities/User";
import { CreateUserInput } from "../inputs/UserInput";

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
	async addUser(@Arg("CreateUserInput") CreateUserInput: CreateUserInput) {
		let newUserId = 0;
		console.log(CreateUserInput);
		try {
			const user = await BackBonesUser.create(CreateUserInput).save();
			if (user.id) {
				newUserId = user.id;
				console.log("Succesfully create: ", user);
			} else {
				console.log("ERROR: We can't create this User", user);
			}
		} catch (error) {
			console.log(error);
		}
		return await BackBonesUser.findOne(newUserId);
	}

	//UPDATE
	@Mutation(() => BackBonesUser)
	async updateUser(
		@Arg("UserId") UserId: number,
		@Arg("CreateUserInput") CreateUserInput: CreateUserInput
	) {
		try {
			await BackBonesUser.update(UserId, CreateUserInput).then(
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
		return await BackBonesUser.findOne(UserId);
	}
}

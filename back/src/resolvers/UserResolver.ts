import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { BackBonesUser } from "../entities/User";
import { CreateUserInput, UpdateUserInput } from "../inputs/UserInput";
import { errorHandler } from "../utils/errorHandler";

@Resolver()
export class UserResolver {
	//READ
	@Query(() => [BackBonesUser])
	async getUsers() {
		return await BackBonesUser.find();
	}
	@Query(() => BackBonesUser)
	async getUserById(@Arg("userId") userId: number) {
		try {
			return await BackBonesUser.findOneOrFail(userId);
		} catch (error) {
			throw error;
		}
	}

	//CREATE
	@Mutation(() => BackBonesUser)
	async addUser(@Arg("createUserInput") input: CreateUserInput) {
		try {
			const user = BackBonesUser.create(input);
			if (!user.firstName || !user.lastName || !user.email) {
				errorHandler("Firstname, lastname or email cannot be empty");
			}
			await user.save();
			console.log("Successfully create: ", user);
			return user;
		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => BackBonesUser)
	async updateUser(
		@Arg("userId") userId: number,

		@Arg("updateUserInput") input: UpdateUserInput
	) {
		try {
			const user = await BackBonesUser.findOneOrFail(userId);
			Object.assign(user, input);
			await user.save();
			console.log("Successfully update: ", user);
			return await BackBonesUser.findOne(userId);
		} catch (error) {
			throw error;
		}
	}
}

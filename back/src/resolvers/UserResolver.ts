import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { BackBonesUser } from "../entities/User";
import { CreateUserInput, UpdateUserInput } from "../inputs/UserInput";

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
			const user = await BackBonesUser.findOne(userId);
			if (user) {
				return user;
			} else {
				throw `there in no user with id: ${userId}`;
			}
		} catch (error) {
			console.log(error);
		}
	}

	//CREATE
	@Mutation(() => BackBonesUser)
	async addUser(@Arg("createUserInput") createUserInput: CreateUserInput) {
		let newUserId = 0;
		const user = BackBonesUser.create(createUserInput);
		try {
			if (!user.firstName || !user.lastName || !user.email) {
				throw "Firstname, lastname or email cannot be empty";
			}
			await BackBonesUser.save(user);
			newUserId = user.id;
			console.log("Succesfully create: ", user);
		} catch (error) {
			console.log(error);
		}
		return await BackBonesUser.findOne(newUserId);
	}

	//UPDATE
	@Mutation(() => BackBonesUser)
	async updateUser(
		@Arg("userId") userId: number,

		@Arg("updateUserInput") updateUserInput: UpdateUserInput
	) {
		try {
			const user = await BackBonesUser.findOne(userId);
			if (user) {
				await BackBonesUser.update(userId, updateUserInput);
				console.log("Succesfully update: ", user);
			} else {
				throw `User with id : ${userId} doesn't exists`;
			}
		} catch (error) {
			console.log(error);
		}
		return await BackBonesUser.findOne(userId);
	}
}

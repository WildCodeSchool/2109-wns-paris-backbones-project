import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { BackBonesUser } from "../entities/User";
import { CreateUserInput, UpdateUserInput } from "../inputs/UserInput";
import {errorHandler} from "../utils/errorHandler";

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
			if (!user) {
				errorHandler(`there in no user with id: ${userId}`);
			} else {
				return user;
			}
		} catch (error) {
			throw error;
		}
	}

	//CREATE
	@Mutation(() => BackBonesUser)
	async addUser(@Arg("createUserInput") createUserInput: CreateUserInput) {
		try {
			const createdUser = BackBonesUser.create(createUserInput);
			if (!createdUser.firstName || !createdUser.lastName || !createdUser.email) {
				errorHandler("Firstname, lastname or email cannot be empty");
			} else {
				await BackBonesUser.save(createdUser);
				console.log("Successfully create: ", createdUser);
				return await BackBonesUser.findOne(createdUser.id);
			}
		} catch (error) {
			throw error;
		}
	}

	//UPDATE
	@Mutation(() => BackBonesUser)
	async updateUser(
		@Arg("userId") userId: number,

		@Arg("updateUserInput") updateUserInput: UpdateUserInput
	) {
		try {
			const updatedUser = await BackBonesUser.findOne(userId);
			if (!updatedUser) {
				errorHandler(`User with id : ${userId} doesn't exists`);
			} else {
				await BackBonesUser.update(userId, updateUserInput);
				console.log("Successfully update: ", updatedUser);
				return await BackBonesUser.findOne(userId);
			}
		} catch (error) {
			throw error;
		}
	}
}

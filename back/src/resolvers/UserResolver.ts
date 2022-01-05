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
	async getUserById(@Arg("UserId") id: number) {
		try {
			const user = await BackBonesUser.findOne(id);
			if (user) {
				return user;
			} else {
				throw `there in no user with id: ${id}`;
			}
		} catch (error) {
			console.log(error);
		}
	}

	//CREATE
	@Mutation(() => BackBonesUser)
	async addUser(@Arg("CreateUserInput") CreateUserInput: CreateUserInput) {
		let newUserId = 0;
		const user = BackBonesUser.create(CreateUserInput);
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
		@Arg("UserId") UserId: number,

		@Arg("UpdateUserInput") UpdateUserInput: UpdateUserInput
	) {
		try {
			const user = await BackBonesUser.findOne(UserId);
			if (user) {
				await BackBonesUser.update(UserId, UpdateUserInput);
				console.log("Succesfully update: ", user);
			} else {
				throw `User with id : ${UserId} doesn't exists`;
			}
		} catch (error) {
			console.log(error);
		}
		return await BackBonesUser.findOne(UserId);
	}
}

import { Resolver, Query, Arg } from "type-graphql";
import { BackBonesUser } from "../entities/User";

@Resolver()
export class UserResolver {
	@Query(() => [BackBonesUser], { name: "getUsers" })
	async users() {
		try {
			return await BackBonesUser.find();
		} catch (error) {
			console.log(error);
		}
	}
	@Query(() => BackBonesUser, { name: "getUserById" })
	async user(@Arg("id") id: string) {
		try {
			return (await BackBonesUser.findOne(id))
				? BackBonesUser.findOne(id)
				: console.log("there is no user with id: " + id);
		} catch (error) {
			console.log(error);
		}
	}

	// @Mutation(() => BackBonesUser)
	// async createBook(@Arg("data") data: CreateBookInput) {
	// 	const user = BackBonesUser.create(data);
	// 	await user.save();
	// 	return user;
	// }
}

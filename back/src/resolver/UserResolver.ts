import { Resolver, Query, FieldResolver, Root } from "type-graphql";
import { BackBonesUser } from "../entity/User";
import { Role } from "../entity/Role";

@Resolver()
export class UserResolver {
	@Query(() => [BackBonesUser])
	async users() {
		try {
			return await BackBonesUser.find();
		} catch (error) {
			console.log(error);
		}
	}

	@Query(() => [Role])
	async roles() {
		try {
			return await Role.find();
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

import { Resolver, Query } from "type-graphql";
import { BackBonesUser } from "../entity/User";

@Resolver()
export class UserResolver {
	@Query(() => [BackBonesUser])
	users() {
		return BackBonesUser.find();
	}
	// @Mutation(() => BackBonesUser)
	// async createBook(@Arg("data") data: CreateBookInput) {
	// 	const user = BackBonesUser.create(data);
	// 	await user.save();
	// 	return user;
	// }
}

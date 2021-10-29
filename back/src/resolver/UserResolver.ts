import { Resolver, Query } from "type-graphql";
import { BackBonesUser } from "../entity/User";

@Resolver()
export class UserResolver {
	@Query(() => String)
	hello() {
		return "world";
	}
	@Query(() => [BackBonesUser])
	books() {
		return BackBonesUser.find();
	}
	@Mutation(() => BackBonesUser)
	async createBook(@Arg("data") data: CreateBookInput) {
		const user = BackBonesUser.create(data);
		await user.save();
		return user;
	}
}

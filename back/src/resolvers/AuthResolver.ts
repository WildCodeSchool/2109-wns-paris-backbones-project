import * as bcrypt from "bcrypt";
import { Resolver, Arg, Mutation } from "type-graphql";
import { BackBonesUser } from "../entities/User";
import { errorHandler } from "../utils/errorHandler";
import * as jwt from "jsonwebtoken";

@Resolver()
export class AuthResolver {
	//SIGN IN
	@Mutation(() => String, { nullable: true })
	async signIn(
		@Arg("email") email: string,
		@Arg("password") password: string
	) {
		try {
			const user = await BackBonesUser.findOne({ email });
			if (user) {
				if (bcrypt.compareSync(password, user.password)) {
					const token = jwt.sign(
						{ userId: user.id },
						process.env.JWT_SECRET as jwt.Secret
					);
					return token;
				} else {
					return null;
				}
			} else {
				errorHandler("Invalid credentials", 1);
			}
		} catch (error) {
			throw error;
		}
	}
}

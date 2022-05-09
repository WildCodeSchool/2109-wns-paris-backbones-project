import * as bcrypt from "bcrypt";
import {
	Arg,
	Field,
	InterfaceType,
	Mutation,
	ObjectType,
	Resolver,
} from "type-graphql";
import { BackBonesUser } from "../entities/User";
import { errorHandler } from "../utils/errorHandler";
import * as jwt from "jsonwebtoken";
import { SignInInput, SignUpInput } from "../inputs/AuthInput";

@InterfaceType()
abstract class IAuthorizedUser {
	@Field()
	token: string;

	@Field()
	userId: number;
}

@ObjectType({ implements: IAuthorizedUser })
class AuthorizedUser implements IAuthorizedUser {
	token: string;
	userId: number;
}

@Resolver()
export class AuthResolver {
	//SIGN IN
	@Mutation(() => AuthorizedUser, { nullable: true })
	async signIn(@Arg("signInInput") input: SignInInput) {
		const email = input.email;
		try {
			const user = await BackBonesUser.findOne({ email });
			if (user) {
				if (bcrypt.compareSync(input.password, user.password)) {
					const token = jwt.sign(
						{ userId: user.id },
						process.env.JWT_SECRET as jwt.Secret
					);
					return {
						token,
						userId: user.id,
					};
				} else {
					errorHandler("Invalid credentials", 1);
				}
			} else {
				errorHandler("Invalid credentials", 1);
			}
		} catch (error) {
			throw error;
		}
	}

	//SIGN UP
	@Mutation(() => AuthorizedUser, { nullable: true })
	async signUp(@Arg("SignUpInput") input: SignUpInput) {
		try {
			const email = input.email;
			const user = await BackBonesUser.findOne({ email });
			if (user) {
				errorHandler("User already exists", 1);
			} else {
				const newUser = await BackBonesUser.create(input).save();
				console.log(`User ${newUser.id} Created`);
				console.log(typeof newUser.id);
				if (newUser) {
					console.log(
						`User ${newUser.id} Created: [firstName: ${newUser.firstName}]`
					);
					const token = jwt.sign(
						{ userId: newUser.id },
						process.env.JWT_SECRET as jwt.Secret
					);
					return {
						token,
						userId: newUser.id,
					};
				} else {
					errorHandler("Can't create user", 1);
				}
			}
		} catch (error) {
			throw error;
		}
	}
}

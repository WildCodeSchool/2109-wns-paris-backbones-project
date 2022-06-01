import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { BackBonesUser } from "./entities/User";
import { JwtPayload, Secret } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";

type RemoveIndex<T> = {
	[P in keyof T as string extends P
		? never
		: number extends P
		? never
		: P]: T[P];
};

interface CustomPayload extends RemoveIndex<JwtPayload> {
	userId: number;
	token: string;
}

export const customAuthChecker: AuthChecker<CustomPayload> = async ({
	context,
}) => {
	const userRepo = getRepository(BackBonesUser);
	const userJwt = context.token;
	try {
		const decoded = jwt.verify(
			userJwt,
			process.env.JWT_SECRET as Secret
		) as CustomPayload;
		if (!decoded.userId) {
			return false;
		}

		const user = await userRepo.findOne(decoded.userId);
		if (!user) {
			return false;
		}

		context.userId = user.id;
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

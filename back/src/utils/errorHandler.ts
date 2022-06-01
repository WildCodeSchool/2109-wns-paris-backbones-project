import { AuthenticationError, UserInputError } from "apollo-server";

export const errorHandler = (message: string, code: number = 0) => {
	let error;
	switch (code) {
		case 0:
			error = new UserInputError(message);
			break;
		case 1:
			error = new AuthenticationError(message);
			break;
		default:
			error = new Error(message);
			break;
	}
	console.error("OOPS SOMETHING BAD HAPPENED", error);
	throw error;
};

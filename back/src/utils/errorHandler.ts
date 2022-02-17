import {UserInputError} from "apollo-server";

export const errorHandler = (message: string, code: number = 0) => {
    let error
    switch (code) {
        case 0:
            error = new UserInputError(message);
    }
    console.error('OOPS SOMETHING BAD HAPPENED', error)
    throw error;
}
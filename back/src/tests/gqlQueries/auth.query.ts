import {DocumentNode} from "graphql";
import {gql} from "apollo-server";

export const SIGNUP = (
  email: string,
  firstName: string,
  lastName: string,
  avatar: string,
  password: string
) => {
    const mutationSignup: DocumentNode = gql`
        mutation SignUp($signUpInput: SignUpInput!) {
            signUp(signUpInput: $signUpInput) {
                token
                userId
            }
        }
    `;
  return {
    query: mutationSignup,
    variables: {
      signUpInput: {
        email: email,
        password: password,
        avatar: avatar,
        firstName: firstName,
        lastName: lastName,
      },
    },
  };
}

export const SIGNIN = (email: string, password: string) => {
    const mutationSignIn: DocumentNode = gql`
        mutation SignIn($signInInput: SignInInput!) {
            signIn(signInInput: $signInInput) {
                token
                userId
            }
        }
    `;
  return {
    query: mutationSignIn,
    variables: {
      signInInput: {
        email: email,
        password: password,
      },
    },
  };
};

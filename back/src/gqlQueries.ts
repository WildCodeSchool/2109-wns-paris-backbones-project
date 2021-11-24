import { gql } from "apollo-server";
import { DocumentNode } from "graphql";

export const GET_USERS = () => {
	const queryGetUsers: DocumentNode = gql`
		query Query {
			getUsers {
				id
			}
		}
	`;
	return { query: queryGetUsers };
};

export const GET_USER_BY_ID = () => {
	const queryGetUserById: DocumentNode = gql`
		query Query($userId: Float!) {
			getUserById(UserId: $userId) {
				id
				firstName
			}
		}
	`;
	return { query: queryGetUserById, variables: { userId: 1 } };
};

export const ADD_USER = () => {
	const mutationAddUser: DocumentNode = gql`
		mutation Mutation($CreateUserInput: CreateUserInput!) {
			addUser(CreateUserInput: $CreateUserInput) {
				id
				email
			}
		}
	`;
	return {
		query: mutationAddUser,
		variables: {
			CreateUserInput: {
				firstName: "Tim",
				lastName: "Cook",
				email: "timtim@gmail.com",
				password: "azerty",
				avatar: "iznogoud.jpeg",
			},
		},
	};
};

export const UPDATE_USER = () => {
	const queryGetUserById: DocumentNode = gql`
		mutation Mutation($CreateUserInput: CreateUserInput!) {
			addUser(CreateUserInput: $CreateUserInput) {
				id
				email
			}
		}
	`;
	return {
		query: queryGetUserById,
		variables: {
			CreateUserInput: {
				firstName: "Tim",
				lastName: "Cook",
				email: "timtim@gmail.com",
				password: "azerty",
				avatar: "iznogoud.jpeg",
			},
		},
	};
};

import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import ProjectCard from "../components/ProjectCard";
import SearchBar from "../components/SearchBar";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export const GET_USER_BY_ID = gql`
	query GetUserById($userId: Float!) {
		getUserById(userId: $userId) {
			id
			projects {
				id
				title
				photo
				tasks {
					id
				}
				users {
					id
				}
			}
		}
	}
`;

export default function ProjectsScreen({
	navigation,
}: RootTabScreenProps<"Projects">) {
	const userId = 1;
	const { loading, error, data } = useQuery(GET_USER_BY_ID, {
		variables: {
			userId: userId,
		},
	});
	const { getUserById: user } = data ?? {};

	if (error) {
		return <Text>Oops, there was an error...</Text>;
	}

	if (!loading && data) {
		return (
			<View style={styles.container}>
				<SearchBar />
				<FlatList
					data={user.projects}
					horizontal={false}
					numColumns={2}
					renderItem={({ item }) => (
						<ProjectCard
							project={item}
							userId={user.id}
							navigation={navigation}
						/>
					)}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});

import { FlatList, StyleSheet, Text } from "react-native";
import { TaskListItem } from "../components/TaskListItem";
import { View } from "../components/Themed";
import { gql, useQuery } from "@apollo/client";
import SearchBar from "../components/SearchBar";
import type { RootTabScreenProps } from "../types";

export const GET_USER_BY_ID = gql`
	query GetUserById($userId: Float!) {
		getUserById(userId: $userId) {
			id
			firstName
			lastName
			email
			avatar
			roles {
				id
				title
			}
			tasks {
				id
				title
				description
				start_date
				end_date
				status {
					id
					title
				}
			}
		}
	}
`;

export default function TasksScreen({
	navigation,
}: RootTabScreenProps<"Tasks">) {
	const userId = 1;
	const { loading, error, data } = useQuery(GET_USER_BY_ID, {
		variables: {
			userId: userId,
		},
	});
	const { getUserById: user } = data ?? {};

	if (!loading && user) {
		return (
			<View style={styles.container}>
				<SearchBar />
				<FlatList
					data={user.tasks}
					horizontal={false}
					renderItem={({ item }) => (
						<TaskListItem
							task={item}
							navigation={navigation}
							userId={userId}
						/>
					)}
				/>
			</View>
		);
	} else if (error) {
		console.log(error);
		return <Text>error !</Text>;
	} else {
		return <Text>LOADING...</Text>;
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

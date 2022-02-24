import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { gql, useQuery } from "@apollo/client";
import Reminder from "../components/Reminder";
import Accordion from "../components/Accordion";
import ProjectCard from "../components/ProjectCard";
import AppLoading from "expo-app-loading";
import UserBadge from "../components/UserBadge";
import SearchBar from "../components/SearchBar";

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
			projects {
				id
				title
				description
				photo
				start_date
				end_date
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
				users {
					id
					firstName
					lastName
					email
					avatar
				}
			}
		}
	}
`;

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
	const { loading, error, data } = useQuery(GET_USER_BY_ID, {
		variables: {
			userId: 1,
		},
	});
	const { getUserById: user } = data ?? {};

	if (!loading) {
		return (
			<View style={styles.container}>
				<SearchBar />
				<Reminder tasks={user.tasks} title={"Reminder"} />
				<Accordion title={"Tasks"}>
					<UserBadge user={user} />
				</Accordion>
				<Accordion title={"Projects"}>
					<FlatList
						data={user.projects}
						horizontal={false}
						numColumns={2}
						renderItem={({ item }) => (
							<ProjectCard
								project={item}
								navigation={navigation}
							/>
						)}
					/>
				</Accordion>
			</View>
		);
	} else if (error) {
		return <Text>error: {error}</Text>;
	} else {
		return <AppLoading />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		fontSize: 20,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});

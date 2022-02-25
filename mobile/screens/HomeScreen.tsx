import { FlatList } from "react-native";
import { Text } from "../components/Themed";
import { View } from "react-native";
import { RootTabScreenProps } from "../types";
import { gql, useQuery } from "@apollo/client";
import Reminder from "../components/Reminder";
import Accordion from "../components/Accordion";
import ProjectCard from "../components/ProjectCard";
import AppLoading from "expo-app-loading";
import { TaskListItem } from "../components/TaskListItem";
import SearchBar from "../components/SearchBar";
import tw from "../lib/tailwind";

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
				users {
					id
					avatar
					firstName
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
	const userId = 1;
	const { loading, error, data } = useQuery(GET_USER_BY_ID, {
		variables: {
			userId: userId,
		},
	});
	const { getUserById: user } = data ?? {};

	if (!loading) {
		return (
			<View style={tw`items-center flex-1`}>
				<SearchBar />
				<Reminder tasks={user.tasks} title={"Tasks to do"} />
				<Accordion title={"Tasks"}>
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
				</Accordion>
				<Accordion title={"Projects"}>
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
				</Accordion>
			</View>
		);
	} else if (error) {
		return <Text>error: {error}</Text>;
	} else {
		return <AppLoading />;
	}
}

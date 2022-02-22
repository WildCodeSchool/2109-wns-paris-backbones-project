import { type GestureResponderEvent, StyleSheet } from "react-native";
import {  View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { gql, useQuery } from "@apollo/client";
import { Btn } from "../components/Btn";
import Reminder from "../components/Reminder";
import Accordion from "../components/Accordion";

const GET_DATA = gql`
	query GetData {
		getProjects {
			title
			id
			description
			statuses {
				title
			}
			tasks {
				id
			}
			users {
				id
			}
		}
		getTasks {
			id
			title
			description
			effective_time
			estimated_time
			start_date
			end_date
			status {
				title
			}
			users {
				id
			}
			project {
				id
			}
		}
		getUsers {
			id
			firstName
			projects {
				id
			}
			tasks {
				id
			}
			lastName
			email
			avatar
			password
			roles {
				title
			}
		}
	}
`;

const onPress = (text: string) => (event: GestureResponderEvent) => {
	console.log("text", text);
};

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<"TabOne">) {
	const { loading, error, data } = useQuery(GET_DATA);
	const {
		getProjects: projects,
		getUsers: users,
		getTasks: tasks,
	} = data ?? {};

	return (
		<View style={styles.container}>
            <Reminder />

			<View
				style={styles.separator}
				lightColor="#252525"
				darkColor="#FFFFFF"
			/>
            <Accordion title={"Tasks"}>
                <Btn
                    buttonType={"enabled"}
                    content={"Test text youpi"}
                    onPress={onPress("blablabli")}
                />
            </Accordion>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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

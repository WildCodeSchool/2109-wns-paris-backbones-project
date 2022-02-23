import { StyleSheet } from "react-native";
import { TaskListItem } from "../components/TaskListItem";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TasksScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab Two</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<EditScreenInfo path="/screens/TasksScreen.tsx" />
			<TaskListItem statusBadge="done" content="Créer le composant task list item" />
			<TaskListItem statusBadge="to do" content="Importer les bons pictos de material ui" />
			<TaskListItem statusBadge="in progress" content="Finish styling component" />
			<TaskListItem statusBadge="late" content="Celebrate Laura's birthday" />
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
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});

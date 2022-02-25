/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.createURL("/")],
	config: {
		screens: {
			Root: {
				screens: {
					Home: {
						screens: {
							HomeScreen: "home",
						},
					},
					Tasks: {
						screens: {
							TasksScreen: "tasks",
						},
					},
					Projects: {
						screens: {
							ProjectsScreen: "projects",
						},
					},
					Profile: {
						screens: {
							ProfileScreen: "user",
						},
					},
				},
			},
			ProjectDetail: "project",
			TaskDetail: "task",
			Modal: "modal",
			NotFound: "*",
		},
	},
};

export default linking;

import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { type Style } from "twrnc/dist/esm/types";
import tw from "../lib/tailwind";
import { MaterialIcons } from "@expo/vector-icons";

type TaskStatus = "to do" | "done" | "in progress" | "late";

interface TaskListItem {
  statusBadge: TaskStatus,
  content: string,
  style?: Style,
}

const statuses = {
  toDo: {
    status: "to do",
    icon: "check-circle-outline",
    color: `primary-dark`,
  },
  done: {
    status: "done",
    icon: "check-circle",
    color: `primary-dark`,
  },
  inProgress: {
    status: "in progress",
    icon: "more-horiz",
    color: `primary-dark`,
  },
  late: {
    status: "late",
    icon: "access-time",
    color: `primary-dark`,
  },
} as const;

export const TaskListItem = ({ content, statusBadge }: TaskListItem) => {

  const badgeStyle = statusBadge === "to do" ? statuses.toDo
    : "done" ? statuses.done
      : "in progress" ? statuses.inProgress
        : statuses.late;
        // @todo: implement custom statuses logic here

  const onPress = () => {
    console.log("Would love to know more about this task!")
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row items-center justify-start py-1`}
    >
      <MaterialIcons
        style={tw`mx-auto text-3xl px-2`}
        color={badgeStyle.color}
        name={badgeStyle.icon}
      />
      <Text style={tw`text-dark-medium dark:text-light-light`}>
        {content}
      </Text>
    </TouchableOpacity >
  );
};
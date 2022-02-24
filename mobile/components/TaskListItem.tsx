import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import tw from "../lib/tailwind";
import { MaterialIcons } from "@expo/vector-icons";
import { type TaskData } from "../types/index";
import { type Style } from "twrnc/dist/esm/types";

interface IProps {
  task: TaskData,
  style?: Style,
}

interface Statuses {
  [key: string]: { 
    status: "to do" | "done" | "in progress" | "late",
    icon: "check-circle-outline" | "check-circle" | "access-time" | "more-horiz",
    color: string,
   },
}

const statuses: Statuses = {
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
  // @todo: handle these statuses later, only using to do and done for now
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


export const TaskListItem = ({ task }: IProps) => {

  let badgeStyle = statuses.toDo;

  useEffect(() => {
    console.log('coucou useeffect')
    if (task.status) {
      // @todo: implement custom statuses logic here
      if (task.status.title === "done") {
        badgeStyle = statuses.done
      } else if (task.status.title === "in progress") {
        badgeStyle = statuses.inProgress
      } else {
        badgeStyle = statuses.toDo
      }
    } else {
      badgeStyle = statuses.toDo
    }
  }, [])

  const onPress = () => {
    // @todo: open taskdetails
    console.log("Would love to know more about this task!")
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row items-center justify-start py-1`}
    >
      <View style={tw`bg-dark-dark rounded-3xl w-5/6 flex-row items-center justify-start px-2 py-1`}>
        <MaterialIcons
          style={tw`text-3xl px-2 self-start`}
          color={badgeStyle.color}
          name={badgeStyle.icon}
        />
        <Text style={tw`text-dark-medium dark:text-light-light px-1`}>
          {task.title}
        </Text>
      </View>
    </TouchableOpacity >
  );
};
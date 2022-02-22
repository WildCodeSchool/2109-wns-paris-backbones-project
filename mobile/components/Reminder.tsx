import { Text } from "./Themed";
import { gql, useQuery } from "@apollo/client";
import { FlatList, TouchableHighlight, View } from "react-native";
import tw from "../lib/tailwind";
import GradientWrapper from "./GradientWrapper";

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: Float!) {
    getUserById(userId: $userId) {
      id
      firstName
      tasks {
        id
        title
        description
      }
    }
  }
`;

const Reminder = () => {
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: 1,
    },
  });

  if (loading) {
    return <Text>LOADING</Text>;
  } else {
    return (
      <GradientWrapper
        gradientName={"primary-linear"}
        style={tw`p-2 max-w-sm rounded-lg`}
      >
        <Text
          style={tw`mb-2 text-2xl font-main-bold text-light-light tracking-tight`}
        >
          Reminder
        </Text>
        <Text
          style={tw`mb-2 text-2xl font-main-extralight tracking-tight text-light-light`}
        >
          hello {data.getUserById.firstName}
        </Text>
      </GradientWrapper>
    );
  }
};

export default Reminder;

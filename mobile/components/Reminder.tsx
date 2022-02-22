import { Text } from "./Themed";
import { gql, useQuery } from "@apollo/client";
import { FlatList, TouchableHighlight, View } from "react-native";
import tw from "../lib/tailwind";
import GradientWrapper from "./GradientWrapper";
import moment from "moment";

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
    console.log(data);
    return (
      <GradientWrapper
        gradientName={"primary-linear"}
        style={tw`p-2 max-w-sm rounded-lg w-5/6`}
      >
        <View style={tw` flex-row justify-between`}>
          <Text style={tw`mb-2 text-2xl font-main-bold text-light-light`}>
            Reminder
          </Text>
          <Text style={tw`mb-2 text-2xl font-main-light text-light-light`}>
            {moment().format("ddd DD MMM")}
          </Text>
        </View>
        <View style={tw`w-5/6`}>
          <FlatList
            horizontal
            data={data.getUserById.tasks.slice(0, 5)}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={tw`pr-32 my-10`}>
                <Text
                  style={tw`mb-2 text-2xl font-main-light text-light-light`}
                >
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
      </GradientWrapper>
    );
  }
};

export default Reminder;

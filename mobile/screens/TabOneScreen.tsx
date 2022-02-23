import {FlatList, type GestureResponderEvent, StyleSheet, TouchableOpacity} from "react-native";
import {Text, View} from "../components/Themed";
import {RootTabScreenProps} from "../types";
import {gql, useQuery} from "@apollo/client";
import {Btn} from "../components/Btn";
import Reminder from "../components/Reminder";
import Accordion from "../components/Accordion";
import ProjectCard from "../components/ProjectCard";
import AppLoading from "expo-app-loading";
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

const onPress = (text: string) => (event: GestureResponderEvent) => {
    console.log("text", text);
};

export default function TabOneScreen({
                                         navigation,
                                     }: RootTabScreenProps<"TabOne">) {
    const {loading, error, data} = useQuery(GET_USER_BY_ID, {
        variables: {
            userId: 1,
        },
    });
    const {
        getUserById: user,
    } = data ?? {};

    if (!loading) {
        return (
            <View style={styles.container}>
                <Reminder tasks={user.tasks} title={"Reminder"}/>

                <Accordion title={"Tasks"}>
                    <Btn
                        buttonType={"enabled"}
                        content={"Test text youpi"}
                        onPress={onPress("blablabli")}
                    />
                    <Btn
                        buttonType={"enabled"}
                        content={"Test text youpi"}
                        onPress={onPress("blablabli")}
                    />
                    <Btn
                        buttonType={"enabled"}
                        content={"Test text youpi"}
                        onPress={onPress("blablabli")}
                    />
                </Accordion>
                <Accordion title={"Projects"}>
                    <FlatList data={user.projects} horizontal={false} numColumns={2}
                              columnWrapperStyle={tw``}
                              renderItem={({item}) => (
                                  <TouchableOpacity style={tw``} onPress={() => console.log("I touched project " + item.title)}>
                                      <ProjectCard project={item}/>
                                  </TouchableOpacity>
                              )}/>
                </Accordion>
            </View>
        );

    } else if (error) {
        return <Text>error: {error}</Text>
    } else {
        return <AppLoading/>
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

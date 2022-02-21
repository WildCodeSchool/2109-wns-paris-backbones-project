import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppRegistry } from "react-native";
import Constants from "expo-constants";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_100Thin,
  Roboto_300Light,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
const { manifest } = Constants;

const api =
  typeof manifest?.packagerOpts === `object` && manifest?.packagerOpts.dev
    ? manifest?.debuggerHost?.split(`:`)?.shift()?.concat(`:4000`)
    : `api.example.com`;

const client = new ApolloClient({
  uri: `http://${api}/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_100Thin,
    Roboto_300Light,
  });

  if (!isLoadingComplete && !fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent("MyApplication", () => App);

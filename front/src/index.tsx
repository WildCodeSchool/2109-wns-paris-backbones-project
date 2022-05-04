import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GlobalStateProvider from "./state/GlobalStateProvider";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
	ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
	// uri: "/graphql",
	//in dev mode use localhost:4000
	uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("token");
	return {
		headers: {
			...headers,
			authorization: token,
		},
	};
});

const link = ApolloLink.from([errorLink, authLink, httpLink]);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<GlobalStateProvider />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

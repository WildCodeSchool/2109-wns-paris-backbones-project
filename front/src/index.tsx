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
import { BrowserRouter } from "react-router-dom";
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
	uri: process.env.NODE_ENV === "development" ? "http://localhost:4000/graphql" : "/graphql",
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
		<BrowserRouter>
			<ApolloProvider client={client}>
				<GlobalStateProvider />
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

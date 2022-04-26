import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GlobalStateProvider from "./state/GlobalStateProvider";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	// useQuery,
	// gql,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	// TODO: replace uri with env var later
	uri: "http://localhost:4000/",
});

const authLink = setContext((_, { headers }) => {
	console.log("new context");
	const token = localStorage.getItem("token");
	console.log(token);
	return {
		headers: {
			...headers,
			authorization: token,
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
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

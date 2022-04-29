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
	uri: "/graphql",
	//in dev mode use localhost:4000
	// uri: "http://localhost:4000/graphql",
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

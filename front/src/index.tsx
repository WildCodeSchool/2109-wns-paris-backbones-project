import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GlobalStateProvider from "./state/GlobalStateProvider";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
} from "@apollo/client";

const client = new ApolloClient({
	// TODO: replace uri with env var later
	uri: "http://localhost:4000/",
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

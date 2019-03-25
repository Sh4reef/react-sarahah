import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import Header from "components/CustomHeader/CustomHeader.jsx";

import routes from 'routes';

import { UserProvider } from 'contexts/User';

import "assets/scss/material-kit-pro-react.css?v=1.2.0";

const httpLink = createHttpLink({
	uri: "http://localhost:4000"
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("auth-token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ""
		}
	};
});

const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
					),
				);
			if (networkError) console.log(`[Network error]: ${networkError}`);
		}),
		authLink,
		httpLink
	]),
	cache: new InMemoryCache()
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<UserProvider>
			<Router>
				<Fragment>
					<Route render={({ history }) => <Header history={history} />} />
					<Switch>
						{routes.map(route => (
							<Route key={route.path} path={route.path} component={route.component} />
						))}
					</Switch>
				</Fragment>
			</Router>
		</UserProvider>
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

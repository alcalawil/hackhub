import {
	ApolloClient,
	ApolloLink,
	from,
	HttpLink,
	InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import fetch from 'cross-fetch';
// import { LENS_API } from './config';
import { PROFILES_BY_ADDRESS } from './queries';
import { getStorageValue } from '../../common/utils';

const LENS_API = 'https://api-mumbai.lens.dev/';

const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
};

const httpLink = new HttpLink({
	uri: LENS_API,
	fetch,
});

const getAuthenticationToken = () => {
	return getStorageValue('accessToken');
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);

	if (networkError) console.log(`[Network error]: ${networkError}`);
});

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
	const token = getAuthenticationToken();

	// Use the setContext method to set the HTTP headers.
	operation.setContext({
		headers: {
			'x-access-token': token ? `Bearer ${token}` : '',
		},
	});

	// Call the next link in the middleware chain.
	return forward(operation);
});

export const apolloClient = new ApolloClient({
	link: from([errorLink, authLink, httpLink]),
	cache: new InMemoryCache(),
	defaultOptions: defaultOptions,
});


export const getFirstProfileOwnedBy = async (address) => {
	const result = await apolloClient.query({
		query: PROFILES_BY_ADDRESS,
		variables: {
			ownedBy: address,
		},
	});

	const profile = result.data.profiles.items[0];

	return profile;
};

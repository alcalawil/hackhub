function getProfileImage(profile) {
	const ipfsGateway = 'https://lens.infura-ipfs.io/ipfs/';
	const profileUrl = ipfsGateway + new URL(profile.picture.original.url).host;

	return profileUrl;
}

const getFirstProfileOwnedBy = async (address) => {
	const result = await apolloClient.query({
		query: ProfilesDocument,
		variables: {
			request: {
				ownedBy: [address],
			},
		},
	});

	const profile = result.data.profiles.items[0];

	return profile;
};
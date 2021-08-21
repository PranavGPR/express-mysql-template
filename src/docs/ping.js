export default {
	'/ping': {
		get: {
			tags: ['Ping'],
			summary: 'Ping the server',
			description: 'Ping the server',
			responses: {
				200: {
					description: 'Ping successful'
				}
			}
		}
	}
};

import { sendSuccess } from 'helpers';

/**
 * Controllers for all /ping routes
 *
 * Available controllers: basePing
 */

export async function basePing(_req, res) {
	/**
	 * Ping the server
	 * @param {}
	 * @returns Status `200`
	 */

	return sendSuccess(res, { message: 'Pong...' });
}

export default { basePing };

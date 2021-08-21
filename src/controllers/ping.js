import { query } from 'connections/dbConnection';
import { sendSuccess } from 'helpers/responseSetters';

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

	/**
	 * This query is only for explanatory purpose of how the
	 * query function works. You can change the response with
	 * just a simple message or so.
	 */
	const result = await query('select 1 from dual');

	return sendSuccess(res, { result });
}

export default { basePing };

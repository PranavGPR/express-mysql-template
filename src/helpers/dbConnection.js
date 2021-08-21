import mysql from 'mysql2/promise';
import 'regenerator-runtime/runtime';
import 'dotenv/config';

const { DB_USER, DB_PASS, DB_URL, DB_NAME, TEST_DB_NAME, NODE_ENV } = process.env;

export const query = async (sql, params) => {
	let connection;

	if (NODE_ENV === 'test') {
		connection = await mysql.createConnection({
			host: DB_URL,
			user: DB_USER,
			password: DB_PASS,
			database: TEST_DB_NAME
		});
	} else {
		connection = await mysql.createConnection({
			host: DB_URL,
			user: DB_USER,
			password: DB_PASS,
			database: DB_NAME
		});
	}

	const [results] = await connection.query(sql, params);

	connection.end();

	return results;
};

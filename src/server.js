import express from 'express';
import 'express-async-errors';
import chalk from 'chalk';
import 'dotenv/config';
import cors from 'cors';

import logger from 'tools/logger';
import { registerLogging, registerPreprocessor, registerRouters, setupDocs } from 'tools';

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
registerLogging(app);
registerPreprocessor(app);
registerRouters(app);
setupDocs(app);

/**
 * Starts up the server at the given PORT
 * @param {Number} PORT
 */

const server = app.listen(PORT);

server.once('listening', () => {
	const { port } = server.address();
	logger.info(`Server started at port ${chalk.blueBright(port)}`);
});

module.exports = server;

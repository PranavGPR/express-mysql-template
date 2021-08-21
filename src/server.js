import express from 'express';
import 'express-async-errors';
import chalk from 'chalk';
import 'dotenv/config';
import cors from 'cors';

import { handleServerErrors } from 'tools';
import { registerLogging, registerPreprocessor, setupDocs } from 'tools';
import { registerRouters } from 'helpers';
import logger from 'tools/logger';

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
registerLogging(app);
registerPreprocessor(app);
registerRouters(app);
handleServerErrors(app);
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

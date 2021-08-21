import 'dotenv/config';
import winston from 'winston';

import Logger from './requestLogger';

const { format, transports } = winston;
const { combine, colorize, printf, json, prettyPrint, timestamp } = format;

/**
 * Configures morgan request logging and adds the middleware.
 */
export function registerLogging(app) {
	if (process.env.logRequests) app.use(Logger);
}

function formatObject(param) {
	if (typeof param === 'string') {
		return param;
	}

	if (param instanceof Error) {
		return param.stack ? param.stack : JSON.stringify(param, null, 2);
	}

	return JSON.stringify(param, null, 2);
}

/**
 * Creates a customized console transport
 * @returns {*} WinstonConsoleTransport
 */
const prettyConsoleTransport = new transports.Console({
	format: combine(
		colorize(),
		json(),
		printf(info => {
			return `[${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString(
				'en-US'
			)}] ${info.level} | ${formatObject(info.message)}`;
		})
	)
});

/**
 * Creates file transport
 * @param {string} filename filepath to log
 * @param {string} level Logging level
 * @returns WinstonTransport
 */
const fileLogTransport = (filename, level) => {
	return new transports.File({
		filename,
		level,
		format: combine(json(), timestamp(), prettyPrint())
	});
};

/**
 * Configures winston logger
 */
const logger = winston.createLogger({
	level: process.env.loggingLevel,
	transports: [prettyConsoleTransport],
	exceptionHandlers: [prettyConsoleTransport, fileLogTransport('log/exceptions.log', 'error')],
	rejectionHandlers: [prettyConsoleTransport, fileLogTransport('log/rejections.log', 'warn')]
});

export default logger;

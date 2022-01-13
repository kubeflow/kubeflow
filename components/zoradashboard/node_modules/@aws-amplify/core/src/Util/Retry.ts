import { DelayFunction } from '../types';
import { ConsoleLogger as Logger } from '../Logger/ConsoleLogger';
const logger = new Logger('Util');

export class NonRetryableError extends Error {
	public readonly nonRetryable = true;
	constructor(message: string) {
		super(message);
	}
}

const isNonRetryableError = (obj: any): obj is NonRetryableError => {
	const key: keyof NonRetryableError = 'nonRetryable';
	return obj && obj[key];
};

/**
 * @private
 * Internal use of Amplify only
 */
export async function retry(
	functionToRetry: Function,
	args: any[],
	delayFn: DelayFunction,
	attempt: number = 1
) {
	if (typeof functionToRetry !== 'function') {
		throw Error('functionToRetry must be a function');
	}
	logger.debug(
		`${
			functionToRetry.name
		} attempt #${attempt} with this vars: ${JSON.stringify(args)}`
	);

	try {
		return await functionToRetry(...args);
	} catch (err) {
		logger.debug(`error on ${functionToRetry.name}`, err);

		if (isNonRetryableError(err)) {
			logger.debug(`${functionToRetry.name} non retryable error`, err);
			throw err;
		}

		const retryIn = delayFn(attempt, args, err);
		logger.debug(`${functionToRetry.name} retrying in ${retryIn} ms`);

		if (retryIn !== false) {
			await new Promise(res => setTimeout(res, retryIn));
			return await retry(functionToRetry, args, delayFn, attempt + 1);
		} else {
			throw err;
		}
	}
}

const MAX_DELAY_MS = 5 * 60 * 1000;

function jitteredBackoff(maxDelayMs: number): DelayFunction {
	const BASE_TIME_MS = 100;
	const JITTER_FACTOR = 100;

	return attempt => {
		const delay = 2 ** attempt * BASE_TIME_MS + JITTER_FACTOR * Math.random();
		return delay > maxDelayMs ? false : delay;
	};
}

/**
 * @private
 * Internal use of Amplify only
 */
export const jitteredExponentialRetry = (
	functionToRetry: Function,
	args: any[],
	maxDelayMs: number = MAX_DELAY_MS
) => retry(functionToRetry, args, jitteredBackoff(maxDelayMs));

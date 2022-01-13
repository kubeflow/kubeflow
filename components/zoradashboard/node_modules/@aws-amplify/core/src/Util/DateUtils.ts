/**
 * Date & time utility functions to abstract the `aws-sdk` away from users.
 * (v2 => v3 modularization is a breaking change)
 *
 * @see https://github.com/aws/aws-sdk-js/blob/6edf586dcc1de7fe8fbfbbd9a0d2b1847921e6e1/lib/util.js#L262
 */

// Comment - TODO: remove

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

export const DateUtils = {
	/**
	 * Milliseconds to offset the date to compensate for clock skew between device & services
	 */
	clockOffset: 0,

	getDateWithClockOffset() {
		if (DateUtils.clockOffset) {
			return new Date(new Date().getTime() + DateUtils.clockOffset);
		} else {
			return new Date();
		}
	},

	/**
	 * @returns {number} Clock offset in milliseconds
	 */
	getClockOffset() {
		return DateUtils.clockOffset;
	},

	getHeaderStringFromDate(date: Date = DateUtils.getDateWithClockOffset()) {
		return date.toISOString().replace(/[:\-]|\.\d{3}/g, '');
	},

	getDateFromHeaderString(header: string) {
		const [, year, month, day, hour, minute, second] = header.match(
			/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2}).+/
		);

		return new Date(
			Date.UTC(
				Number(year),
				Number(month) - 1,
				Number(day),
				Number(hour),
				Number(minute),
				Number(second)
			)
		);
	},

	isClockSkewed(serverDate: Date) {
		// API gateway permits client calls that are off by no more than ±5 minutes
		return (
			Math.abs(
				serverDate.getTime() - DateUtils.getDateWithClockOffset().getTime()
			) >= FIVE_MINUTES_IN_MS
		);
	},

	isClockSkewError(error: any) {
		if (!error.response || !error.response.headers) {
			return false;
		}

		const { headers } = error.response;

		return Boolean(
			['BadRequestException', 'InvalidSignatureException'].includes(
				headers['x-amzn-errortype']
			) &&
				(headers.date || headers.Date)
		);
	},

	/**
	 * @param {number} offset Clock offset in milliseconds
	 */
	setClockOffset(offset: number) {
		DateUtils.clockOffset = offset;
	},
};

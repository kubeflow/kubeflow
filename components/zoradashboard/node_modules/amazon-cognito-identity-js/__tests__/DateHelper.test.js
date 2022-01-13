import DateHelper from '../src/DateHelper';

// DateHelper is a utility class that provides the date in "ddd MMM D HH:mm:ss UTC YYYY" format.
describe('getNowString()', () => {
	test('happy path should return the date "Tue Jan 1 06:06:09 UTC 2019" format', () => {
		const mockDate = new Date(1546322769000);
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
		const dateHelper = new DateHelper();
		expect(dateHelper.getNowString()).toEqual('Tue Jan 1 06:06:09 UTC 2019');
		jest.restoreAllMocks();
	});
});

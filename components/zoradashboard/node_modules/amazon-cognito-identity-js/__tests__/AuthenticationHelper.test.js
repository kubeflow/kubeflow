import AuthenticationHelper from '../src/AuthenticationHelper';

import BigInteger from '../src/BigInteger';
import { SHA256 } from 'crypto-js';
import { promisifyCallback } from './util';
import { bigIntError } from './constants';
const instance = new AuthenticationHelper('TestPoolName');

describe('AuthenticatorHelper for padHex ', () => {
	/*
	Test cases generated in Java with:

	import java.math.BigInteger;
	public class Main
	{
		private static final char[] HEX_ARRAY = '0123456789ABCDEF'.toCharArray();
		public static String bytesToHex(byte[] bytes) {
			char[] hexChars = new char[bytes.length * 2];
			for (int j = 0; j < bytes.length; j++) {
				int v = bytes[j] & 0xFF;
				hexChars[j * 2] = HEX_ARRAY[v >>> 4];
				hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0F];
			}
			return new String(hexChars);
		}
		public static void main(String[] args) {
			for(int i = -256; i <=256; i++) {
				byte arr[] = BigInteger.valueOf(i).toByteArray();
				System.out.println('[' + i +', '' + bytesToHex(arr) + ''],');
			}
		}
	}
	*/
	test.each([
		[-256, 'FF00'],
		[-255, 'FF01'],
		[-254, 'FF02'],
		[-253, 'FF03'],
		[-252, 'FF04'],
		[-251, 'FF05'],
		[-250, 'FF06'],
		[-249, 'FF07'],
		[-248, 'FF08'],
		[-247, 'FF09'],
		[-246, 'FF0A'],
		[-245, 'FF0B'],
		[-244, 'FF0C'],
		[-243, 'FF0D'],
		[-242, 'FF0E'],
		[-241, 'FF0F'],
		[-240, 'FF10'],
		[-239, 'FF11'],
		[-238, 'FF12'],
		[-237, 'FF13'],
		[-236, 'FF14'],
		[-235, 'FF15'],
		[-234, 'FF16'],
		[-233, 'FF17'],
		[-232, 'FF18'],
		[-231, 'FF19'],
		[-230, 'FF1A'],
		[-229, 'FF1B'],
		[-228, 'FF1C'],
		[-227, 'FF1D'],
		[-226, 'FF1E'],
		[-225, 'FF1F'],
		[-224, 'FF20'],
		[-223, 'FF21'],
		[-222, 'FF22'],
		[-221, 'FF23'],
		[-220, 'FF24'],
		[-219, 'FF25'],
		[-218, 'FF26'],
		[-217, 'FF27'],
		[-216, 'FF28'],
		[-215, 'FF29'],
		[-214, 'FF2A'],
		[-213, 'FF2B'],
		[-212, 'FF2C'],
		[-211, 'FF2D'],
		[-210, 'FF2E'],
		[-209, 'FF2F'],
		[-208, 'FF30'],
		[-207, 'FF31'],
		[-206, 'FF32'],
		[-205, 'FF33'],
		[-204, 'FF34'],
		[-203, 'FF35'],
		[-202, 'FF36'],
		[-201, 'FF37'],
		[-200, 'FF38'],
		[-199, 'FF39'],
		[-198, 'FF3A'],
		[-197, 'FF3B'],
		[-196, 'FF3C'],
		[-195, 'FF3D'],
		[-194, 'FF3E'],
		[-193, 'FF3F'],
		[-192, 'FF40'],
		[-191, 'FF41'],
		[-190, 'FF42'],
		[-189, 'FF43'],
		[-188, 'FF44'],
		[-187, 'FF45'],
		[-186, 'FF46'],
		[-185, 'FF47'],
		[-184, 'FF48'],
		[-183, 'FF49'],
		[-182, 'FF4A'],
		[-181, 'FF4B'],
		[-180, 'FF4C'],
		[-179, 'FF4D'],
		[-178, 'FF4E'],
		[-177, 'FF4F'],
		[-176, 'FF50'],
		[-175, 'FF51'],
		[-174, 'FF52'],
		[-173, 'FF53'],
		[-172, 'FF54'],
		[-171, 'FF55'],
		[-170, 'FF56'],
		[-169, 'FF57'],
		[-168, 'FF58'],
		[-167, 'FF59'],
		[-166, 'FF5A'],
		[-165, 'FF5B'],
		[-164, 'FF5C'],
		[-163, 'FF5D'],
		[-162, 'FF5E'],
		[-161, 'FF5F'],
		[-160, 'FF60'],
		[-159, 'FF61'],
		[-158, 'FF62'],
		[-157, 'FF63'],
		[-156, 'FF64'],
		[-155, 'FF65'],
		[-154, 'FF66'],
		[-153, 'FF67'],
		[-152, 'FF68'],
		[-151, 'FF69'],
		[-150, 'FF6A'],
		[-149, 'FF6B'],
		[-148, 'FF6C'],
		[-147, 'FF6D'],
		[-146, 'FF6E'],
		[-145, 'FF6F'],
		[-144, 'FF70'],
		[-143, 'FF71'],
		[-142, 'FF72'],
		[-141, 'FF73'],
		[-140, 'FF74'],
		[-139, 'FF75'],
		[-138, 'FF76'],
		[-137, 'FF77'],
		[-136, 'FF78'],
		[-135, 'FF79'],
		[-134, 'FF7A'],
		[-133, 'FF7B'],
		[-132, 'FF7C'],
		[-131, 'FF7D'],
		[-130, 'FF7E'],
		[-129, 'FF7F'],
		[-128, '80'],
		[-127, '81'],
		[-126, '82'],
		[-125, '83'],
		[-124, '84'],
		[-123, '85'],
		[-122, '86'],
		[-121, '87'],
		[-120, '88'],
		[-119, '89'],
		[-118, '8A'],
		[-117, '8B'],
		[-116, '8C'],
		[-115, '8D'],
		[-114, '8E'],
		[-113, '8F'],
		[-112, '90'],
		[-111, '91'],
		[-110, '92'],
		[-109, '93'],
		[-108, '94'],
		[-107, '95'],
		[-106, '96'],
		[-105, '97'],
		[-104, '98'],
		[-103, '99'],
		[-102, '9A'],
		[-101, '9B'],
		[-100, '9C'],
		[-99, '9D'],
		[-98, '9E'],
		[-97, '9F'],
		[-96, 'A0'],
		[-95, 'A1'],
		[-94, 'A2'],
		[-93, 'A3'],
		[-92, 'A4'],
		[-91, 'A5'],
		[-90, 'A6'],
		[-89, 'A7'],
		[-88, 'A8'],
		[-87, 'A9'],
		[-86, 'AA'],
		[-85, 'AB'],
		[-84, 'AC'],
		[-83, 'AD'],
		[-82, 'AE'],
		[-81, 'AF'],
		[-80, 'B0'],
		[-79, 'B1'],
		[-78, 'B2'],
		[-77, 'B3'],
		[-76, 'B4'],
		[-75, 'B5'],
		[-74, 'B6'],
		[-73, 'B7'],
		[-72, 'B8'],
		[-71, 'B9'],
		[-70, 'BA'],
		[-69, 'BB'],
		[-68, 'BC'],
		[-67, 'BD'],
		[-66, 'BE'],
		[-65, 'BF'],
		[-64, 'C0'],
		[-63, 'C1'],
		[-62, 'C2'],
		[-61, 'C3'],
		[-60, 'C4'],
		[-59, 'C5'],
		[-58, 'C6'],
		[-57, 'C7'],
		[-56, 'C8'],
		[-55, 'C9'],
		[-54, 'CA'],
		[-53, 'CB'],
		[-52, 'CC'],
		[-51, 'CD'],
		[-50, 'CE'],
		[-49, 'CF'],
		[-48, 'D0'],
		[-47, 'D1'],
		[-46, 'D2'],
		[-45, 'D3'],
		[-44, 'D4'],
		[-43, 'D5'],
		[-42, 'D6'],
		[-41, 'D7'],
		[-40, 'D8'],
		[-39, 'D9'],
		[-38, 'DA'],
		[-37, 'DB'],
		[-36, 'DC'],
		[-35, 'DD'],
		[-34, 'DE'],
		[-33, 'DF'],
		[-32, 'E0'],
		[-31, 'E1'],
		[-30, 'E2'],
		[-29, 'E3'],
		[-28, 'E4'],
		[-27, 'E5'],
		[-26, 'E6'],
		[-25, 'E7'],
		[-24, 'E8'],
		[-23, 'E9'],
		[-22, 'EA'],
		[-21, 'EB'],
		[-20, 'EC'],
		[-19, 'ED'],
		[-18, 'EE'],
		[-17, 'EF'],
		[-16, 'F0'],
		[-15, 'F1'],
		[-14, 'F2'],
		[-13, 'F3'],
		[-12, 'F4'],
		[-11, 'F5'],
		[-10, 'F6'],
		[-9, 'F7'],
		[-8, 'F8'],
		[-7, 'F9'],
		[-6, 'FA'],
		[-5, 'FB'],
		[-4, 'FC'],
		[-3, 'FD'],
		[-2, 'FE'],
		[-1, 'FF'],
		[0, '00'],
		[1, '01'],
		[2, '02'],
		[3, '03'],
		[4, '04'],
		[5, '05'],
		[6, '06'],
		[7, '07'],
		[8, '08'],
		[9, '09'],
		[10, '0A'],
		[11, '0B'],
		[12, '0C'],
		[13, '0D'],
		[14, '0E'],
		[15, '0F'],
		[16, '10'],
		[17, '11'],
		[18, '12'],
		[19, '13'],
		[20, '14'],
		[21, '15'],
		[22, '16'],
		[23, '17'],
		[24, '18'],
		[25, '19'],
		[26, '1A'],
		[27, '1B'],
		[28, '1C'],
		[29, '1D'],
		[30, '1E'],
		[31, '1F'],
		[32, '20'],
		[33, '21'],
		[34, '22'],
		[35, '23'],
		[36, '24'],
		[37, '25'],
		[38, '26'],
		[39, '27'],
		[40, '28'],
		[41, '29'],
		[42, '2A'],
		[43, '2B'],
		[44, '2C'],
		[45, '2D'],
		[46, '2E'],
		[47, '2F'],
		[48, '30'],
		[49, '31'],
		[50, '32'],
		[51, '33'],
		[52, '34'],
		[53, '35'],
		[54, '36'],
		[55, '37'],
		[56, '38'],
		[57, '39'],
		[58, '3A'],
		[59, '3B'],
		[60, '3C'],
		[61, '3D'],
		[62, '3E'],
		[63, '3F'],
		[64, '40'],
		[65, '41'],
		[66, '42'],
		[67, '43'],
		[68, '44'],
		[69, '45'],
		[70, '46'],
		[71, '47'],
		[72, '48'],
		[73, '49'],
		[74, '4A'],
		[75, '4B'],
		[76, '4C'],
		[77, '4D'],
		[78, '4E'],
		[79, '4F'],
		[80, '50'],
		[81, '51'],
		[82, '52'],
		[83, '53'],
		[84, '54'],
		[85, '55'],
		[86, '56'],
		[87, '57'],
		[88, '58'],
		[89, '59'],
		[90, '5A'],
		[91, '5B'],
		[92, '5C'],
		[93, '5D'],
		[94, '5E'],
		[95, '5F'],
		[96, '60'],
		[97, '61'],
		[98, '62'],
		[99, '63'],
		[100, '64'],
		[101, '65'],
		[102, '66'],
		[103, '67'],
		[104, '68'],
		[105, '69'],
		[106, '6A'],
		[107, '6B'],
		[108, '6C'],
		[109, '6D'],
		[110, '6E'],
		[111, '6F'],
		[112, '70'],
		[113, '71'],
		[114, '72'],
		[115, '73'],
		[116, '74'],
		[117, '75'],
		[118, '76'],
		[119, '77'],
		[120, '78'],
		[121, '79'],
		[122, '7A'],
		[123, '7B'],
		[124, '7C'],
		[125, '7D'],
		[126, '7E'],
		[127, '7F'],
		[128, '0080'],
		[129, '0081'],
		[130, '0082'],
		[131, '0083'],
		[132, '0084'],
		[133, '0085'],
		[134, '0086'],
		[135, '0087'],
		[136, '0088'],
		[137, '0089'],
		[138, '008A'],
		[139, '008B'],
		[140, '008C'],
		[141, '008D'],
		[142, '008E'],
		[143, '008F'],
		[144, '0090'],
		[145, '0091'],
		[146, '0092'],
		[147, '0093'],
		[148, '0094'],
		[149, '0095'],
		[150, '0096'],
		[151, '0097'],
		[152, '0098'],
		[153, '0099'],
		[154, '009A'],
		[155, '009B'],
		[156, '009C'],
		[157, '009D'],
		[158, '009E'],
		[159, '009F'],
		[160, '00A0'],
		[161, '00A1'],
		[162, '00A2'],
		[163, '00A3'],
		[164, '00A4'],
		[165, '00A5'],
		[166, '00A6'],
		[167, '00A7'],
		[168, '00A8'],
		[169, '00A9'],
		[170, '00AA'],
		[171, '00AB'],
		[172, '00AC'],
		[173, '00AD'],
		[174, '00AE'],
		[175, '00AF'],
		[176, '00B0'],
		[177, '00B1'],
		[178, '00B2'],
		[179, '00B3'],
		[180, '00B4'],
		[181, '00B5'],
		[182, '00B6'],
		[183, '00B7'],
		[184, '00B8'],
		[185, '00B9'],
		[186, '00BA'],
		[187, '00BB'],
		[188, '00BC'],
		[189, '00BD'],
		[190, '00BE'],
		[191, '00BF'],
		[192, '00C0'],
		[193, '00C1'],
		[194, '00C2'],
		[195, '00C3'],
		[196, '00C4'],
		[197, '00C5'],
		[198, '00C6'],
		[199, '00C7'],
		[200, '00C8'],
		[201, '00C9'],
		[202, '00CA'],
		[203, '00CB'],
		[204, '00CC'],
		[205, '00CD'],
		[206, '00CE'],
		[207, '00CF'],
		[208, '00D0'],
		[209, '00D1'],
		[210, '00D2'],
		[211, '00D3'],
		[212, '00D4'],
		[213, '00D5'],
		[214, '00D6'],
		[215, '00D7'],
		[216, '00D8'],
		[217, '00D9'],
		[218, '00DA'],
		[219, '00DB'],
		[220, '00DC'],
		[221, '00DD'],
		[222, '00DE'],
		[223, '00DF'],
		[224, '00E0'],
		[225, '00E1'],
		[226, '00E2'],
		[227, '00E3'],
		[228, '00E4'],
		[229, '00E5'],
		[230, '00E6'],
		[231, '00E7'],
		[232, '00E8'],
		[233, '00E9'],
		[234, '00EA'],
		[235, '00EB'],
		[236, '00EC'],
		[237, '00ED'],
		[238, '00EE'],
		[239, '00EF'],
		[240, '00F0'],
		[241, '00F1'],
		[242, '00F2'],
		[243, '00F3'],
		[244, '00F4'],
		[245, '00F5'],
		[246, '00F6'],
		[247, '00F7'],
		[248, '00F8'],
		[249, '00F9'],
		[250, '00FA'],
		[251, '00FB'],
		[252, '00FC'],
		[253, '00FD'],
		[254, '00FE'],
		[255, '00FF'],
		[256, '0100'],
	])('padHex(bigInteger.fromInt(%p))\t=== %p', (i, expected) => {
		const bigInt = new BigInteger();
		bigInt.fromInt(i);

		const x = instance.padHex(bigInt);
		expect(x.toLowerCase()).toBe(expected.toLowerCase());
	});
});

describe('Getters for AuthHelper class', () => {
	test('getSmallA() should match the instance variable', () => {
		expect(instance.getSmallAValue()).toBe(instance.smallAValue);
	});

	test('getRandomPassword() should match instance variable', () => {
		expect(instance.getRandomPassword()).toBe(instance.randomPassword);
	});

	test('getSaltDevices() should match instance variable SaltDevices', () => {
		expect(instance.getSaltDevices()).toBe(instance.SaltToHashDevices);
	});

	test('getVerifierDevices() should match instance variable verifierDevices', () => {
		expect(instance.getVerifierDevices()).toBe(instance.verifierDevices);
	});

	test('Constant prefix for new password challenge', () => {
		expect(
			instance.getNewPasswordRequiredChallengeUserAttributePrefix()
		).toEqual('userAttributes.');
	});
});

describe('getLargeAValue()', () => {
	afterAll(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	});

	instance.largeAValue = null;
	test('happy path should callback with a calculateA bigInt', async () => {
		const result = await promisifyCallback(instance, 'getLargeAValue');
		expect(result).toEqual(instance.largeAValue);
	});

	test('when largeAValue exists, getLargeA should return it', async () => {
		expect(instance.largeAValue).not.toBe(null);
		await promisifyCallback(instance, 'getLargeAValue').then(res => {
			expect(res).toEqual(instance.largeAValue);
		});
	});
	test('mock an error from calculate A', async () => {
		instance.largeAValue = null;
		jest
			.spyOn(AuthenticationHelper.prototype, 'calculateA')
			.mockImplementationOnce((...[, callback]) => {
				callback(bigIntError, null);
			});

		await promisifyCallback(instance, 'getLargeAValue').catch(e => {
			expect(e).toEqual(bigIntError);
		});

		//preserving invariant of largeAValue
		const cb = jest.fn();
		instance.getLargeAValue(cb);
	});
});

describe('generateRandomSmallA(), generateRandomString()', () => {
	test('Generate Random Small A is generating a BigInteger', () => {
		expect(instance.generateRandomSmallA()).toBeInstanceOf(BigInteger);
	});

	test('Ensure that generateRandomSmallA is non deterministic', () => {
		const firstSmallA = instance.generateRandomSmallA();
		const secondSmallA = instance.generateRandomSmallA();
		expect(firstSmallA).not.toEqual(secondSmallA);
	});

	test('Generate random strings', () => {
		//AuthHelper generates 40 randomBytes and convert it to a base64 string
		expect(instance.generateRandomString().length).toEqual(56);
	});

	test('Generate random strings is non-deterministic', () => {
		expect(instance.generateRandomString()).not.toEqual(
			instance.generateRandomString()
		);
	});
});

describe('generateHashDevice()', () => {
	test('happy path for generate hash devices should instantiate the verifierDevices of the instance', async () => {
		const deviceGroupKey = instance.generateRandomString();
		const username = instance.generateRandomString();

		expect(instance.getVerifierDevices()).toEqual(undefined);
		await promisifyCallback(
			instance,
			'generateHashDevice',
			deviceGroupKey,
			username
		);
		expect(instance.getVerifierDevices()).toEqual(instance.verifierDevices);
	});
	test('modPow throws an error', async () => {
		const deviceGroupKey = instance.generateRandomString();
		const username = instance.generateRandomString();

		jest
			.spyOn(BigInteger.prototype, 'modPow')
			.mockImplementationOnce((...args) => {
				args[2](bigIntError, null);
			});
		await promisifyCallback(
			instance,
			'generateHashDevice',
			deviceGroupKey,
			username
		).catch(e => {
			expect(e).toEqual(bigIntError);
		});
	});
});

describe('calculateA()', () => {
	const callback = jest.fn();

	afterEach(() => {
		callback.mockClear();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	test('Calculate A happy path', async () => {
		const result = await promisifyCallback(
			instance,
			'calculateA',
			instance.smallAValue
		);
		//length of the big integer
		expect(Object.keys(result).length).toEqual(223);
	});

	test('calculateA gets an error from g.modPow', async () => {
		jest
			.spyOn(BigInteger.prototype, 'modPow')
			.mockImplementationOnce((...[, , callback]) => {
				callback(bigIntError, null);
			});

		await promisifyCallback(instance, 'calculateA', instance.smallAValue).catch(
			e => {
				expect(e).toEqual(bigIntError);
			}
		);
	});

	test('A mod N equals BigInt 0 should throw an illegal parameter error', async () => {
		jest
			.spyOn(BigInteger.prototype, 'modPow')
			.mockImplementationOnce((...[, , callback]) => {
				callback(null, BigInteger.ZERO);
			});

		await promisifyCallback(instance, 'calculateA', instance.smallAValue).catch(
			e => {
				expect(e).toEqual(new Error('Illegal paramater. A mod N cannot be 0.'));
			}
		);
	});
});

describe('calculateU()', () => {
	test("Calculate the client's value U", () => {
		const hexA = new BigInteger('abcd1234', 16);
		const hexB = new BigInteger('deadbeef', 16);

		const hashed = instance.hexHash(
			instance.padHex(hexA) + instance.padHex(hexB)
		);
		const expected = new BigInteger(hashed, 16);
		const result = instance.calculateU(hexA, hexB);
		expect(expected).toEqual(result);
	});
});

describe('hexhash() and hash()', () => {
	test('Test hexHash function produces a valid hex string with regex', () => {
		const regEx = /[0-9a-f]/g;
		const hexStr = SHA256('testString').toString();
		expect(regEx.test(instance.hexHash(hexStr))).toBe(true);
	});

	test('Hashing a buffer returns a string', () => {
		const buf = Buffer.from('7468697320697320612074c3a97374', 'binary');
		expect(typeof instance.hash(buf)).toBe('string');
	});
});

describe('computehkdf()', () => {
	test('happy path hkdf algorithm returns a length 16 hex string', () => {
		const inputKey = Buffer.from('secretInputKey', 'ascii');
		const salt = Buffer.from('7468697320697320612074c3a97374', 'hex');
		const key = instance.computehkdf(inputKey, salt);
		expect(Object.keys(key).length).toEqual(16);
	});
});

describe('getPasswordAuthKey()', () => {
	const username = 'cognitoUser';
	const password = 'cognitoPassword';
	const badServerValue = BigInteger.ZERO;
	const realServerValue = new BigInteger('deadbeef', 16);
	const salt = new BigInteger('deadbeef', 16);

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	test('Happy path should computeHKDF', async () => {
		const result = await promisifyCallback(
			instance,
			'getPasswordAuthenticationKey',
			username,
			password,
			realServerValue,
			salt
		);
		expect(Object.keys(result).length).toEqual(16);
	});

	test('failing within calculateS callback', async () => {
		jest
			.spyOn(AuthenticationHelper.prototype, 'calculateS')
			.mockImplementationOnce((...[, , callback]) => {
				callback(bigIntError, null);
			});
		await promisifyCallback(
			instance,
			'getPasswordAuthenticationKey',
			username,
			password,
			realServerValue,
			salt
		).catch(e => {
			expect(e).toEqual(bigIntError);
		});
	});

	test('Getting a bad server value', async () => {
		await promisifyCallback(
			instance,
			'getPasswordAuthenticationKey',
			username,
			password,
			badServerValue,
			salt
		).catch(e => {
			expect(e).toEqual(new Error('B cannot be zero.'));
		});
	});

	test('Getting a U Value of zero', async () => {
		jest
			.spyOn(AuthenticationHelper.prototype, 'calculateU')
			.mockImplementationOnce(() => {
				return BigInteger.ZERO;
			});

		const realServerValue = new BigInteger('deadbeef', 16);
		await promisifyCallback(
			instance,
			'getPasswordAuthenticationKey',
			username,
			password,
			realServerValue,
			salt
		).catch(e => {
			expect(e).toEqual(new Error('U cannot be zero.'));
		});
	});
});

describe('calculateS()', () => {
	const xValue = new BigInteger('deadbeef', 16);
	const serverValue = new BigInteger('deadbeef', 16);

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('happy path should callback with null, and a bigInteger', async () => {
		instance.k = new BigInteger('deadbeef', 16);
		instance.UValue = instance.calculateU(instance.largeAValue, xValue);
		const result = await promisifyCallback(
			instance,
			'calculateS',
			xValue,
			serverValue
		);
		//length of the big integer
		expect(Object.keys(result).length).toEqual(113);
	});

	test('modPow throws an error ', async () => {
		jest
			.spyOn(BigInteger.prototype, 'modPow')
			.mockImplementationOnce((...args) => {
				args[2](bigIntError, null);
			});

		await promisifyCallback(instance, 'calculateS', xValue, serverValue).catch(
			e => {
				expect(e).toEqual(bigIntError);
			}
		);
	});

	test('second modPow throws an error ', async () => {
		// need to mock a working modPow to then fail in the second mock
		jest
			.spyOn(BigInteger.prototype, 'modPow')
			.mockImplementationOnce((...args) => {
				args[2](null, new BigInteger('deadbeef', 16));
			});
		jest
			.spyOn(BigInteger.prototype, 'modPow')
			.mockImplementationOnce((...args) => {
				args[2](bigIntError, null);
			});

		await promisifyCallback(instance, 'calculateS', xValue, serverValue).catch(
			e => {
				expect(e).toEqual(bigIntError);
			}
		);
	});
});

import CognitoUserAttribute from '../src/CognitoUserAttribute';
import { testName, testValue } from './constants';

const cognitoUserAttribute = new CognitoUserAttribute({
	Name: testName,
	Value: testValue,
});
describe('Getters and Setters', () => {
	test('Get value', () => {
		expect(cognitoUserAttribute.getValue()).toBe(testValue);
	});
	test('Get name', () => {
		expect(cognitoUserAttribute.getName()).toBe(testName);
	});

	test('Set value', () => {
		expect(cognitoUserAttribute.setValue('newValue').Value).toBe('newValue');
		cognitoUserAttribute.setValue(testValue);
	});
	test('Set name', () => {
		expect(cognitoUserAttribute.setName('newName').Name).toBe('newName');
		cognitoUserAttribute.setName(testName);
	});
});

describe('Testing different representation of CognitoUserAttrs', () => {
	test('toString method', () => {
		expect(cognitoUserAttribute.toString()).toEqual(
			'{"Name":"testName","Value":"testValue"}'
		);
	});

	test('toJSON method', () => {
		expect(cognitoUserAttribute.toJSON()).toEqual({
			Name: testName,
			Value: testValue,
		});
	});
});

describe('Testing constructor', () => {
	test('Undefined Name', () => {
		const undefinedCognitoName = new CognitoUserAttribute({ Value: testValue });
		expect(undefinedCognitoName.getName()).toBe('');
	});

	test('Undefined Value', () => {
		const undefinedCognitoValue = new CognitoUserAttribute({ Name: testName });
		expect(undefinedCognitoValue.getValue()).toBe('');
	});

	test('Undefined cognito attributes', () => {
		const undefinedCognitoAttr = new CognitoUserAttribute();
		expect(undefinedCognitoAttr.getValue()).toBe('');
		expect(undefinedCognitoAttr.getName()).toBe('');
	});
});

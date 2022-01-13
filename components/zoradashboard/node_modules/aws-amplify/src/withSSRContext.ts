import API from '@aws-amplify/api';
import { Auth } from '@aws-amplify/auth';
import { AmplifyClass, Credentials, UniversalStorage } from '@aws-amplify/core';
import { DataStore } from '@aws-amplify/datastore';

// ! We have to use this exact reference, since it gets mutated with Amplify.Auth
import { Amplify } from './index';

const requiredModules = [
	// API cannot function without Auth
	Auth,
	// Auth cannot function without Credentials
	Credentials,
];

// These modules have been tested with SSR
const defaultModules = [API, Auth, DataStore];

type Context = {
	req?: any;
	modules?: any[];
};

export function withSSRContext(context: Context = {}) {
	const { modules = defaultModules, req } = context;
	const previousConfig = Amplify.configure();
	const amplify = new AmplifyClass();
	const storage = new UniversalStorage({ req });

	requiredModules.forEach(m => {
		if (!modules.includes(m)) {
			// @ts-ignore This expression is not constructable.
			// Type 'Function' has no construct signatures.ts(2351)
			amplify.register(new m.constructor());
		}
	});

	// Associate new module instances with this amplify
	modules.forEach(m => {
		amplify.register(new m.constructor());
	});

	// Configure new Amplify instances with previous configuration
	amplify.configure({ ...previousConfig, storage });

	return amplify;
}

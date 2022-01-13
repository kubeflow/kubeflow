import { AmplifyConfig } from './types';
import { ConsoleLogger as Logger } from './Logger';

const logger = new Logger('Parser');

export const parseMobileHubConfig = (config): AmplifyConfig => {
	const amplifyConfig: AmplifyConfig = {};
	// Analytics
	if (config['aws_mobile_analytics_app_id']) {
		const Analytics = {
			AWSPinpoint: {
				appId: config['aws_mobile_analytics_app_id'],
				region: config['aws_mobile_analytics_app_region'],
			},
		};
		amplifyConfig.Analytics = Analytics;
	}

	// Auth
	if (config['aws_cognito_identity_pool_id'] || config['aws_user_pools_id']) {
		amplifyConfig.Auth = {
			userPoolId: config['aws_user_pools_id'],
			userPoolWebClientId: config['aws_user_pools_web_client_id'],
			region: config['aws_cognito_region'],
			identityPoolId: config['aws_cognito_identity_pool_id'],
			identityPoolRegion: config['aws_cognito_region'],
			mandatorySignIn: config['aws_mandatory_sign_in'] === 'enable',
		};
	}

	// Storage
	let storageConfig;
	if (config['aws_user_files_s3_bucket']) {
		storageConfig = {
			AWSS3: {
				bucket: config['aws_user_files_s3_bucket'],
				region: config['aws_user_files_s3_bucket_region'],
				dangerouslyConnectToHttpEndpointForTesting:
					config[
						'aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing'
					],
			},
		};
	} else {
		storageConfig = config ? config.Storage || config : {};
	}

	// Logging
	if (config['Logging']) {
		amplifyConfig.Logging = {
			...config['Logging'],
			region: config['aws_project_region'],
		};
	}

	amplifyConfig.Analytics = Object.assign(
		{},
		amplifyConfig.Analytics,
		config.Analytics
	);
	amplifyConfig.Auth = Object.assign({}, amplifyConfig.Auth, config.Auth);
	amplifyConfig.Storage = Object.assign({}, storageConfig);
	amplifyConfig.Logging = Object.assign(
		{},
		amplifyConfig.Logging,
		config.Logging
	);
	logger.debug('parse config', config, 'to amplifyconfig', amplifyConfig);
	return amplifyConfig;
};

/**
 * @deprecated use per-function export
 */
export class Parser {
	static parseMobilehubConfig = parseMobileHubConfig;
}

/**
 * @deprecated use per-function export
 */
export default Parser;

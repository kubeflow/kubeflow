import { Credentials, getAmplifyUserAgent } from '@aws-amplify/core';
import { AbstractInterpretPredictionsProvider } from '../types/Providers';

import {
	InterpretTextInput,
	InterpretTextOutput,
	InterpretTextCategories,
	TextEntities,
	TextSentiment,
	TextSyntax,
	KeyPhrases,
} from '../types';
import {
	ComprehendClient,
	DetectSyntaxCommand,
	DetectEntitiesCommand,
	DetectDominantLanguageCommand,
	DetectKeyPhrasesCommand,
	DetectSentimentCommand,
} from '@aws-sdk/client-comprehend';

export class AmazonAIInterpretPredictionsProvider extends AbstractInterpretPredictionsProvider {
	constructor() {
		super();
	}

	getProviderName() {
		return 'AmazonAIInterpretPredictionsProvider';
	}

	interpretText(input: InterpretTextInput): Promise<InterpretTextOutput> {
		return new Promise(async (res, rej) => {
			const credentials = await Credentials.get();
			if (!credentials) return rej('No credentials');
			const {
				interpretText: {
					region = '',
					defaults: { type: interpretTypeConfig = '' } = {},
				} = {},
			} = this._config;
			const {
				text: {
					source: { text = '' } = {},
					type: interpretType = interpretTypeConfig,
				} = {},
			} = ({} = input);

			const {
				text: { source: { language = undefined } = {} } = {},
			} = ({} = input as any); // language is only required for specific interpret types

			const comprehendClient = new ComprehendClient({
				credentials,
				region,
				customUserAgent: getAmplifyUserAgent(),
			});

			const doAll = interpretType === InterpretTextCategories.ALL;

			let languagePromise: Promise<string>;
			if (doAll || interpretType === InterpretTextCategories.LANGUAGE) {
				const languageDetectionParams = {
					Text: text,
				};
				languagePromise = this.detectLanguage(
					languageDetectionParams,
					comprehendClient
				);
			}

			let entitiesPromise: Promise<Array<TextEntities>>;
			if (doAll || interpretType === InterpretTextCategories.ENTITIES) {
				const LanguageCode = language || (await languagePromise);
				if (!LanguageCode) {
					return rej('language code is required on source for this selection');
				}
				const entitiesDetectionParams = {
					Text: text,
					LanguageCode,
				};
				entitiesPromise = this.detectEntities(
					entitiesDetectionParams,
					comprehendClient
				);
			}

			let sentimentPromise: Promise<TextSentiment>;
			if (doAll || interpretType === InterpretTextCategories.SENTIMENT) {
				const LanguageCode = language || (await languagePromise);
				if (!LanguageCode) {
					return rej('language code is required on source for this selection');
				}
				const sentimentParams = {
					Text: text,
					LanguageCode,
				};
				sentimentPromise = this.detectSentiment(
					sentimentParams,
					comprehendClient
				);
			}

			let syntaxPromise: Promise<Array<TextSyntax>>;
			if (doAll || interpretType === InterpretTextCategories.SYNTAX) {
				const LanguageCode = language || (await languagePromise);
				if (!LanguageCode) {
					return rej('language code is required on source for this selection');
				}
				const syntaxParams = {
					Text: text,
					LanguageCode,
				};
				syntaxPromise = this.detectSyntax(syntaxParams, comprehendClient);
			}

			let keyPhrasesPromise: Promise<Array<KeyPhrases>>;
			if (doAll || interpretType === InterpretTextCategories.KEY_PHRASES) {
				const LanguageCode = language || (await languagePromise);
				if (!LanguageCode) {
					return rej('language code is required on source for this selection');
				}
				const keyPhrasesParams = {
					Text: text,
					LanguageCode,
				};
				keyPhrasesPromise = this.detectKeyPhrases(
					keyPhrasesParams,
					comprehendClient
				);
			}
			try {
				const results = await Promise.all([
					languagePromise,
					entitiesPromise,
					sentimentPromise,
					syntaxPromise,
					keyPhrasesPromise,
				]);
				res({
					textInterpretation: {
						keyPhrases: results[4] || [],
						language: results[0] || '',
						sentiment: results[2],
						syntax: <TextSyntax[]>results[3] || [],
						textEntities: <TextEntities[]>results[1] || [],
					},
				});
			} catch (err) {
				rej(err);
			}
		});
	}

	private async detectKeyPhrases(
		params,
		comprehend
	): Promise<Array<KeyPhrases>> {
		try {
			const detectKeyPhrasesCommand = new DetectKeyPhrasesCommand(params);
			const data = await comprehend.send(detectKeyPhrasesCommand);
			const { KeyPhrases = [] } = data || {};
			return KeyPhrases.map(({ Text: text }) => {
				return { text };
			});
		} catch (err) {
			if (err.code === 'AccessDeniedException') {
				Promise.reject(
					'Not authorized, did you enable Interpret Text on predictions category Amplify CLI? try: ' +
						'amplify predictions add'
				);
			} else {
				Promise.reject(err.message);
			}
		}
	}

	private async detectSyntax(params, comprehend): Promise<Array<TextSyntax>> {
		try {
			const detectSyntaxCommand = new DetectSyntaxCommand(params);
			const data = await comprehend.send(detectSyntaxCommand);
			const { SyntaxTokens = [] } = data || {};
			return this.serializeSyntaxFromComprehend(SyntaxTokens);
		} catch (err) {
			if (err.code === 'AccessDeniedException') {
				Promise.reject(
					'Not authorized, did you enable Interpret Text on predictions category Amplify CLI? try: ' +
						'amplify predictions add'
				);
			} else {
				Promise.reject(err.message);
			}
		}
	}

	private serializeSyntaxFromComprehend(tokens): Array<TextSyntax> {
		let response = [];
		if (tokens && Array.isArray(tokens)) {
			response = tokens.map(
				({ Text: text = '', PartOfSpeech: { Tag: syntax = '' } = {} }) => {
					return { text, syntax };
				}
			);
		}
		return response;
	}

	private async detectSentiment(params, comprehend): Promise<TextSentiment> {
		try {
			const detectSentimentCommand = new DetectSentimentCommand(params);
			const data = await comprehend.send(detectSentimentCommand);
			const {
				Sentiment: predominant = '',
				SentimentScore: {
					Positive: positive = 0,
					Negative: negative = 0,
					Neutral: neutral = 0,
					Mixed: mixed = 0,
				} = {},
			} = ({} = data);
			return { predominant, positive, negative, neutral, mixed };
		} catch (err) {
			if (err.code === 'AccessDeniedException') {
				Promise.reject(
					'Not authorized, did you enable Interpret Text on predictions category Amplify CLI? try: ' +
						'amplify predictions add'
				);
			} else {
				Promise.reject(err.message);
			}
		}
	}

	private async detectEntities(
		params,
		comprehend
	): Promise<Array<TextEntities>> {
		try {
			const detectEntitiesCommand = new DetectEntitiesCommand(params);
			const data = await comprehend.send(detectEntitiesCommand);
			const { Entities = [] } = data || {};
			return this.serializeEntitiesFromComprehend(Entities);
		} catch (err) {
			if (err.code === 'AccessDeniedException') {
				Promise.reject(
					'Not authorized, did you enable Interpret Text on predictions category Amplify CLI? try: ' +
						'amplify predictions add'
				);
			} else {
				Promise.reject(err.message);
			}
		}
	}

	private serializeEntitiesFromComprehend(data): Array<TextEntities> {
		let response = [];
		if (data && Array.isArray(data)) {
			response = data.map(({ Type: type, Text: text }) => {
				return { type, text };
			});
		}
		return response;
	}

	private async detectLanguage(params, comprehend): Promise<string> {
		try {
			const detectDominantLanguageCommand = new DetectDominantLanguageCommand(
				params
			);
			const data = await comprehend.send(detectDominantLanguageCommand);
			const { Languages: [{ LanguageCode }] = [''] } = ({} = data || {});
			if (!LanguageCode) {
				Promise.reject('Language not detected');
			}
			return data.Languages[0].LanguageCode;
		} catch (err) {
			if (err.code === 'AccessDeniedException') {
				Promise.reject(
					'Not authorized, did you enable Interpret Text on predictions category Amplify CLI? try: ' +
						'amplify predictions add'
				);
			} else {
				Promise.reject(err.message);
			}
		}
	}
}

/**
 * @deprecated use named import
 */
export default AmazonAIInterpretPredictionsProvider;

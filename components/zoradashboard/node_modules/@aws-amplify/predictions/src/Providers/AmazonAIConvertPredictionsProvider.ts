import { AbstractConvertPredictionsProvider } from '../types/Providers/AbstractConvertPredictionsProvider';
import {
	TranslateClient,
	TranslateTextCommand,
} from '@aws-sdk/client-translate';
import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import {
	TranslateTextInput,
	TextToSpeechInput,
	SpeechToTextInput,
	TranslateTextOutput,
	TextToSpeechOutput,
	SpeechToTextOutput,
	isBytesSource,
} from '../types';
import {
	Credentials,
	ConsoleLogger as Logger,
	Signer,
	getAmplifyUserAgent,
} from '@aws-amplify/core';
import {
	EventStreamMarshaller,
	MessageHeaderValue,
} from '@aws-sdk/eventstream-marshaller';
import { fromUtf8, toUtf8 } from '@aws-sdk/util-utf8-node';

const logger = new Logger('AmazonAIConvertPredictionsProvider');
const eventBuilder = new EventStreamMarshaller(toUtf8, fromUtf8);

const LANGUAGES_CODE_IN_8KHZ = ['fr-FR', 'en-AU', 'en-GB', 'fr-CA'];

export class AmazonAIConvertPredictionsProvider extends AbstractConvertPredictionsProvider {
	private translateClient: TranslateClient;
	private pollyClient: PollyClient;
	constructor() {
		super();
	}

	getProviderName() {
		return 'AmazonAIConvertPredictionsProvider';
	}

	protected async translateText(
		input: TranslateTextInput
	): Promise<TranslateTextOutput> {
		logger.debug('Starting translation');
		const {
			translateText: {
				defaults: { sourceLanguage = '', targetLanguage = '' } = {},
				region = '',
			} = {},
		} = this._config;

		if (!region) {
			return Promise.reject('region not configured for transcription');
		}

		const credentials = await Credentials.get();
		if (!credentials) {
			return Promise.reject('No credentials');
		}
		const sourceLanguageCode =
			input.translateText.source.language || sourceLanguage;
		const targetLanguageCode =
			input.translateText.targetLanguage || targetLanguage;
		if (!sourceLanguageCode || !targetLanguageCode) {
			return Promise.reject('Please provide both source and target language');
		}

		this.translateClient = new TranslateClient({
			region,
			credentials,
			customUserAgent: getAmplifyUserAgent(),
		});
		const translateTextCommand = new TranslateTextCommand({
			SourceLanguageCode: sourceLanguageCode,
			TargetLanguageCode: targetLanguageCode,
			Text: input.translateText.source.text,
		});
		try {
			const data = await this.translateClient.send(translateTextCommand);
			return {
				text: data.TranslatedText,
				language: data.TargetLanguageCode,
			} as TranslateTextOutput;
		} catch (err) {
			return Promise.reject(err);
		}
	}

	protected async convertTextToSpeech(
		input: TextToSpeechInput
	): Promise<TextToSpeechOutput> {
		const credentials = await Credentials.get();
		if (!credentials) {
			return Promise.reject('No credentials');
		}
		const {
			speechGenerator: { defaults: { VoiceId = '' } = {}, region = '' } = {},
		} = this._config;

		if (!input.textToSpeech.source) {
			return Promise.reject('Source needs to be provided in the input');
		}
		const voiceId = input.textToSpeech.voiceId || VoiceId;

		if (!region) {
			return Promise.reject(
				'Region was undefined. Did you enable speech generator using amplify CLI?'
			);
		}

		if (!voiceId) {
			return Promise.reject('VoiceId was undefined.');
		}

		this.pollyClient = new PollyClient({
			region,
			credentials,
			customUserAgent: getAmplifyUserAgent(),
		});
		const synthesizeSpeechCommand = new SynthesizeSpeechCommand({
			OutputFormat: 'mp3',
			Text: input.textToSpeech.source.text,
			VoiceId: voiceId,
			TextType: 'text',
			SampleRate: '24000',
			// tslint:disable-next-line: align
		});
		try {
			const data = await this.pollyClient.send(synthesizeSpeechCommand);
			const response = new Response(data.AudioStream as ReadableStream);
			const arrayBuffer = await response.arrayBuffer();
			const blob = new Blob([arrayBuffer], {
				type: data.ContentType,
			});
			const url = URL.createObjectURL(blob);
			return {
				speech: { url },
				audioStream: arrayBuffer,
				text: input.textToSpeech.source.text,
			} as TextToSpeechOutput;
		} catch (err) {
			return Promise.reject(err);
		}
	}

	protected async convertSpeechToText(
		input: SpeechToTextInput
	): Promise<SpeechToTextOutput> {
		try {
			logger.debug('starting transcription..');
			const credentials = await Credentials.get();
			if (!credentials) {
				return Promise.reject('No credentials');
			}
			const {
				transcription: {
					defaults: { language: languageCode = '' } = {},
					region = '',
				} = {},
			} = this._config;
			if (!region) {
				return Promise.reject('region not configured for transcription');
			}
			if (!languageCode) {
				return Promise.reject(
					'languageCode not configured or provided for transcription'
				);
			}
			const {
				transcription: { source, language = languageCode },
			} = input;

			if (isBytesSource(source)) {
				const connection = await this.openConnectionWithTranscribe({
					credentials,
					region,
					languageCode: language,
				});

				try {
					const fullText = await this.sendDataToTranscribe({
						connection,
						raw: source.bytes,
						languageCode: language,
					});
					return {
						transcription: {
							fullText,
						},
					};
				} catch (err) {
					return Promise.reject(err);
				}
			}

			return Promise.reject(
				'Source types other than byte source are not supported.'
			);
		} catch (err) {
			return Promise.reject(err.name + ': ' + err.message);
		}
	}

	public static serializeDataFromTranscribe(message) {
		let decodedMessage = '';
		const transcribeMessage = eventBuilder.unmarshall(
			Buffer.from(message.data)
		);
		const transcribeMessageJson = JSON.parse(toUtf8(transcribeMessage.body));
		if (transcribeMessage.headers[':message-type'].value === 'exception') {
			logger.debug(
				'exception',
				JSON.stringify(transcribeMessageJson.Message, null, 2)
			);
			throw new Error(transcribeMessageJson.Message);
		} else if (transcribeMessage.headers[':message-type'].value === 'event') {
			if (transcribeMessageJson.Transcript.Results.length > 0) {
				if (
					transcribeMessageJson.Transcript.Results[0].Alternatives.length > 0
				) {
					if (
						transcribeMessageJson.Transcript.Results[0].Alternatives[0]
							.Transcript.length > 0
					) {
						if (
							transcribeMessageJson.Transcript.Results[0].IsPartial === false
						) {
							decodedMessage =
								transcribeMessageJson.Transcript.Results[0].Alternatives[0]
									.Transcript + '\n';
							logger.debug({ decodedMessage });
						} else {
							logger.debug({
								transcript:
									transcribeMessageJson.Transcript.Results[0].Alternatives[0],
							});
						}
					}
				}
			}
		}
		return decodedMessage;
	}

	private sendDataToTranscribe({
		connection,
		raw,
		languageCode,
	}): Promise<string> {
		return new Promise((res, rej) => {
			let fullText = '';
			connection.onmessage = message => {
				try {
					const decodedMessage = AmazonAIConvertPredictionsProvider.serializeDataFromTranscribe(
						message
					);
					if (decodedMessage) {
						fullText += decodedMessage + ' ';
					}
				} catch (err) {
					logger.debug(err);
					rej(err.message);
				}
			};

			connection.onerror = errorEvent => {
				logger.debug({ errorEvent });
				rej('failed to transcribe, network error');
			};

			connection.onclose = closeEvent => {
				logger.debug({ closeEvent });
				return res(fullText.trim());
			};

			logger.debug({ raw });

			if (Array.isArray(raw)) {
				for (let i = 0; i < raw.length - 1023; i += 1024) {
					const data = raw.slice(i, i + 1024);
					this.sendEncodedDataToTranscribe(connection, data, languageCode);
				}
			} else {
				// If Buffer
				this.sendEncodedDataToTranscribe(connection, raw, languageCode);
			}

			// sending end frame
			const endFrameEventMessage = this.getAudioEventMessage(Buffer.from([]));
			const endFrameBinary = eventBuilder.marshall(endFrameEventMessage);
			connection.send(endFrameBinary);
		});
	}

	private sendEncodedDataToTranscribe(connection, data, languageCode) {
		const downsampledBuffer = this.downsampleBuffer({
			buffer: data,
			outputSampleRate: LANGUAGES_CODE_IN_8KHZ.includes(languageCode)
				? 8000
				: 16000,
		});
		const pcmEncodedBuffer = this.pcmEncode(downsampledBuffer);
		const audioEventMessage = this.getAudioEventMessage(
			Buffer.from(pcmEncodedBuffer)
		);
		const binary = eventBuilder.marshall(audioEventMessage);
		connection.send(binary);
	}

	private getAudioEventMessage(buffer) {
		const audioEventMessage = {
			body: buffer as Uint8Array,
			headers: {
				':message-type': {
					type: 'string',
					value: 'event',
				} as MessageHeaderValue,
				':event-type': {
					type: 'string',
					value: 'AudioEvent',
				} as MessageHeaderValue,
			},
		};

		return audioEventMessage;
	}

	private pcmEncode(input) {
		let offset = 0;
		const buffer = new ArrayBuffer(input.length * 2);
		const view = new DataView(buffer);
		for (let i = 0; i < input.length; i++, offset += 2) {
			const s = Math.max(-1, Math.min(1, input[i]));
			view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
		}
		return buffer;
	}

	private inputSampleRate = 44100;

	private downsampleBuffer({ buffer, outputSampleRate = 16000 }) {
		if (outputSampleRate === this.inputSampleRate) {
			return buffer;
		}

		const sampleRateRatio = this.inputSampleRate / outputSampleRate;
		const newLength = Math.round(buffer.length / sampleRateRatio);
		const result = new Float32Array(newLength);
		let offsetResult = 0;
		let offsetBuffer = 0;
		while (offsetResult < result.length) {
			const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
			let accum = 0,
				count = 0;
			for (
				let i = offsetBuffer;
				i < nextOffsetBuffer && i < buffer.length;
				i++
			) {
				accum += buffer[i];
				count++;
			}
			result[offsetResult] = accum / count;
			offsetResult++;
			offsetBuffer = nextOffsetBuffer;
		}

		return result;
	}

	private openConnectionWithTranscribe({
		credentials: userCredentials,
		region,
		languageCode,
	}): Promise<WebSocket> {
		return new Promise(async (res, rej) => {
			const {
				accessKeyId: access_key,
				secretAccessKey: secret_key,
				sessionToken: session_token,
			} = userCredentials;

			const credentials = {
				access_key,
				secret_key,
				session_token,
			};

			const signedUrl = this.generateTranscribeUrl({
				credentials,
				region,
				languageCode,
			});

			logger.debug('connecting...');
			const connection = new WebSocket(signedUrl);

			connection.binaryType = 'arraybuffer';
			connection.onopen = () => {
				logger.debug('connected');
				res(connection);
			};
		});
	}

	private generateTranscribeUrl({ credentials, region, languageCode }): string {
		const url = [
			`wss://transcribestreaming.${region}.amazonaws.com:8443`,
			'/stream-transcription-websocket?',
			`media-encoding=pcm&`,
			`sample-rate=${
				LANGUAGES_CODE_IN_8KHZ.includes(languageCode) ? '8000' : '16000'
			}&`,
			`language-code=${languageCode}`,
		].join('');

		const signedUrl = Signer.signUrl(
			url,
			credentials,
			{ region, service: 'transcribe' },
			300
		);

		return signedUrl;
	}
}

/**
 * @deprecated use named import
 */
export default AmazonAIConvertPredictionsProvider;

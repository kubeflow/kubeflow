import {
	TranslateTextInput,
	TextToSpeechInput,
	SpeechToTextInput,
	isTranslateTextInput,
	isTextToSpeechInput,
	isSpeechToTextInput,
	TranslateTextOutput,
	TextToSpeechOutput,
	SpeechToTextOutput,
} from '../Predictions';
import { AbstractPredictionsProvider } from './AbstractPredictionsProvider';
import { ConsoleLogger as Logger } from '@aws-amplify/core';
const logger = new Logger('AbstractConvertPredictionsProvider');

export abstract class AbstractConvertPredictionsProvider extends AbstractPredictionsProvider {
	getCategory(): string {
		return 'Convert';
	}

	convert(
		input: TranslateTextInput | TextToSpeechInput | SpeechToTextInput
	): Promise<TextToSpeechOutput | TranslateTextOutput | SpeechToTextOutput> {
		if (isTranslateTextInput(input)) {
			logger.debug('translateText');
			return this.translateText(input);
		} else if (isTextToSpeechInput(input)) {
			logger.debug('textToSpeech');
			return this.convertTextToSpeech(input);
		} else if (isSpeechToTextInput(input)) {
			logger.debug('textToSpeech');
			return this.convertSpeechToText(input);
		}
	}

	protected translateText(
		translateTextInput: TranslateTextInput
	): Promise<TranslateTextOutput> {
		throw new Error('convertText is not implemented by this provider');
	}

	protected convertTextToSpeech(
		textToSpeechInput: TextToSpeechInput
	): Promise<TextToSpeechOutput> {
		throw new Error('convertTextToSpeech is not implemented by this provider');
	}

	protected convertSpeechToText(
		speechToTextInput: SpeechToTextInput
	): Promise<SpeechToTextOutput> {
		throw new Error('convertSpeechToText is not implemented by this provider');
	}
}

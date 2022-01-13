import { AbstractPredictionsProvider } from '../types/Providers';
import { AmazonAIConvertPredictionsProvider } from './AmazonAIConvertPredictionsProvider';
import { AmazonAIInterpretPredictionsProvider } from './AmazonAIInterpretPredictionsProvider';
import { AmazonAIIdentifyPredictionsProvider } from './AmazonAIIdentifyPredictionsProvider';
import {
	TranslateTextInput,
	TextToSpeechInput,
	SpeechToTextInput,
	PredictionsOptions,
	IdentifyTextInput,
	IdentifyTextOutput,
	IdentifyLabelsInput,
	IdentifyLabelsOutput,
	IdentifyEntitiesInput,
	IdentifyEntitiesOutput,
	TranslateTextOutput,
	TextToSpeechOutput,
	SpeechToTextOutput,
	InterpretTextInput,
	InterpretTextOutput,
} from '../types';

export class AmazonAIPredictionsProvider extends AbstractPredictionsProvider {
	private convertProvider: AmazonAIConvertPredictionsProvider;
	private identifyProvider: AmazonAIIdentifyPredictionsProvider;
	private interpretProvider: AmazonAIInterpretPredictionsProvider;

	constructor() {
		super();
		this.convertProvider = new AmazonAIConvertPredictionsProvider();
		this.identifyProvider = new AmazonAIIdentifyPredictionsProvider();
		this.interpretProvider = new AmazonAIInterpretPredictionsProvider();
	}

	getCategory(): string {
		return 'Predictions';
	}

	getProviderName(): string {
		return 'AmazonAIPredictionsProvider';
	}

	configure(config: PredictionsOptions) {
		this.convertProvider.configure(config.convert);
		this.identifyProvider.configure(config.identify);
		this.interpretProvider.configure(config.interpret);
		return config;
	}

	interpret(input: InterpretTextInput): Promise<InterpretTextOutput> {
		return this.interpretProvider.interpret(input);
	}

	convert(
		input: TranslateTextInput | TextToSpeechInput | SpeechToTextInput
	): Promise<TextToSpeechOutput | TranslateTextOutput | SpeechToTextOutput> {
		return this.convertProvider.convert(input);
	}

	identify(
		input: IdentifyTextInput | IdentifyLabelsInput | IdentifyEntitiesInput
	): Promise<
		IdentifyTextOutput | IdentifyLabelsOutput | IdentifyEntitiesOutput
	> {
		return this.identifyProvider.identify(input);
	}
}

/**
 * @deprecated use named import
 */
export default AmazonAIPredictionsProvider;

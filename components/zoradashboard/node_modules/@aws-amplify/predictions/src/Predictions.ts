import {
	PredictionsOptions,
	TranslateTextInput,
	TranslateTextOutput,
	TextToSpeechInput,
	ProviderOptions,
	TextToSpeechOutput,
	SpeechToTextInput,
	SpeechToTextOutput,
	IdentifyTextInput,
	IdentifyTextOutput,
	IdentifyLabelsOutput,
	IdentifyLabelsInput,
	IdentifyEntitiesInput,
	IdentifyEntitiesOutput,
	InterpretTextOutput,
	InterpretTextInput,
} from './types';
import {
	AbstractConvertPredictionsProvider,
	AbstractIdentifyPredictionsProvider,
	AbstractInterpretPredictionsProvider,
	AbstractPredictionsProvider,
} from './types/Providers';
import { Amplify, ConsoleLogger as Logger } from '@aws-amplify/core';

const logger = new Logger('Predictions');

export class PredictionsClass {
	private _options: PredictionsOptions;

	private _convertPluggables: AbstractConvertPredictionsProvider[];
	private _identifyPluggables: AbstractIdentifyPredictionsProvider[];
	private _interpretPluggables: AbstractInterpretPredictionsProvider[];

	/**
	 * Initialize Predictions with AWS configurations
	 * @param {PredictionsOptions} options - Configuration object for Predictions
	 */
	constructor(options: PredictionsOptions) {
		this._options = options;
		this._convertPluggables = [];
		this._identifyPluggables = [];
		this._interpretPluggables = [];
	}

	public getModuleName() {
		return 'Predictions';
	}

	/**
	 * add plugin/pluggable into Predictions category
	 * @param {Object} pluggable - an instance of the plugin/pluggable
	 **/
	public addPluggable(pluggable: AbstractPredictionsProvider) {
		if (this.getPluggable(pluggable.getProviderName())) {
			throw new Error(
				`Pluggable with name ${pluggable.getProviderName()} has already been added.`
			);
		}
		let pluggableAdded: boolean = false;
		if (this.implementsConvertPluggable(pluggable)) {
			this._convertPluggables.push(pluggable);
			pluggableAdded = true;
		}
		if (this.implementsIdentifyPluggable(pluggable)) {
			this._identifyPluggables.push(pluggable);
			pluggableAdded = true;
		}
		if (this.implementsInterpretPluggable(pluggable)) {
			this._interpretPluggables.push(pluggable);
			pluggableAdded = true;
		}
		if (pluggableAdded) {
			this.configurePluggable(pluggable);
		}
	}

	/**
	 * Get the plugin object
	 * @param providerName - the name of the plugin
	 */
	public getPluggable(providerName: string): AbstractPredictionsProvider {
		const pluggable = this.getAllProviders().find(
			pluggable => pluggable.getProviderName() === providerName
		);
		if (pluggable === undefined) {
			logger.debug('No plugin found with providerName=>', providerName);
			return null;
		} else return pluggable;
	}

	/**
	 * Remove the plugin object
	 * @param providerName - the name of the plugin
	 */
	public removePluggable(providerName: string) {
		this._convertPluggables = this._convertPluggables.filter(
			pluggable => pluggable.getProviderName() !== providerName
		);
		this._identifyPluggables = this._identifyPluggables.filter(
			pluggable => pluggable.getProviderName() !== providerName
		);
		this._interpretPluggables = this._interpretPluggables.filter(
			pluggable => pluggable.getProviderName() !== providerName
		);
		return;
	}

	/**
	 * To make both top level providers and category level providers work with same interface and configuration
	 * this method duplicates Predictions config into parent level config (for top level provider) and
	 * category level config (such as convert, identify etc) and pass both to each provider.
	 */
	configure(options: PredictionsOptions) {
		let predictionsConfig = options ? options.predictions || options : {};
		predictionsConfig = { ...predictionsConfig, ...options };
		this._options = Object.assign({}, this._options, predictionsConfig);
		logger.debug('configure Predictions', this._options);
		this.getAllProviders().forEach(pluggable =>
			this.configurePluggable(pluggable)
		);
	}

	public interpret(
		input: InterpretTextInput,
		options?: ProviderOptions
	): Promise<InterpretTextOutput>;
	public interpret(
		input: InterpretTextInput,
		options?: ProviderOptions
	): Promise<InterpretTextOutput> {
		const pluggableToExecute = this.getPluggableToExecute(
			this._interpretPluggables,
			options
		);
		return pluggableToExecute.interpret(input);
	}

	public convert(
		input: TranslateTextInput,
		options?: ProviderOptions
	): Promise<TranslateTextOutput>;
	public convert(
		input: TextToSpeechInput,
		options?: ProviderOptions
	): Promise<TextToSpeechOutput>;
	public convert(
		input: SpeechToTextInput,
		options?: ProviderOptions
	): Promise<SpeechToTextOutput>;
	public convert(
		input: TranslateTextInput | TextToSpeechInput | SpeechToTextInput,
		options?: ProviderOptions
	): Promise<TranslateTextOutput | TextToSpeechOutput | SpeechToTextOutput> {
		const pluggableToExecute = this.getPluggableToExecute(
			this._convertPluggables,
			options
		);
		return pluggableToExecute.convert(input);
	}

	public identify(
		input: IdentifyTextInput,
		options?: ProviderOptions
	): Promise<IdentifyTextOutput>;
	public identify(
		input: IdentifyLabelsInput,
		options?: ProviderOptions
	): Promise<IdentifyLabelsOutput>;
	public identify(
		input: IdentifyEntitiesInput,
		options?: ProviderOptions
	): Promise<IdentifyEntitiesOutput>;
	public identify(
		input: IdentifyTextInput | IdentifyLabelsInput | IdentifyEntitiesInput,
		options: ProviderOptions
	): Promise<
		IdentifyTextOutput | IdentifyLabelsOutput | IdentifyEntitiesOutput
	> {
		const pluggableToExecute = this.getPluggableToExecute(
			this._identifyPluggables,
			options
		);
		return pluggableToExecute.identify(input);
	}

	// tslint:disable-next-line: max-line-length
	private getPluggableToExecute<T extends AbstractPredictionsProvider>(
		pluggables: T[],
		providerOptions: ProviderOptions
	): T {
		// Give preference to provider name first since it is more specific to this call, even if
		// there is only one provider configured to error out if the name provided is not the one matched.
		if (providerOptions && providerOptions.providerName) {
			return [...pluggables].find(
				pluggable =>
					pluggable.getProviderName() === providerOptions.providerName
			);
		} else {
			if (pluggables.length === 1) {
				return pluggables[0];
			} else {
				throw new Error(
					'More than one or no providers are configured, ' +
						'Either specify a provider name or configure exactly one provider'
				);
			}
		}
	}

	private getAllProviders() {
		return [
			...this._convertPluggables,
			...this._identifyPluggables,
			...this._interpretPluggables,
		];
	}

	private configurePluggable(pluggable: AbstractPredictionsProvider) {
		const categoryConfig = Object.assign(
			{},
			this._options['predictions'], // Parent predictions config for the top level provider
			this._options[pluggable.getCategory().toLowerCase()] // Actual category level config
		);
		pluggable.configure(categoryConfig);
	}

	private implementsConvertPluggable(
		obj: any
	): obj is AbstractConvertPredictionsProvider {
		return obj && typeof obj.convert === 'function';
	}

	private implementsIdentifyPluggable(
		obj: any
	): obj is AbstractIdentifyPredictionsProvider {
		return obj && typeof obj.identify === 'function';
	}

	private implementsInterpretPluggable(
		obj: any
	): obj is AbstractInterpretPredictionsProvider {
		return obj && typeof obj.interpret === 'function';
	}
}

export const Predictions = new PredictionsClass({});
Amplify.register(Predictions);

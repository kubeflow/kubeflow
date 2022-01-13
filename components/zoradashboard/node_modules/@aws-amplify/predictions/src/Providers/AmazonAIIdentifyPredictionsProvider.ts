import {
	Credentials,
	ConsoleLogger as Logger,
	getAmplifyUserAgent,
} from '@aws-amplify/core';
import Storage from '@aws-amplify/storage';
import { AbstractIdentifyPredictionsProvider } from '../types/Providers';
import {
	RekognitionClient,
	SearchFacesByImageCommand,
	DetectTextCommand,
	DetectTextCommandInput,
	DetectLabelsCommand,
	DetectLabelsCommandInput,
	DetectFacesCommand,
	DetectModerationLabelsCommand,
	DetectModerationLabelsCommandInput,
	RecognizeCelebritiesCommand,
} from '@aws-sdk/client-rekognition';
import {
	IdentifyLabelsInput,
	IdentifyLabelsOutput,
	IdentifySource,
	IdentifyEntitiesInput,
	IdentifyEntitiesOutput,
	isStorageSource,
	isFileSource,
	isBytesSource,
	IdentifyTextInput,
	IdentifyTextOutput,
	isIdentifyCelebrities,
	isIdentifyFromCollection,
	IdentifyFromCollection,
	FeatureTypes,
} from '../types';
import {
	Image,
	Document,
	TextDetectionList,
	BlockList,
} from '../types/AWSTypes';
import {
	TextractClient,
	DetectDocumentTextCommand,
	DetectDocumentTextCommandInput,
	AnalyzeDocumentCommand,
	AnalyzeDocumentCommandInput,
} from '@aws-sdk/client-textract';
import { makeCamelCase, makeCamelCaseArray, blobToArrayBuffer } from './Utils';
import {
	categorizeRekognitionBlocks,
	categorizeTextractBlocks,
} from './IdentifyTextUtils';

export class AmazonAIIdentifyPredictionsProvider extends AbstractIdentifyPredictionsProvider {
	private rekognitionClient: RekognitionClient;
	private textractClient: TextractClient;

	constructor() {
		super();
	}

	getProviderName() {
		return 'AmazonAIIdentifyPredictionsProvider';
	}

	/**
	 * Verify user input source and converts it into source object readable by Rekognition and Textract.
	 * Note that Rekognition and Textract use the same source interface, so we need not worry about types.
	 * @param {IdentifySource} source - User input source that directs to the object user wants
	 * to identify (storage, file, or bytes).
	 * @return {Promise<Image>} - Promise resolving to the converted source object.
	 */
	private configureSource(source: IdentifySource): Promise<Image> {
		return new Promise((res, rej) => {
			if (isStorageSource(source)) {
				const storageConfig = {
					level: source.level,
					identityId: source.identityId,
				};
				Storage.get(source.key, storageConfig)
					.then((url: string) => {
						const parser = /https:\/\/([a-zA-Z0-9%-_.]+)\.s3\.[A-Za-z0-9%-._~]+\/([a-zA-Z0-9%-._~/]+)\?/;
						const parsedURL = url.match(parser);
						if (parsedURL.length < 3) rej('Invalid S3 key was given.');
						res({
							S3Object: {
								Bucket: parsedURL[1],
								Name: decodeURIComponent(parsedURL[2]),
							},
						});
					})
					.catch(err => rej(err));
			} else if (isFileSource(source)) {
				blobToArrayBuffer(source.file)
					.then(buffer => {
						res({ Bytes: new Uint8Array(buffer) });
					})
					.catch(err => rej(err));
			} else if (isBytesSource(source)) {
				const bytes = source.bytes;
				if (bytes instanceof Blob) {
					blobToArrayBuffer(bytes)
						.then(buffer => {
							res({ Bytes: new Uint8Array(buffer) });
						})
						.catch(err => rej(err));
				}
				if (bytes instanceof ArrayBuffer || bytes instanceof Buffer) {
					res({ Bytes: new Uint8Array(bytes) } as Image);
				}
				// everything else can be directly passed to Rekognition / Textract.
				res({ Bytes: bytes } as Image);
			} else {
				rej('Input source is not configured correctly.');
			}
		});
	}

	/**
	 * Recognize text from real-world images and documents (plain text, forms and tables). Detects text in the input
	 * image and converts it into machine-readable text.
	 * @param {IdentifySource} source - Object containing the source image and feature types to analyze.
	 * @return {Promise<IdentifyTextOutput>} - Promise resolving to object containing identified texts.
	 */
	protected async identifyText(
		input: IdentifyTextInput
	): Promise<IdentifyTextOutput> {
		const credentials = await Credentials.get();
		if (!credentials) return Promise.reject('No credentials');
		const {
			identifyText: {
				region = '',
				defaults: { format: configFormat = 'PLAIN' } = {},
			} = {},
		} = this._config;
		this.rekognitionClient = new RekognitionClient({
			region,
			credentials,
			customUserAgent: getAmplifyUserAgent(),
		});
		this.textractClient = new TextractClient({
			region,
			credentials,
			customUserAgent: getAmplifyUserAgent(),
		});
		let inputDocument: Document;

		try {
			inputDocument = await this.configureSource(input.text.source);
		} catch (err) {
			return Promise.reject(err);
		}

		// get default value if format isn't specified in the input.
		const format = input.text.format || configFormat;
		const featureTypes: FeatureTypes = []; // structures we want to analyze (e.g. [TABLES, FORMS]).
		if (format === 'FORM' || format === 'ALL') featureTypes.push('FORMS');
		if (format === 'TABLE' || format === 'ALL') featureTypes.push('TABLES');

		if (featureTypes.length === 0) {
			/**
			 * Empty featureTypes indicates that we will identify plain text. We will use rekognition (suitable
			 * for everyday images but has 50 word limit) first and see if reaches its word limit. If it does, then
			 * we call textract and use the data that identify more words.
			 */
			const textractParam: DetectDocumentTextCommandInput = {
				Document: inputDocument,
			};
			const rekognitionParam: DetectTextCommandInput = {
				Image: inputDocument,
			};

			try {
				const detectTextCommand = new DetectTextCommand(rekognitionParam);
				const rekognitionData = await this.rekognitionClient.send(
					detectTextCommand
				);

				const rekognitionResponse = categorizeRekognitionBlocks(
					rekognitionData.TextDetections as TextDetectionList
				);
				if (rekognitionResponse.text.words.length < 50) {
					// did not hit the word limit, return the data
					return rekognitionResponse;
				}

				const detectDocumentTextCommand = new DetectDocumentTextCommand(
					textractParam
				);

				const { Blocks } = await this.textractClient.send(
					detectDocumentTextCommand
				);

				if (rekognitionData.TextDetections.length > Blocks.length) {
					return rekognitionResponse;
				}

				return categorizeTextractBlocks(Blocks as BlockList);
			} catch (err) {
				Promise.reject(err);
			}
		} else {
			const param: AnalyzeDocumentCommandInput = {
				Document: inputDocument,
				FeatureTypes: featureTypes,
			};

			try {
				const analyzeDocumentCommand = new AnalyzeDocumentCommand(param);
				const { Blocks } = await this.textractClient.send(
					analyzeDocumentCommand
				);
				return categorizeTextractBlocks(Blocks as BlockList);
			} catch (err) {
				return Promise.reject(err);
			}
		}
	}

	/**
	 * Identify instances of real world entities from an image and if it contains unsafe content.
	 * @param {IdentifyLabelsInput} input - Object containing the source image and entity type to identify.
	 * @return {Promise<IdentifyLabelsOutput>} - Promise resolving to an array of identified entities.
	 */
	protected async identifyLabels(
		input: IdentifyLabelsInput
	): Promise<IdentifyLabelsOutput> {
		try {
			const credentials = await Credentials.get();
			if (!credentials) return Promise.reject('No credentials');
			const {
				identifyLabels: {
					region = '',
					defaults: { type = 'LABELS' } = {},
				} = {},
			} = this._config;
			this.rekognitionClient = new RekognitionClient({
				region,
				credentials,
				customUserAgent: getAmplifyUserAgent(),
			});
			let inputImage: Image;
			await this.configureSource(input.labels.source)
				.then(data => {
					inputImage = data;
				})
				.catch(err => {
					return Promise.reject(err);
				});
			const param = { Image: inputImage };
			const servicePromises = [];

			// get default argument
			const entityType = input.labels.type || type;
			if (entityType === 'LABELS' || entityType === 'ALL') {
				servicePromises.push(this.detectLabels(param));
			}
			if (entityType === 'UNSAFE' || entityType === 'ALL') {
				servicePromises.push(this.detectModerationLabels(param));
			}

			return Promise.all(servicePromises)
				.then(data => {
					let identifyResult: IdentifyLabelsOutput = {};
					// concatenate resolved promises to a single object
					data.forEach(val => {
						identifyResult = { ...identifyResult, ...val };
					});
					return identifyResult;
				})
				.catch(err => Promise.reject(err));
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * Calls Rekognition.detectLabels and organizes the returned data.
	 * @param {DetectLabelsInput} param - parameter to be passed onto Rekognition
	 * @return {Promise<IdentifyLabelsOutput>} - Promise resolving to organized detectLabels response.
	 */
	private async detectLabels(
		param: DetectLabelsCommandInput
	): Promise<IdentifyLabelsOutput> {
		try {
			const detectLabelsCommand = new DetectLabelsCommand(param);
			const data = await this.rekognitionClient.send(detectLabelsCommand);
			if (!data.Labels) return { labels: null }; // no image was detected
			const detectLabelData = data.Labels.map(val => {
				const boxes = val.Instances
					? val.Instances.map(val => makeCamelCase(val.BoundingBox))
					: undefined;
				return {
					name: val.Name,
					boundingBoxes: boxes,
					metadata: {
						confidence: val.Confidence,
						parents: makeCamelCaseArray(val.Parents),
					},
				};
			});
			return { labels: detectLabelData };
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * Calls Rekognition.detectModerationLabels and organizes the returned data.
	 * @param {Rekognition.DetectLabelsRequest} param - Parameter to be passed onto Rekognition
	 * @return {Promise<IdentifyLabelsOutput>} - Promise resolving to organized detectModerationLabels response.
	 */
	private async detectModerationLabels(
		param: DetectModerationLabelsCommandInput
	): Promise<IdentifyLabelsOutput> {
		try {
			const detectModerationLabelsCommand = new DetectModerationLabelsCommand(
				param
			);
			const data = await this.rekognitionClient.send(
				detectModerationLabelsCommand
			);
			if (data.ModerationLabels.length !== 0) {
				return { unsafe: 'YES' };
			} else {
				return { unsafe: 'NO' };
			}
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * Identify faces within an image that is provided as input, and match faces from a collection
	 * or identify celebrities.
	 * @param {IdentifyEntityInput} input - object containing the source image and face match options.
	 * @return {Promise<IdentifyEntityOutput>} Promise resolving to identify results.
	 */
	protected async identifyEntities(
		input: IdentifyEntitiesInput
	): Promise<IdentifyEntitiesOutput> {
		const credentials = await Credentials.get();
		if (!credentials) return Promise.reject('No credentials');
		const {
			identifyEntities: {
				region = '',
				celebrityDetectionEnabled = false,
				defaults: {
					collectionId: collectionIdConfig = '',
					maxEntities: maxFacesConfig = 50,
				} = {},
			} = {},
		} = this._config;
		// default arguments

		this.rekognitionClient = new RekognitionClient({
			region,
			credentials,
			customUserAgent: getAmplifyUserAgent(),
		});
		let inputImage: Image;
		await this.configureSource(input.entities.source)
			.then(data => (inputImage = data))
			.catch(err => {
				return Promise.reject(err);
			});

		const param = { Attributes: ['ALL'], Image: inputImage };

		if (
			isIdentifyCelebrities(input.entities) &&
			input.entities.celebrityDetection
		) {
			if (!celebrityDetectionEnabled) {
				return Promise.reject(
					'Error: You have to enable celebrity detection first'
				);
			}
			try {
				const recognizeCelebritiesCommand = new RecognizeCelebritiesCommand(
					param
				);
				const data = await this.rekognitionClient.send(
					recognizeCelebritiesCommand
				);
				const faces = data.CelebrityFaces.map(celebrity => {
					return {
						boundingBox: makeCamelCase(celebrity.Face.BoundingBox),
						landmarks: makeCamelCaseArray(celebrity.Face.Landmarks),
						metadata: {
							...makeCamelCase(celebrity, ['Id', 'Name', 'Urls']),
							pose: makeCamelCase(celebrity.Face.Pose),
						},
					};
				});
				return { entities: faces };
			} catch (err) {
				return Promise.reject(err);
			}
		} else if (
			isIdentifyFromCollection(input.entities) &&
			input.entities.collection
		) {
			const {
				collectionId = collectionIdConfig,
				maxEntities: maxFaces = maxFacesConfig,
			} = input.entities as IdentifyFromCollection;
			// Concatenate additional parameters
			const updatedParam = {
				...param,
				CollectionId: collectionId,
				MaxFaces: maxFaces,
			};
			try {
				const searchFacesByImageCommand = new SearchFacesByImageCommand(
					updatedParam
				);
				const data = await this.rekognitionClient.send(
					searchFacesByImageCommand
				);
				const faces = data.FaceMatches.map(val => {
					return {
						boundingBox: makeCamelCase(val.Face.BoundingBox),
						metadata: {
							externalImageId: this.decodeExternalImageId(
								val.Face.ExternalImageId
							),
							similarity: val.Similarity,
						},
					};
				});
				return { entities: faces };
			} catch (err) {
				return Promise.reject(err);
			}
		} else {
			try {
				const detectFacesCommand = new DetectFacesCommand(param);
				const data = await this.rekognitionClient.send(detectFacesCommand);
				const faces = data.FaceDetails.map(detail => {
					// face attributes keys we want to extract from Rekognition's response
					const attributeKeys = [
						'Smile',
						'Eyeglasses',
						'Sunglasses',
						'Gender',
						'Beard',
						'Mustache',
						'EyesOpen',
						'MouthOpen'
					];
					const faceAttributes = makeCamelCase(detail, attributeKeys);
					if (detail.Emotions) {
						faceAttributes['emotions'] = detail.Emotions.map(
							emotion => emotion.Type
						);
					}
					return {
						boundingBox: makeCamelCase(detail.BoundingBox),
						landmarks: makeCamelCaseArray(detail.Landmarks),
						ageRange: makeCamelCase(detail.AgeRange),
						attributes: faceAttributes,
						metadata: {
							confidence: detail.Confidence,
							pose: makeCamelCase(detail.Pose),
						},
					};
				});
				return { entities: faces };
			} catch (err) {
				return Promise.reject(err);
			}
		}
	}

	private decodeExternalImageId(externalImageId: string): string {
		return ('' + externalImageId).replace(/::/g, '/');
	}
}

/**
 * @deprecated use named import
 */
export default AmazonAIIdentifyPredictionsProvider;

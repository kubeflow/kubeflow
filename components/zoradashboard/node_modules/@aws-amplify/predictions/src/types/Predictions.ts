/**
 * Base types
 */
export interface PredictionsOptions {
	[key: string]: any;
}

export interface ProviderOptions {
	providerName?: string;
}

/**
 * Convert types
 */

export enum InterpretTextCategories {
	ALL = 'ALL',
	LANGUAGE = 'LANGUAGE',
	ENTITIES = 'ENTITIES',
	SENTIMENT = 'SENTIMENT',
	SYNTAX = 'SYNTAX',
	KEY_PHRASES = 'KEY_PHRASES',
}

export interface InterpretTextInput {
	text: InterpretTextInputLanguage | InterpretTextOthers | InterpretTextAll;
}

export interface InterpretTextInputLanguage {
	source: {
		text: string;
	};
	type: InterpretTextCategories.LANGUAGE;
}

export interface InterpretTextOthers {
	source: {
		text: string;
		language: string;
	};
	type:
		| InterpretTextCategories.ENTITIES
		| InterpretTextCategories.SENTIMENT
		| InterpretTextCategories.SYNTAX
		| InterpretTextCategories.KEY_PHRASES;
}

export interface InterpretTextAll {
	source: {
		text: string;
	};
	type: InterpretTextCategories.ALL;
}

export interface TextEntities {
	type: string;
	text: string;
}

export interface KeyPhrases {
	text: string;
}

export interface TextSyntax {
	text: string;
	syntax: string;
}

export interface TextSentiment {
	predominant: string;
	positive: number;
	negative: number;
	neutral: number;
	mixed: number;
}

export interface InterpretTextOutput {
	textInterpretation: {
		language?: string;
		textEntities?: Array<TextEntities>;
		keyPhrases?: Array<KeyPhrases>;
		sentiment?: TextSentiment;
		syntax?: Array<TextSyntax>;
	};
}

export interface TranslateTextInput {
	translateText: {
		source: {
			text: string;
			language?: string;
		};
		targetLanguage?: string;
	};
}

export interface TranslateTextOutput {
	text: string;
	language: string;
}

export interface TextToSpeechInput {
	textToSpeech: {
		source: {
			text: string;
		};
		terminology?: string;
		voiceId?: string;
	};
}

export interface TextToSpeechOutput {
	speech: { url: string };
	audioStream: Buffer;
	text: string;
}

export interface StorageSource {
	key: string;
	level?: 'public' | 'private' | 'protected';
	identityId?: string;
}

export interface FileSource {
	file: File;
}

export interface BytesSource {
	bytes: Buffer | ArrayBuffer | Blob | string;
}

export interface SpeechToTextInput {
	transcription: {
		source: BytesSource;
		language?: string;
	};
}

export interface SpeechToTextOutput {
	transcription: {
		fullText: string;
	};
}

export type IdentifySource = StorageSource | FileSource | BytesSource;

export interface IdentifyTextInput {
	text: {
		source: IdentifySource;
		format?: 'PLAIN' | 'FORM' | 'TABLE' | 'ALL';
	};
}

export interface Word {
	text?: string;
	polygon?: Polygon;
	boundingBox?: BoundingBox;
}

export interface LineDetailed {
	text?: string;
	polygon?: Polygon;
	boundingBox?: BoundingBox;
	page?: number;
}

export interface Content {
	text?: string;
	selected?: boolean;
}

export interface TableCell extends Content {
	boundingBox?: BoundingBox;
	polygon?: Polygon;
	rowSpan?: Number;
	columnSpan?: Number;
}

export interface Table {
	size: {
		rows: number;
		columns: number;
	};
	table: TableCell[][];
	polygon: Polygon;
	boundingBox: BoundingBox;
}

export interface KeyValue {
	key: string;
	value: Content;
	polygon: Polygon;
	boundingBox: BoundingBox;
}

export interface IdentifyTextOutput {
	text: {
		fullText: string;
		lines: string[];
		linesDetailed: LineDetailed[];
		words: Word[];
		keyValues?: KeyValue[];
		tables?: Table[];
		selections?: {
			selected: boolean;
			polygon: Polygon;
			boundingBox: BoundingBox;
		}[];
	};
}

export interface IdentifyLabelsInput {
	labels: {
		source: IdentifySource;
		type: 'LABELS' | 'UNSAFE' | 'ALL';
	};
}

export interface Point {
	x?: Number;
	y?: Number;
}

export type Polygon = Array<Point> | Iterable<Point>;

export interface BoundingBox {
	width?: Number;
	height?: Number;
	left?: Number;
	top?: Number;
}

export interface IdentifyLabelsOutput {
	labels?: {
		name: string;
		boundingBoxes: BoundingBox[];
		metadata?: Object;
	}[];
	unsafe?: 'YES' | 'NO' | 'UNKNOWN';
}

export interface IdentifyEntitiesInput {
	entities: IdentifyFromCollection | IdentifyCelebrities | IdentifyEntities;
}

export interface IdentifyFromCollection {
	source: IdentifySource;
	collection: true;
	collectionId?: string;
	maxEntities?: number;
}

export interface IdentifyCelebrities {
	source: IdentifySource;
	celebrityDetection: true;
}

export interface IdentifyEntities {
	source: IdentifySource;
}

export interface FaceAttributes {
	smile?: boolean;
	eyeglasses?: boolean;
	sunglasses?: boolean;
	gender?: string;
	beard?: boolean;
	mustache?: boolean;
	eyesOpen?: boolean;
	mouthOpen?: boolean;
	emotions?: string[];
}

export interface IdentifyEntitiesOutput {
	entities: {
		boundingBox?: BoundingBox;
		ageRange?: {
			low?: Number;
			high?: Number;
		};
		landmarks?: {
			type?: string;
			x?: number;
			y?: number;
		}[];
		attributes?: FaceAttributes;
		metadata?: object;
	}[];
}

export function isIdentifyFromCollection(
	obj: any
): obj is IdentifyFromCollection {
	const key: keyof IdentifyFromCollection = 'collection';
	const keyId: keyof IdentifyFromCollection = 'collectionId';
	return obj && (obj.hasOwnProperty(key) || obj.hasOwnProperty(keyId));
}

export function isIdentifyCelebrities(obj: any): obj is IdentifyCelebrities {
	const key: keyof IdentifyCelebrities = 'celebrityDetection';
	return obj && obj.hasOwnProperty(key);
}

export function isTranslateTextInput(obj: any): obj is TranslateTextInput {
	const key: keyof TranslateTextInput = 'translateText';
	return obj && obj.hasOwnProperty(key);
}

export function isTextToSpeechInput(obj: any): obj is TextToSpeechInput {
	const key: keyof TextToSpeechInput = 'textToSpeech';
	return obj && obj.hasOwnProperty(key);
}

export function isSpeechToTextInput(obj: any): obj is SpeechToTextInput {
	const key: keyof SpeechToTextInput = 'transcription';
	return obj && obj.hasOwnProperty(key);
}

export function isStorageSource(obj: any): obj is StorageSource {
	const key: keyof StorageSource = 'key';
	return obj && obj.hasOwnProperty(key);
}

export function isFileSource(obj: any): obj is FileSource {
	const key: keyof FileSource = 'file';
	return obj && obj.hasOwnProperty(key);
}

export function isBytesSource(obj: any): obj is BytesSource {
	const key: keyof BytesSource = 'bytes';
	return obj && obj.hasOwnProperty(key);
}

export function isIdentifyTextInput(obj: any): obj is IdentifyTextInput {
	const key: keyof IdentifyTextInput = 'text';
	return obj && obj.hasOwnProperty(key);
}

export function isIdentifyLabelsInput(obj: any): obj is IdentifyLabelsInput {
	const key: keyof IdentifyLabelsInput = 'labels';
	return obj && obj.hasOwnProperty(key);
}

export function isIdentifyEntitiesInput(
	obj: any
): obj is IdentifyEntitiesInput {
	const key: keyof IdentifyEntitiesInput = 'entities';
	return obj && obj.hasOwnProperty(key);
}

export function isInterpretTextInput(obj: any): obj is InterpretTextInput {
	const key: keyof InterpretTextInput = 'text';
	return obj && obj.hasOwnProperty(key);
}

export interface Geometry {
	/**
	 * <p>An axis-aligned coarse representation of the detected text's location on the image.</p>
	 */
	BoundingBox?: BoundingBox;

	/**
	 * <p>Within the bounding box, a fine-grained polygon around the detected text.</p>
	 */
	Polygon?: Array<Point> | Iterable<Point>;
}

export interface Relationship {
	/**
	 * <p>The type of relationship that the blocks in the IDs array have with the current block. The relationship can be <code>VALUE</code> or <code>CHILD</code>.</p>
	 */
	Type?: 'VALUE' | 'CHILD' | string;

	/**
	 * <p>An array of IDs for related blocks. You can get the type of the relationship from the <code>Type</code> element.</p>
	 */
	Ids?: Array<string> | Iterable<string>;
}

export type FeatureType = 'TABLES' | 'FORMS' | string;
export type FeatureTypes = FeatureType[];

import { Geometry, Relationship } from './Predictions';

export type BlockList = Block[];
export interface Block {
	/**
	 * <p>The type of text that's recognized in a block. In text-detection operations, the following types are returned:</p> <ul> <li> <p> <i>PAGE</i> - Contains a list of the LINE Block objects that are detected on a document page.</p> </li> <li> <p> <i>WORD</i> - A word detected on a document page. A word is one or more ISO basic Latin script characters that aren't separated by spaces.</p> </li> <li> <p> <i>LINE</i> - A string of tab-delimited, contiguous words that's detected on a document page.</p> </li> </ul> <p>In text analysis operations, the following types are returned:</p> <ul> <li> <p> <i>PAGE</i> - Contains a list of child Block objects that are detected on a document page.</p> </li> <li> <p> <i>KEY_VALUE_SET</i> - Stores the KEY and VALUE Block objects for a field that's detected on a document page. Use the <code>EntityType</code> field to determine if a KEY_VALUE_SET object is a KEY Block object or a VALUE Block object. </p> </li> <li> <p> <i>WORD</i> - A word detected on a document page. A word is one or more ISO basic Latin script characters that aren't separated by spaces that's detected on a document page.</p> </li> <li> <p> <i>LINE</i> - A string of tab-delimited, contiguous words that's detected on a document page.</p> </li> <li> <p> <i>TABLE</i> - A table that's detected on a document page. A table is any grid-based information with 2 or more rows or columns with a cell span of 1 row and 1 column each. </p> </li> <li> <p> <i>CELL</i> - A cell within a detected table. The cell is the parent of the block that contains the text in the cell.</p> </li> <li> <p> <i>SELECTION_ELEMENT</i> - A selectable element such as a radio button or checkbox that's detected on a document page. Use the value of <code>SelectionStatus</code> to determine the status of the selection element.</p> </li> </ul>
	 */
	BlockType?:
		| 'KEY_VALUE_SET'
		| 'PAGE'
		| 'LINE'
		| 'WORD'
		| 'TABLE'
		| 'CELL'
		| 'SELECTION_ELEMENT'
		| string;

	/**
	 * <p>The confidence that Amazon Textract has in the accuracy of the recognized text and the accuracy of the geometry points around the recognized text.</p>
	 */
	Confidence?: number;

	/**
	 * <p>The word or line of text that's recognized by Amazon Textract. </p>
	 */
	Text?: string;

	/**
	 * <p>The row in which a table cell is located. The first row position is 1. <code>RowIndex</code> isn't returned by <code>DetectDocumentText</code> and <code>GetDocumentTextDetection</code>.</p>
	 */
	RowIndex?: number;

	/**
	 * <p>The column in which a table cell appears. The first column position is 1. <code>ColumnIndex</code> isn't returned by <code>DetectDocumentText</code> and <code>GetDocumentTextDetection</code>.</p>
	 */
	ColumnIndex?: number;

	/**
	 * <p>The number of rows that a table spans. <code>RowSpan</code> isn't returned by <code>DetectDocumentText</code> and <code>GetDocumentTextDetection</code>.</p>
	 */
	RowSpan?: number;

	/**
	 * <p>The number of columns that a table cell spans. <code>ColumnSpan</code> isn't returned by <code>DetectDocumentText</code> and <code>GetDocumentTextDetection</code>. </p>
	 */
	ColumnSpan?: number;

	/**
	 * <p>The location of the recognized text on the image. It includes an axis-aligned, coarse bounding box that surrounds the text, and a finer-grain polygon for more accurate spatial information. </p>
	 */
	Geometry?: Geometry;

	/**
	 * <p>The identifier for the recognized text. The identifier is only unique for a single operation. </p>
	 */
	Id?: string;

	/**
	 * <p>A list of child blocks of the current block. For example a LINE object has child blocks for each WORD block that's part of the line of text. There aren't Relationship objects in the list for relationships that don't exist, such as when the current block has no child blocks. The list size can be the following:</p> <ul> <li> <p>0 - The block has no child blocks.</p> </li> <li> <p>1 - The block has child blocks.</p> </li> </ul>
	 */
	Relationships?: Array<Relationship> | Iterable<Relationship>;

	/**
	 * <p>The type of entity. The following can be returned:</p> <ul> <li> <p> <i>KEY</i> - An identifier for a field on the document.</p> </li> <li> <p> <i>VALUE</i> - The field text.</p> </li> </ul> <p> <code>EntityTypes</code> isn't returned by <code>DetectDocumentText</code> and <code>GetDocumentTextDetection</code>.</p>
	 */
	EntityTypes?:
		| Array<'KEY' | 'VALUE' | string>
		| Iterable<'KEY' | 'VALUE' | string>;

	/**
	 * <p>The selection status of a selectable element such as a radio button or checkbox. </p>
	 */
	SelectionStatus?: 'SELECTED' | 'NOT_SELECTED' | string;

	/**
	 * <p>The page in which a block was detected. <code>Page</code> is returned by asynchronous operations. Page values greater than 1 are only returned for multi-page documents that are in PDF format. A scanned image (JPG/PNG), even if it contains multiple document pages, is always considered to be a single-page document and the value of <code>Page</code> is always 1. Synchronous operations don't return <code>Page</code> as every input document is considered to be a single-page document.</p>
	 */
	Page?: number;
}

export type TextDetectionList = TextDetection[];

export interface TextDetection {
	/**
	 * <p>The word or line of text recognized by Amazon Rekognition. </p>
	 */
	DetectedText?: string;

	/**
	 * <p>The type of text that was detected.</p>
	 */
	Type?: 'LINE' | 'WORD' | string;

	/**
	 * <p>The identifier for the detected text. The identifier is only unique for a single call to <code>DetectText</code>. </p>
	 */
	Id?: number;

	/**
	 * <p>The Parent identifier for the detected text identified by the value of <code>ID</code>. If the type of detected text is <code>LINE</code>, the value of <code>ParentId</code> is <code>Null</code>. </p>
	 */
	ParentId?: number;

	/**
	 * <p>The confidence that Amazon Rekognition has in the accuracy of the detected text and the accuracy of the geometry points around the detected text.</p>
	 */
	Confidence?: number;

	/**
	 * <p>The location of the detected text on the image. Includes an axis aligned coarse bounding box surrounding the text and a finer grain polygon for more accurate spatial information.</p>
	 */
	Geometry?: Geometry;
}

export interface Image {
	/**
	 * <p>Blob of image bytes up to 5 MBs.</p>
	 */
	Bytes?: Uint8Array;

	/**
	 * <p>Identifies an S3 object as the image source.</p>
	 */
	S3Object?: S3Object;
}

export type ImageBlob = Buffer | Uint8Array | Blob | string;
export type S3Bucket = string;
export interface S3Object {
	/**
	 * Name of the S3 bucket.
	 */
	Bucket?: S3Bucket;
	/**
	 * S3 object key name.
	 */
	Name?: S3ObjectName;
	/**
	 * If the bucket is versioning enabled, you can specify the object version.
	 */
	Version?: S3ObjectVersion;
}
export type S3ObjectName = string;
export type S3ObjectVersion = string;

/**
 * <p>The input document, either as bytes or as an S3 object.</p> <p>You pass image bytes to an Amazon Textract API operation by using the <code>Bytes</code> property. For example, you would use the <code>Bytes</code> property to pass a document loaded from a local file system. Image bytes passed by using the <code>Bytes</code> property must be base64 encoded. Your code might not need to encode document file bytes if you're using an AWS SDK to call Amazon Textract API operations. </p> <p>You pass images stored in an S3 bucket to an Amazon Textract API operation by using the <code>S3Object</code> property. Documents stored in an S3 bucket don't need to be base64 encoded.</p> <p>The AWS Region for the S3 bucket that contains the S3 object must match the AWS Region that you use for Amazon Textract operations.</p> <p>If you use the AWS CLI to call Amazon Textract operations, passing image bytes using the Bytes property isn't supported. You must first upload the document to an Amazon S3 bucket, and then call the operation using the S3Object property.</p> <p>For Amazon Textract to process an S3 object, the user must have permission to access the S3 object. </p>
 */
export interface Document {
	/**
	 * <p>A blob of base-64 encoded documents bytes. The maximum size of a document that's provided in a blob of bytes is 5 MB. The document bytes must be in PNG or JPG format.</p> <p>If you are using an AWS SDK to call Amazon Textract, you might not need to base64-encode image bytes passed using the <code>Bytes</code> field. </p>
	 */
	Bytes?: Uint8Array;

	/**
	 * <p>Identifies an S3 object as the document source. The maximum size of a document stored in an S3 bucket is 5 MB.</p>
	 */
	S3Object?: S3Object;
}

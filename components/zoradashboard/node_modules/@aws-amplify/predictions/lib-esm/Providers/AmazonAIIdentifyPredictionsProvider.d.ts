import { AbstractIdentifyPredictionsProvider } from '../types/Providers';
import { IdentifyLabelsInput, IdentifyLabelsOutput, IdentifyEntitiesInput, IdentifyEntitiesOutput, IdentifyTextInput, IdentifyTextOutput } from '../types';
export declare class AmazonAIIdentifyPredictionsProvider extends AbstractIdentifyPredictionsProvider {
    private rekognitionClient;
    private textractClient;
    constructor();
    getProviderName(): string;
    /**
     * Verify user input source and converts it into source object readable by Rekognition and Textract.
     * Note that Rekognition and Textract use the same source interface, so we need not worry about types.
     * @param {IdentifySource} source - User input source that directs to the object user wants
     * to identify (storage, file, or bytes).
     * @return {Promise<Image>} - Promise resolving to the converted source object.
     */
    private configureSource;
    /**
     * Recognize text from real-world images and documents (plain text, forms and tables). Detects text in the input
     * image and converts it into machine-readable text.
     * @param {IdentifySource} source - Object containing the source image and feature types to analyze.
     * @return {Promise<IdentifyTextOutput>} - Promise resolving to object containing identified texts.
     */
    protected identifyText(input: IdentifyTextInput): Promise<IdentifyTextOutput>;
    /**
     * Identify instances of real world entities from an image and if it contains unsafe content.
     * @param {IdentifyLabelsInput} input - Object containing the source image and entity type to identify.
     * @return {Promise<IdentifyLabelsOutput>} - Promise resolving to an array of identified entities.
     */
    protected identifyLabels(input: IdentifyLabelsInput): Promise<IdentifyLabelsOutput>;
    /**
     * Calls Rekognition.detectLabels and organizes the returned data.
     * @param {DetectLabelsInput} param - parameter to be passed onto Rekognition
     * @return {Promise<IdentifyLabelsOutput>} - Promise resolving to organized detectLabels response.
     */
    private detectLabels;
    /**
     * Calls Rekognition.detectModerationLabels and organizes the returned data.
     * @param {Rekognition.DetectLabelsRequest} param - Parameter to be passed onto Rekognition
     * @return {Promise<IdentifyLabelsOutput>} - Promise resolving to organized detectModerationLabels response.
     */
    private detectModerationLabels;
    /**
     * Identify faces within an image that is provided as input, and match faces from a collection
     * or identify celebrities.
     * @param {IdentifyEntityInput} input - object containing the source image and face match options.
     * @return {Promise<IdentifyEntityOutput>} Promise resolving to identify results.
     */
    protected identifyEntities(input: IdentifyEntitiesInput): Promise<IdentifyEntitiesOutput>;
    private decodeExternalImageId;
}
/**
 * @deprecated use named import
 */
export default AmazonAIIdentifyPredictionsProvider;

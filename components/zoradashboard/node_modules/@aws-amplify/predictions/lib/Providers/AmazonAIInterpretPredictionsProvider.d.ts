import { AbstractInterpretPredictionsProvider } from '../types/Providers';
import { InterpretTextInput, InterpretTextOutput } from '../types';
export declare class AmazonAIInterpretPredictionsProvider extends AbstractInterpretPredictionsProvider {
    constructor();
    getProviderName(): string;
    interpretText(input: InterpretTextInput): Promise<InterpretTextOutput>;
    private detectKeyPhrases;
    private detectSyntax;
    private serializeSyntaxFromComprehend;
    private detectSentiment;
    private detectEntities;
    private serializeEntitiesFromComprehend;
    private detectLanguage;
}
/**
 * @deprecated use named import
 */
export default AmazonAIInterpretPredictionsProvider;

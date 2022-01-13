import { AbstractPredictionsProvider } from './AbstractPredictionsProvider';
import { IdentifyLabelsInput, IdentifyEntitiesInput, IdentifyTextInput, IdentifyTextOutput, IdentifyLabelsOutput, IdentifyEntitiesOutput } from '../Predictions';
export declare abstract class AbstractIdentifyPredictionsProvider extends AbstractPredictionsProvider {
    getCategory(): string;
    identify(input: IdentifyTextInput | IdentifyLabelsInput | IdentifyEntitiesInput): Promise<IdentifyTextOutput | IdentifyLabelsOutput | IdentifyEntitiesOutput>;
    protected identifyText(input: IdentifyTextInput): Promise<IdentifyTextOutput>;
    protected identifyLabels(input: IdentifyLabelsInput): Promise<IdentifyLabelsOutput>;
    protected identifyEntities(input: IdentifyEntitiesInput): Promise<IdentifyEntitiesOutput>;
}

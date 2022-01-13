import { AbstractPredictionsProvider } from './AbstractPredictionsProvider';
import { InterpretTextInput, InterpretTextOutput } from '../Predictions';
export declare abstract class AbstractInterpretPredictionsProvider extends AbstractPredictionsProvider {
    getCategory(): string;
    interpret(input: InterpretTextInput): Promise<InterpretTextOutput>;
    protected interpretText(input: InterpretTextInput): Promise<InterpretTextOutput>;
}

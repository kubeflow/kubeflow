import { TranslateTextInput, TextToSpeechInput, SpeechToTextInput, TranslateTextOutput, TextToSpeechOutput, SpeechToTextOutput } from '../Predictions';
import { AbstractPredictionsProvider } from './AbstractPredictionsProvider';
export declare abstract class AbstractConvertPredictionsProvider extends AbstractPredictionsProvider {
    getCategory(): string;
    convert(input: TranslateTextInput | TextToSpeechInput | SpeechToTextInput): Promise<TextToSpeechOutput | TranslateTextOutput | SpeechToTextOutput>;
    protected translateText(translateTextInput: TranslateTextInput): Promise<TranslateTextOutput>;
    protected convertTextToSpeech(textToSpeechInput: TextToSpeechInput): Promise<TextToSpeechOutput>;
    protected convertSpeechToText(speechToTextInput: SpeechToTextInput): Promise<SpeechToTextOutput>;
}

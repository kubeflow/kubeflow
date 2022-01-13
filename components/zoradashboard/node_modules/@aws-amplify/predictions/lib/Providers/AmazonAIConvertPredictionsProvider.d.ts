import { AbstractConvertPredictionsProvider } from '../types/Providers/AbstractConvertPredictionsProvider';
import { TranslateTextInput, TextToSpeechInput, SpeechToTextInput, TranslateTextOutput, TextToSpeechOutput, SpeechToTextOutput } from '../types';
export declare class AmazonAIConvertPredictionsProvider extends AbstractConvertPredictionsProvider {
    private translateClient;
    private pollyClient;
    constructor();
    getProviderName(): string;
    protected translateText(input: TranslateTextInput): Promise<TranslateTextOutput>;
    protected convertTextToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput>;
    protected convertSpeechToText(input: SpeechToTextInput): Promise<SpeechToTextOutput>;
    static serializeDataFromTranscribe(message: any): string;
    private sendDataToTranscribe;
    private sendEncodedDataToTranscribe;
    private getAudioEventMessage;
    private pcmEncode;
    private inputSampleRate;
    private downsampleBuffer;
    private openConnectionWithTranscribe;
    private generateTranscribeUrl;
}
/**
 * @deprecated use named import
 */
export default AmazonAIConvertPredictionsProvider;

import { PredictionsOptions } from '..';
export declare abstract class AbstractPredictionsProvider {
    protected _config: PredictionsOptions;
    configure(config: PredictionsOptions): PredictionsOptions;
    abstract getProviderName(): string;
    abstract getCategory(): string;
}

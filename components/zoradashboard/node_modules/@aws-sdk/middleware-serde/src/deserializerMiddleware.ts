import {
  DeserializeHandler,
  DeserializeHandlerArguments,
  DeserializeHandlerOutput,
  DeserializeMiddleware,
  HandlerExecutionContext,
  ResponseDeserializer,
} from "@aws-sdk/types";

export const deserializerMiddleware = <Input extends object, Output extends object, RuntimeUtils = any>(
  options: RuntimeUtils,
  deserializer: ResponseDeserializer<any, any, RuntimeUtils>
): DeserializeMiddleware<Input, Output> => (
  next: DeserializeHandler<Input, Output>,
  context: HandlerExecutionContext
): DeserializeHandler<Input, Output> => async (
  args: DeserializeHandlerArguments<Input>
): Promise<DeserializeHandlerOutput<Output>> => {
  const { response } = await next(args);
  const parsed = await deserializer(response, options);
  return {
    response,
    output: parsed as Output,
  };
};

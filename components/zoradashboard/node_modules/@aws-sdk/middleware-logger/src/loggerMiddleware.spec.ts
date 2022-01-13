import { Logger, MiddlewareStack } from "@aws-sdk/types";

import { getLoggerPlugin, loggerMiddleware, loggerMiddlewareOptions } from "./loggerMiddleware";

describe("getLoggerPlugin", () => {
  const mockClientStack = {
    add: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("adds loggerMiddleware", () => {
    getLoggerPlugin({}).applyToStack((mockClientStack as unknown) as MiddlewareStack<any, any>);
    expect(mockClientStack.add).toHaveBeenCalledTimes(1);
    expect(mockClientStack.add.mock.calls[0][1]).toEqual(loggerMiddlewareOptions);
  });
});

describe("loggerMiddleware", () => {
  const mockNext = jest.fn();

  const mockArgs = {
    input: {
      inputKey: "inputValue",
    },
    request: {
      method: "GET",
      headers: {},
    },
  };

  const mockOutput = {
    $metadata: {
      statusCode: 200,
      requestId: "requestId",
      attempts: 2,
      totalRetryDelay: 350,
    },
    outputKey: "outputValue",
  };

  const mockResponse = {
    response: {
      statusCode: 200,
      headers: {
        "x-amzn-requestid": "requestId",
        "x-amz-id-2": "extendedRequestId",
        "x-amz-cf-id": "cfId",
      },
    },
    output: mockOutput,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns without logging if context.logger is not defined", async () => {
    mockNext.mockResolvedValueOnce(mockResponse);
    const response = await loggerMiddleware()(mockNext, {})(mockArgs);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual(mockResponse);
  });

  it("returns without logging if context.logger doesn't have info function", async () => {
    mockNext.mockResolvedValueOnce(mockResponse);
    const logger = {} as Logger;
    const response = await loggerMiddleware()(mockNext, { logger })(mockArgs);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual(mockResponse);
  });

  describe("logs if context.logger has info function", () => {
    it("success case with clientName, commandName, input, metadata", async () => {
      mockNext.mockResolvedValueOnce(mockResponse);

      const logger = ({ info: jest.fn() } as unknown) as Logger;
      const clientName = "mockClientName";
      const commandName = "mockCommandName";

      const mockInputLog = { inputKey: "inputKey", inputSensitiveKey: "SENSITIVE_VALUE" };
      const inputFilterSensitiveLog = jest.fn().mockReturnValueOnce(mockInputLog);
      const mockOutputLog = { outputKey: "outputKey", outputSensitiveKey: "SENSITIVE_VALUE" };
      const outputFilterSensitiveLog = jest.fn().mockReturnValueOnce(mockOutputLog);

      const context = {
        logger,
        clientName,
        commandName,
        inputFilterSensitiveLog,
        outputFilterSensitiveLog,
      };

      const response = await loggerMiddleware()(mockNext, context)(mockArgs);
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(response).toStrictEqual(mockResponse);

      expect(inputFilterSensitiveLog).toHaveBeenCalledTimes(1);
      expect(inputFilterSensitiveLog).toHaveBeenCalledWith(mockArgs.input);

      const { $metadata, ...outputWithoutMetadata } = mockOutput;
      expect(outputFilterSensitiveLog).toHaveBeenCalledTimes(1);
      expect(outputFilterSensitiveLog).toHaveBeenCalledWith(outputWithoutMetadata);

      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith({
        clientName,
        commandName,
        input: mockInputLog,
        output: mockOutputLog,
        metadata: $metadata,
      });
    });

    it("header x-amzn-request-id as requestId if x-amzn-requestid is not present", async () => {
      const requestIdBackup = "requestIdBackup";
      const customResponse = {
        ...mockResponse,
        response: {
          ...mockResponse.response,
          headers: {
            "x-amzn-request-id": requestIdBackup,
          },
        },
      };
      mockNext.mockResolvedValueOnce(customResponse);
      const logger = ({ info: jest.fn() } as unknown) as Logger;
      const inputFilterSensitiveLog = jest.fn().mockImplementationOnce((input) => input);
      const outputFilterSensitiveLog = jest.fn().mockImplementationOnce((output) => output);

      const context = {
        logger,
        inputFilterSensitiveLog,
        outputFilterSensitiveLog,
      };

      const response = await loggerMiddleware()(mockNext, context)(mockArgs);
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(response).toStrictEqual(customResponse);

      const { $metadata, ...outputWithoutMetadata } = mockOutput;
      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith({
        input: mockArgs.input,
        output: outputWithoutMetadata,
        metadata: $metadata,
      });
    });
  });
});

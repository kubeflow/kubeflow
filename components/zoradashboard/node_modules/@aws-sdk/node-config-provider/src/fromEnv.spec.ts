import { ProviderError } from "@aws-sdk/property-provider";

import { fromEnv, GetterFromEnv } from "./fromEnv";

describe("fromEnv", () => {
  describe("with env var getter", () => {
    const envVarName = "ENV_VAR_NAME";
    const envVarGetter: GetterFromEnv<string> = (env: NodeJS.ProcessEnv) => env[envVarName]!;
    const envVarValue = process.env[envVarName];
    const mockEnvVarValue = "mockEnvVarValue";

    const getProviderError = (getter: GetterFromEnv<string>) =>
      new ProviderError(`Cannot load config from environment variables with getter: ${getter}`);

    beforeEach(() => {
      delete process.env[envVarName];
    });

    afterAll(() => {
      process.env[envVarName] = envVarValue;
    });

    it(`returns string value in '${envVarName}' env var when set`, () => {
      process.env[envVarName] = mockEnvVarValue;
      return expect(fromEnv(envVarGetter)()).resolves.toBe(mockEnvVarValue);
    });

    it("return complex value from the getter", () => {
      type Value = { Foo: string };
      const value: Value = { Foo: "bar" };
      const getter: (env: any) => Value = jest.fn().mockReturnValue(value);
      // Validate the generic type works
      return expect(fromEnv(getter)()).resolves.toEqual(value);
    });

    it(`throws when '${envVarName}' env var is not set`, () => {
      expect.assertions(1);
      return expect(fromEnv(envVarGetter)()).rejects.toMatchObject(getProviderError(envVarGetter));
    });

    it("throws when the getter function throws", () => {
      const exception = new Error("Exception when getting the config");
      const getter: (env: any) => any = jest.fn().mockRejectedValue(exception);
      return expect(fromEnv(getter)()).rejects.toEqual(exception);
    });
  });
});

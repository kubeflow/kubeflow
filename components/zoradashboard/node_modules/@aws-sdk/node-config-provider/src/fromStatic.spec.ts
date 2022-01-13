import { fromStatic as convertToProvider } from "@aws-sdk/property-provider";

import { fromStatic } from "./fromStatic";

jest.mock("@aws-sdk/property-provider", () => ({
  fromStatic: jest.fn(),
}));

describe("fromStatic", () => {
  const value = "default";
  it("should convert static values to provider", async () => {
    (convertToProvider as jest.Mock).mockReturnValue(value);
    fromStatic(value);
    expect(convertToProvider as jest.Mock).toHaveBeenCalledWith(value);
  });

  it("should call the getter function", async () => {
    const getter = jest.fn().mockReturnValue(value);
    const config = fromStatic(getter);
    expect(await config()).toBe(value);
    expect(getter).toHaveBeenCalled();
  });
});

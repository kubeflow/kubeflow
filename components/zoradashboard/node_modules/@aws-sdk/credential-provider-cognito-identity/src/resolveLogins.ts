import { Logins, ResolvedLogins } from "./Logins";

/**
 * @internal
 */
export function resolveLogins(logins: Logins): Promise<ResolvedLogins> {
  return Promise.all(
    Object.keys(logins).reduce((arr: Array<[string, string] | Promise<[string, string]>>, name: string) => {
      const tokenOrProvider = logins[name];
      if (typeof tokenOrProvider === "string") {
        arr.push([name, tokenOrProvider] as [string, string]);
      } else {
        arr.push(tokenOrProvider().then((token) => [name, token] as [string, string]));
      }
      return arr;
    }, [] as Array<Promise<[string, string]>>)
  ).then((resolvedPairs) =>
    resolvedPairs.reduce((logins: ResolvedLogins, [key, value]) => {
      logins[key] = value;
      return logins;
    }, {} as ResolvedLogins)
  );
}

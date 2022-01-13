# Change log

## Version [3.1.2](https://github.com/auth0/jwt-decode/releases/tag/v3.1.2)

[Full Changelog](https://github.com/auth0/jwt-decode/compare/v3.1.1..v3.1.2)

- Add a generic as return type so the user can specify what's expected, this will still be `unknown` by default
- Export `JwtHeader`and `JwtPayload` that can be used with the generic return type as-is or extended.

## Version [3.1.0](https://github.com/auth0/jwt-decode/releases/tag/v3.1.0)

[Full Changelog](https://github.com/auth0/jwt-decode/compare/v3.0.0..v3.1.0)

- Add TypeScript type definition
- Fix CJS default export

## Version [3.0.0](https://github.com/auth0/jwt-decode/releases/tag/v3.0.0)

[Full Changelog](https://github.com/auth0/jwt-decode/compare/v2.0.0..v3.0.0)

- Include an ESM build for native JavaScript imports

**Warning: this version has some potentially breaking changes!**

- If you've previously imported the library as `import * as jwt_decode from 'jwt-decode'`, you'll have to change your import to `import jwt_decode from 'jwt-decode';`.

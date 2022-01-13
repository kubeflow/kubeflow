# @aws-sdk/util-create-request

[![NPM version](https://img.shields.io/npm/v/@aws-sdk/util-create-request/latest.svg)](https://www.npmjs.com/package/@aws-sdk/util-create-request)
[![NPM downloads](https://img.shields.io/npm/dm/@aws-sdk/util-create-request.svg)](https://www.npmjs.com/package/@aws-sdk/util-create-request)

This package provides function to create request object from given client and command.
You can supply either Node client or browser client. A common use case for it can be
generating request object and then supply to presigners to create presigned url.

When calling the `createRequest()`, the `initialize` and `serialize` middlewares
from both client and command are extracted and resolved into a handler. This handler
will return a promise of `HttpRequest` object. So any modifications happen in `build`
and `finalize` middleware won't be reflected to generated `httpRequest` object. For
example, the `Content-Length` header won't be included in the result.

Import:

```javascript
//JavaScript:
const createRequest = require("@aws-sdk/util-create-request").createRequest;
//TypeScript:
import { createRequest } from "@aws-sdk/util-create-request";
```

JavaScript usage examples:

```javascript
const S3Client = require("@aws-sdk/client-s3-node/S3Client").S3Client;
const GetObject = require("@aws-sdk/client-s3-node/commands/GetObjectCommand").GetObjectCommand;

const request = await createRequest(
  new S3Client({}),
  new GetObject({
    Bucket: "bucket",
    Key: "key",
  })
);
/**
{ 
  protocol: 'https:',
  path: '/js-sdk-test-bucket/key',
  hostname: 's3.us-east-2.amazonaws.com',
  body: null,
  headers: {},
  method: 'GET',
  query: {} 
}
*/
```

TypeScript usage example:

```typescript
import { S3Client } from "@aws-sdk/client-s3-node/S3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3-node/commands/GetObjectCommand";
import { InputTypesUnion, GetObjectInput } from "@aws-sdk/client-s3-node/types";
import { Readable } from "stream";

const request = await createRequest<InputTypesUnion, GetObjectInput, Readable>(
  new S3Client({}),
  new GetObjectCommand({
    Bucket: "bucket",
    Key: "key",
  })
);
```

You can omit the generics in this function and rely on the type inference. In this
way you will lose the type safety for insuring client and command comes from the same
service.

```typescript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb-node/DynamoDBClient";
import { GetObjectCommand } from "@aws-sdk/client-s3-node/commands/GetObjectCommand";
/*THIS IS WRONG, but TypeScript won't tell you*/
const request = await createRequest(
  new DynamoDBClient({}),
  new GetObjectCommand({
    Bucket: "bucket",
    Key: "key",
  })
);
```

# @aws-sdk/client-cloudwatch-logs

[![NPM version](https://img.shields.io/npm/v/@aws-sdk/client-cloudwatch-logs/latest.svg)](https://www.npmjs.com/package/@aws-sdk/client-cloudwatch-logs)
[![NPM downloads](https://img.shields.io/npm/dm/@aws-sdk/client-cloudwatch-logs.svg)](https://www.npmjs.com/package/@aws-sdk/client-cloudwatch-logs)

## Description

AWS SDK for JavaScript CloudWatchLogs Client for Node.js, Browser and React Native.

<p>You can use Amazon CloudWatch Logs to monitor, store, and access your log files from
EC2 instances, AWS CloudTrail, or other sources. You can then retrieve the associated
log data from CloudWatch Logs using the CloudWatch console, CloudWatch Logs commands in the
AWS CLI, CloudWatch Logs API, or CloudWatch Logs SDK.</p>
<p>You can use CloudWatch Logs to:</p>
<ul>
<li>
<p>
<b>Monitor logs from EC2 instances in real-time</b>: You
can use CloudWatch Logs to monitor applications and systems using log data. For example,
CloudWatch Logs can track the number of errors that occur in your application logs and
send you a notification whenever the rate of errors exceeds a threshold that you specify.
CloudWatch Logs uses your log data for monitoring so no code changes are required. For
example, you can monitor application logs for specific literal terms (such as
"NullReferenceException") or count the number of occurrences of a literal term at a
particular position in log data (such as "404" status codes in an Apache access log). When
the term you are searching for is found, CloudWatch Logs reports the data to a CloudWatch
metric that you specify.</p>
</li>
<li>
<p>
<b>Monitor AWS CloudTrail logged events</b>: You can
create alarms in CloudWatch and receive notifications of particular API activity as
captured by CloudTrail. You can use the notification to perform troubleshooting.</p>
</li>
<li>
<p>
<b>Archive log data</b>: You can use CloudWatch Logs to
store your log data in highly durable storage. You can change the log retention setting so
that any log events older than this setting are automatically deleted. The CloudWatch Logs
agent makes it easy to quickly send both rotated and non-rotated log data off of a host
and into the log service. You can then access the raw log data when you need it.</p>
</li>
</ul>

## Installing

To install the this package, simply type add or install @aws-sdk/client-cloudwatch-logs
using your favorite package manager:

- `npm install @aws-sdk/client-cloudwatch-logs`
- `yarn add @aws-sdk/client-cloudwatch-logs`
- `pnpm add @aws-sdk/client-cloudwatch-logs`

## Getting Started

### Import

The AWS SDK is modulized by clients and commands.
To send a request, you only need to import the `CloudWatchLogsClient` and
the commands you need, for example `AssociateKmsKeyCommand`:

```js
// ES5 example
const { CloudWatchLogsClient, AssociateKmsKeyCommand } = require("@aws-sdk/client-cloudwatch-logs");
```

```ts
// ES6+ example
import { CloudWatchLogsClient, AssociateKmsKeyCommand } from "@aws-sdk/client-cloudwatch-logs";
```

### Usage

To send a request, you:

- Initiate client with configuration (e.g. credentials, region).
- Initiate command with input parameters.
- Call `send` operation on client with command object as input.
- If you are using a custom http handler, you may call `destroy()` to close open connections.

```js
// a client can be shared by difference commands.
const client = new CloudWatchLogsClient({ region: "REGION" });

const params = {
  /** input parameters */
};
const command = new AssociateKmsKeyCommand(params);
```

#### Async/await

We recommend using [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
operator to wait for the promise returned by send operation as follows:

```js
// async/await.
try {
  const data = await client.send(command);
  // process data.
} catch (error) {
  // error handling.
} finally {
  // finally.
}
```

Async-await is clean, concise, intuitive, easy to debug and has better error handling
as compared to using Promise chains or callbacks.

#### Promises

You can also use [Promise chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining)
to execute send operation.

```js
client.send(command).then(
  (data) => {
    // process data.
  },
  (error) => {
    // error handling.
  }
);
```

Promises can also be called using `.catch()` and `.finally()` as follows:

```js
client
  .send(command)
  .then((data) => {
    // process data.
  })
  .catch((error) => {
    // error handling.
  })
  .finally(() => {
    // finally.
  });
```

#### Callbacks

We do not recommend using callbacks because of [callback hell](http://callbackhell.com/),
but they are supported by the send operation.

```js
// callbacks.
client.send(command, (err, data) => {
  // proccess err and data.
});
```

#### v2 compatible style

The client can also send requests using v2 compatible style.
However, it results in a bigger bundle size and may be dropped in next major version. More details in the blog post
on [modular packages in AWS SDK for JavaScript](https://aws.amazon.com/blogs/developer/modular-packages-in-aws-sdk-for-javascript/)

```ts
import * as AWS from "@aws-sdk/client-cloudwatch-logs";
const client = new AWS.CloudWatchLogs({ region: "REGION" });

// async/await.
try {
  const data = client.associateKmsKey(params);
  // process data.
} catch (error) {
  // error handling.
}

// Promises.
client
  .associateKmsKey(params)
  .then((data) => {
    // process data.
  })
  .catch((error) => {
    // error handling.
  });

// callbacks.
client.associateKmsKey(params, (err, data) => {
  // proccess err and data.
});
```

### Troubleshooting

When the service returns an exception, the error will include the exception information,
as well as response metadata (e.g. request id).

```js
try {
  const data = await client.send(command);
  // process data.
} catch (error) {
  const { requestId, cfId, extendedRequestId } = error.$metadata;
  console.log({ requestId, cfId, extendedRequestId });
  /**
   * The keys within exceptions are also parsed.
   * You can access them by specifying exception names:
   * if (error.name === 'SomeServiceException') {
   *     const value = error.specialKeyInException;
   * }
   */
}
```

## Getting Help

Please use these community resources for getting help.
We use the GitHub issues for tracking bugs and feature requests, but have limited bandwidth to address them.

- Visit [Developer Guide](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html)
  or [API Reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html).
- Check out the blog posts tagged with [`aws-sdk-js`](https://aws.amazon.com/blogs/developer/tag/aws-sdk-js/)
  on AWS Developer Blog.
- Ask a question on [StackOverflow](https://stackoverflow.com/questions/tagged/aws-sdk-js) and tag it with `aws-sdk-js`.
- Join the AWS JavaScript community on [gitter](https://gitter.im/aws/aws-sdk-js-v3).
- If it turns out that you may have found a bug, please [open an issue](https://github.com/aws/aws-sdk-js-v3/issues/new/choose).

To test your universal JavaScript code in Node.js, browser and react-native environments,
visit our [code samples repo](https://github.com/aws-samples/aws-sdk-js-tests).

## Contributing

This client code is generated automatically. Any modifications will be overwritten the next time the `@aws-sdk/client-cloudwatch-logs` package is updated.
To contribute to client you can check our [generate clients scripts](https://github.com/aws/aws-sdk-js-v3/tree/main/scripts/generate-clients).

## License

This SDK is distributed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),
see LICENSE for more information.

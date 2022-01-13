# @firebase/webchannel-wrapper

_NOTE: This is specifically tailored for Firebase JS SDK usage, if you are not a member of the Firebase team, please avoid using this package_

This is a wrapper of some Webchannel Features for the Firebase JS SDK.

## Usage

The following 5 modules are exposed for use:

- `createWebChannelTransport`
- `ErrorCode`
- `EventType`
- `WebChannel`
- `XhrIoPool`

You can include these by doing the following:

**ES Modules**

```javascript
import { WebChannel } from '@firebase/webchannel-wrapper'

// Do stuff with WebChannel
```

**CommonJS Modules**

```javascript
const webchannelWrapper = require('@firebase/webchannel-wrapper');

// Do stuff with webchannelWrapper.ErrorCode, webchannelWrapper.EventType, etc 
```
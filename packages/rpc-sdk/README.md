# Djuno RPC SDK

A SDK from [Djuno](https://www.djuno.io/) making it easy for developers to interact with Djuno's RPC endpoints.

<br>

## Getting Started

### Installation

- Requires Node.js v16 or higher
- `npm install @djuno/rpc-sdk` or `yarn add @djuno/rpc-sdk`

<br>

### Quickstart

```ts
import { Core } from '@djuno/rpc-sdk';

const core = new Core({
  endpointUrl: 'replaceme',
});

const blockNumber = await core.client.getBlockNumber();
```

<br>

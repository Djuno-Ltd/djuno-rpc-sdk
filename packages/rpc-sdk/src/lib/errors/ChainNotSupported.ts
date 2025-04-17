export class ChainNotSupported extends Error {
  constructor(endpointUrl: string) {
    super(
      `The chain for endpoint URL ${endpointUrl} is not currently supported by the Djuno RPC SDK.`
    );
  }
}

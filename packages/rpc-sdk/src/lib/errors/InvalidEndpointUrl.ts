export class InvalidEndpointUrl extends Error {
  constructor() {
    super(
      'Endpoint URL is not in a valid Djuno RPC URL format. Please check the URL and try again'
    );
  }
}

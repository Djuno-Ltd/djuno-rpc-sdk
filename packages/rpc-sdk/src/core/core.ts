import { createClient, http, publicActions } from 'viem';
import { CoreArguments, CoreClient } from './coreTypes';
import { deriveChainFromUrl } from './chains.js';
// import { NFTAndTokenActions } from './addOns/nftTokenV2/types/action.js';
// import { nftAndTokenActions } from './addOns/nftTokenV2/actions.js';
import { setupGlobalFetch, getClientHeaders } from '../lib/helpers';

// export const buildActions = (config: CoreClientConfig) => {
//   return (client: Client): NFTAndTokenActions => ({
//     ...nftAndTokenActions(client, config),
//   });
// };

export class Core {
  readonly endpointUrl: string;
  readonly client: CoreClient;

  constructor({ endpointUrl, chain }: CoreArguments) {
    setupGlobalFetch();
    const clientHeaders = getClientHeaders();
    this.endpointUrl = endpointUrl;

    const baseClient = createClient({
      chain: chain || deriveChainFromUrl(endpointUrl),
      transport: http(this.endpointUrl, {
        fetchOptions: {
          headers: clientHeaders,
        },
      }),
    }).extend(publicActions);

    const djunoClient = baseClient;
    // const djunoClient = baseClient.extend(buildActions(config));
    this.client = djunoClient;
  }
}

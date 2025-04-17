import { PublicClient } from 'viem';
// import { NFTAndTokenActions } from './addOns/nftTokenV2/types/action';
import { Chain } from 'viem';

export interface CoreArguments {
  endpointUrl: string;
  chain?: Chain;
  // config?: CoreClientConfig;
}

// export type CoreClientConfig = {
//   addOns?: {
//     nftTokenV2: boolean;
//   };
// };

// export type CoreClient = PublicClient & NFTAndTokenActions;
export type CoreClient = PublicClient;

import { ChainNotSupported } from './../lib/errors/ChainNotSupported';

import {
  arbitrum,
  arbitrumGoerli,
  arbitrumSepolia,
  arbitrumNova,
  avalanche,
  avalancheFuji,
  base,
  baseGoerli,
  baseSepolia,
  berachainTestnet,
  blast,
  blastSepolia,
  bsc,
  bscTestnet,
  celo,
  cyber,
  cyberTestnet,
  fantom,
  gnosis,
  goerli,
  holesky,
  harmonyOne,
  mainnet,
  mantle,
  mantleSepoliaTestnet,
  optimism,
  optimismGoerli,
  optimismSepolia,
  polygon,
  polygonMumbai,
  polygonAmoy,
  polygonZkEvm,
  polygonZkEvmTestnet,
  sepolia,
  scroll,
  scrollSepolia,
  sei,
  seiDevnet,
  Chain,
} from 'viem/chains';
import { InvalidEndpointUrl } from './../lib/errors/InvalidEndpointUrl';
import { ValueOf } from 'src/lib/types/ValueOf.js';

const ETH_MAINNET_NETWORK = 'ethereum-mainnet';
const chainToViemChain: Record<string, Chain> = {
  'arbitrum-mainnet': arbitrum,
  'arbitrum-goerli': arbitrumGoerli,
  'arbitrum-sepolia': arbitrumSepolia,
  'arbitrum-nova': arbitrumNova,
  'avalanche-mainnet': avalanche,
  'avalanche-testnet': avalancheFuji,
  'base-mainnet': base,
  'base-goerli': baseGoerli,
  'base-sepolia': baseSepolia,
  'bera-artio': berachainTestnet,
  'blast-mainnet': blast,
  'blast-sepolia': blastSepolia,
  ['bsc']: bsc,
  'bsc-testnet': bscTestnet,
  'celo-mainnet': celo,
  'cyber-mainnet': cyber,
  'cyber-sepolia': cyberTestnet,
  ['fantom']: fantom,
  ['xdai']: gnosis,
  ['gnosis']: gnosis,
  'ethereum-goerli': goerli,
  'harmony-mainnet': harmonyOne,
  [ETH_MAINNET_NETWORK]: mainnet, // The URL doesn't actually contain this
  'mantle-mainnet': mantle,
  'mantle-sepolia': mantleSepoliaTestnet,
  ['optimism']: optimism,
  'optimism-goerli': optimismGoerli,
  'optimism-sepolia': optimismSepolia,
  ['matic']: polygon,
  ['polygon']: polygon,
  'scroll-mainnet': scroll,
  'scroll-testnet': scrollSepolia,
  'matic-testnet': polygonMumbai,
  'matic-amoy': polygonAmoy,
  'zkevm-mainnet': polygonZkEvm,
  'zkevm-testnet': polygonZkEvmTestnet,
  'sei-pacific': sei,
  'sei-arctic': seiDevnet,
  'ethereum-sepolia': sepolia,
  'ethereum-holesky': holesky,
};

function chainNameFromEndpoint(endpointUrl: string): string {
  let hostnameParts: string[];
  try {
    const parsedUrl = new URL(endpointUrl);
    hostnameParts = parsedUrl.hostname.split('.');
  } catch (e) {
    throw new InvalidEndpointUrl();
  }

  const djuno = hostnameParts.at(-2);
  if (djuno !== 'djuno') throw new InvalidEndpointUrl();
  const name = hostnameParts.at(-3) || '';
  if (name === '') throw new InvalidEndpointUrl();
  const nameParts = name.split('-');
  const potentialChainName = nameParts.slice(0, 2).join('-');
  if (potentialChainName) return potentialChainName;

  throw new InvalidEndpointUrl();
}

export function deriveChainFromUrl(
  endpointUrl: string
): ValueOf<typeof chainToViemChain> {
  const chainName = chainNameFromEndpoint(endpointUrl);
  const viemChain = chainToViemChain[chainName];
  if (viemChain) return viemChain;
  throw new ChainNotSupported(endpointUrl);
}

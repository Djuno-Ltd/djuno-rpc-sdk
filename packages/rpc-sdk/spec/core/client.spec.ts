import { Core, CoreArguments } from '../../src';
import { mainnet } from 'viem/chains';
// import withPolly from '../testSetup/pollyTestSetup';

const coreOpts: CoreArguments = {
  // This endpoint URL hostname has to match what is recorded locally with what is on CI. In github actions,
  // we can put a invalidated auth token since we filter it out with polly.
  endpointUrl: process.env['ENDPOINT_URL'] || 'thisisnotanendpoint.example.com',
  // config: {
  //   addOns: { nftTokenV2: false },
  // },
};
const core = new Core(coreOpts);

describe('core client', () => {
  it('can call base viem functions', async () => {
    expect(core.client.getBlockNumber()).toBeTruthy();
  });

  //TODO: talk about this with the team
  it('can derive the correct network from URL', () => {
    let endpoint = new Core({
      endpointUrl:
        'https://arbitrum-mainnet-some-cool-name.djuno.cloud/x/abcd/',
    });
    let chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Arbitrum One');

    endpoint = new Core({
      endpointUrl: 'https://arbitrum-goerli-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Arbitrum Goerli');

    endpoint = new Core({
      endpointUrl:
        'https://avalanche-mainnet-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Avalanche');

    endpoint = new Core({
      endpointUrl:
        'https://avalanche-testnet-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Avalanche Fuji');

    endpoint = new Core({
      endpointUrl: 'https://base-goerli-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Base Goerli');

    // endpoint = new Core({
    //   endpointUrl: 'https://bsc-some-cool-name.djuno.cloud/x/abcd/',
    // });
    // chainName = endpoint.client.chain?.name;
    // expect(chainName).toEqual('BNB Smart Chain');

    endpoint = new Core({
      endpointUrl: 'https://bsc-testnet-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Binance Smart Chain Testnet');

    endpoint = new Core({
      endpointUrl: 'https://celo-mainnet-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Celo');

    // endpoint = new Core({
    //   endpointUrl: 'https://fantom-some-cool-name.djuno.cloud/x/abcd/',
    // });
    // chainName = endpoint.client.chain?.name;
    // expect(chainName).toEqual('Fantom');

    // endpoint = new Core({
    //   endpointUrl: 'https://xdai-some-cool-name.djuno.cloud/x/abcd/',
    // });
    // chainName = endpoint.client.chain?.name;
    // expect(chainName).toEqual('Gnosis');

    endpoint = new Core({
      endpointUrl: 'https://ethereum-goerli-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Goerli');

    endpoint = new Core({
      endpointUrl: 'https://harmony-mainnet-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Harmony One');

    endpoint = new Core({
      endpointUrl:
        'https://ethereum-mainnet-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Ethereum');

    // endpoint = new Core({
    //   endpointUrl: 'https://optimism-some-cool-name.djuno.cloud/x/abcd/',
    // });
    // chainName = endpoint.client.chain?.name;
    // expect(chainName).toEqual('OP Mainnet');

    endpoint = new Core({
      endpointUrl: 'https://optimism-goerli-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Optimism Goerli');

    // endpoint = new Core({
    //   endpointUrl: 'https://matic-some-cool-name.djuno.cloud/x/abcd/',
    // });
    // chainName = endpoint.client.chain?.name;
    // expect(chainName).toEqual('Polygon');

    endpoint = new Core({
      endpointUrl: 'https://matic-testnet-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Polygon Mumbai');

    endpoint = new Core({
      endpointUrl: 'https://zkevm-mainnet-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Polygon zkEVM');

    endpoint = new Core({
      endpointUrl: 'https://zkevm-testnet-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Polygon zkEVM Testnet');

    endpoint = new Core({
      endpointUrl:
        'https://ethereum-sepolia-some-cool-name.djuno.cloud/x/abcd/',
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Sepolia');
  });

  it('throws an error with an invalid URL', () => {
    expect(() => {
      new Core({
        endpointUrl: 'not.even.close.to.a.real.url.pro',
      });
    }).toThrowErrorMatchingInlineSnapshot(
      `"Endpoint URL is not in a valid Djuno RPC URL format. Please check the URL and try again"`
    );
    expect(() => {
      new Core({
        endpointUrl: '.djuno.cloud',
      });
    }).toThrowErrorMatchingInlineSnapshot(
      `"Endpoint URL is not in a valid Djuno RPC URL format. Please check the URL and try again"`
    );
  });

  it('throws an error with an unsupported network', () => {
    expect(() => {
      new Core({
        endpointUrl:
          'https://solana-mainnet-some-cool-name.djuno.cloud/x/abcd/',
      });
    }).toThrowErrorMatchingInlineSnapshot(
      `"The chain for endpoint URL https://solana-mainnet-some-cool-name.djuno.cloud/x/abcd/ is not currently supported by the Djuno RPC SDK."`
    );
  });

  it('can pass in a viem chain', () => {
    let endpoint = new Core({
      endpointUrl:
        'https://ethereum-mainnet-some-cool-name.djuno.cloud/x/abcd/',
      chain: mainnet,
    });
    let chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Ethereum');

    // testing custom name for DNS masking
    endpoint = new Core({
      endpointUrl: 'https://mycustomdomain.example.com/',
      chain: mainnet,
    });
    chainName = endpoint.client.chain?.name;
    expect(chainName).toEqual('Ethereum');
  });
});

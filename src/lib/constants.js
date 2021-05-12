import { BigNumber } from 'ethers';

export const LOTTERY_CONTRACT_ADDRESS = '0x16BD600a888b53D8808C0C7d84A1B7ca9FAe475D';

export const GRAPH_ENDPOINT = "https://api.thegraph.com/subgraphs/name/ianidi/lottery-ropsten";

export const RPC_URL = "https://ropsten.infura.io/v3/c010ef4cc4754cfba5eba886a7508afd";

export const FORMULA = {
  1: '50/50'
};

export const DEFAULT_TOKEN = {
  chainId: 1,
  address: '0xA99C91A4A603D3F51774ecf3C95cb4A1e93D7A52',
  mode: 'NATIVE',
  logoURI: 'https://etherscan.io/token/images/tether_32.png',
  symbol: 'TEST',
  name: 'Test token',
  decimals: 18
};

export const chainUrls = {
  1: {
    rpc: "https://ropsten.infura.io/v3/c010ef4cc4754cfba5eba886a7508afd",// mainnet
    explorer: 'https://ropsten.etherscan.io/tx/',
    chainId: 1,
  },
  3: {
    rpc: "https://ropsten.infura.io/v3/c010ef4cc4754cfba5eba886a7508afd",
    explorer: 'https://ropsten.etherscan.io/tx/',
    chainId: 3,
  },
};

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const ETHER_CURRENCY_LOGO =
  'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880';
export const BNB_CURRENCY_LOGO =
  'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615';

export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const POLLING_INTERVAL = process.env.REACT_APP_UI_STATUS_UPDATE_INTERVAL || 5000;

export const nativeCurrencies = {
  1: {
    chainId: 1,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Ether',
    symbol: 'ETH',
    mode: 'NATIVE',
    homeTokenAddress: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1'.toLowerCase(),
  },
  42: {
    chainId: 42,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Kovan Ether',
    symbol: 'KETH',
    mode: 'NATIVE',
    homeTokenAddress: '0x3D14493DF2B479E6BABE82Fc2373F91622bac025'.toLowerCase(),
  },
  56: {
    chainId: 56,
    decimals: 18,
    logoURI: BNB_CURRENCY_LOGO,
    name: 'Binance Coin',
    address: ADDRESS_ZERO,
    symbol: 'BNB',
    mode: 'NATIVE',
    homeTokenAddress: '0xCa8d20f3e0144a72C6B5d576e9Bd3Fd8557E2B04'.toLowerCase(),
  },
};

export const networkLabels = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Görli',
  42: 'Kovan',
  56: 'BSC',
  77: 'Sokol',
  100: 'xDai',
};

export const networkCurrencies = {
  1: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
};

export const defaultTokens = {
  1: {
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    chainId: 1,
    symbol: 'USDT',
    name: 'Tether USD',
  },
};

export const defaultTokensUrl = {
  100: 'https://tokens.honeyswap.org',
  1: 'https://tokens.uniswap.org',
  42: '',
  77: '',
  56: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/tokenlist.json',
};

export const GRAPH_HEALTH_ENDPOINT = 'https://api.thegraph.com/index-node/graphql';

export const LOCAL_STORAGE_KEYS = {
  INFINITE_UNLOCK: 'infinite-unlock',
  CUSTOM_TOKENS: 'customTokens',
};

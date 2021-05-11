import { BigNumber } from 'ethers';

export const LOTTERY_CONTRACT_ADDRESS = '0xe3eD91Da3daAb35FD95ec192b14D19B73D84d6bf';

export const GRAPH_ENDPOINT = "https://api.thegraph.com/subgraphs/name/raid-guild/xdai-omnibridge";

export const RPC_URL = "https://ropsten.infura.io/v3/c010ef4cc4754cfba5eba886a7508afd";

export const DEFAULT_TOKEN = {
  chainId: 1,
  address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  mode: 'NATIVE',
  logoURI: 'https://etherscan.io/token/images/tether_32.png',
  symbol: 'USDT',
  name: 'Tether USD',
  decimals: 6
};

export const networkNames = {
  1: 'ETH Mainnet',
  42: 'Kovan Testnet',
  56: 'Binance Smart Chain',
  77: 'Sokol Testnet',
  100: 'xDai Chain',
};

export const chainUrls = {
  1: {
    rpc: "https://ropsten.infura.io/v3/c010ef4cc4754cfba5eba886a7508afd",// mainnet
    explorer: 'https://blockscout.com/eth/mainnet',
    chainId: 1,
    name: networkNames[1],
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

export const POLLING_INTERVAL = process.env.REACT_APP_UI_STATUS_UPDATE_INTERVAL || 1000;

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

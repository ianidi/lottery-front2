import { BigNumber, utils } from 'ethers';
import {
  chainUrls,
  defaultTokens,
  defaultTokensUrl,
  networkCurrencies,
  networkLabels,
} from './constants';

//@ts-ignore
export const getDefaultToken = (chainId: any): any => defaultTokens[chainId] || defaultTokens[1];

//@ts-ignore
export const getNetworkLabel = (chainId: any): any => networkLabels[chainId] || 'Unknown';

//@ts-ignore
export const getNetworkCurrency = (chainId: any): any => networkCurrencies[chainId] || { name: 'Unknown', symbol: 'Unknown' };

//@ts-ignore
export const getExplorerUrl = (chainId: any): any => (chainUrls[chainId] || chainUrls[1]).explorer;

//@ts-ignore
export const getTokenListUrl = (chainId: any): any => defaultTokensUrl[chainId] || defaultTokensUrl[1];

export const removeElement = (array: any, index: any) => {
  const cloneArr = [...array];
  cloneArr.splice(index, 1);
  return cloneArr;
};

export const uniqueTokens = (list: any) => {
  const seen = {};
  return list.filter((token: any) => {
    const { address } = token;
    const lowerCaseAddress = address.toLowerCase();
    const isDuplicate = Object.prototype.hasOwnProperty.call(
      seen,
      lowerCaseAddress,
    )
      ? false
      //@ts-ignore
      : (seen[lowerCaseAddress] = true);
    return isDuplicate;
  });
};

export const formatValue = (num: any, dec: any) => {
  const str = utils.formatUnits(num, dec);
  if (str.length > 50) {
    const expStr = Number(str).toExponential().replace(/e\+?/, ' x 10^');
    const split = expStr.split(' x 10^');
    const first = Number(split[0]).toLocaleString('en', {
      maximumFractionDigits: 4,
    });
    return `${first} x 10^${split[1]}`;
  }
  return str;
  // return Number(str).toLocaleString('en', { maximumFractionDigits: 4 });
};

export const parseValue = (num: any, dec: any) => {
  let result;
  try {
    result = utils.parseUnits(num, dec);
  } catch (err) {
    result = BigNumber.from(0);
  }
  return result;
};

export const fetchQueryParams = (search: any) => {
  if (!search || !search.trim().length) return null;
  return search
    .replace('?', '')
    .split(/&/g)
    .reduce((acc: any, keyValuePair: any) => {
      const [key, value] = keyValuePair.split('=');
      acc[key] = value;
      return acc;
    }, {});
};

export const getAccountString = (account: any) => {
  const len = account.length;
  return `${account.substr(0, 6)}...${account.substr(
    len - 4,
    len - 1,
  )}`.toUpperCase();
};

export const logError = (error: any) => {
  // eslint-disable-next-line no-console
  console.error(error);
};

export const logDebug = (error: any) => {
  if (process.env.REACT_APP_DEBUG_LOGS === 'true') {
    // eslint-disable-next-line no-console
    console.debug(error);
  }
};

export const truncateText = (text: string, maxLength: number) => {
  let truncated = text;

  if (truncated.length > maxLength - 3) {
    truncated = `${truncated.substr(0, maxLength - 3)}...`;
  }
  return truncated;
};

import { BigNumber, utils } from 'ethers';
import {
  chainUrls,
  defaultTokens,
  defaultTokensUrl,
  networkCurrencies,
  networkLabels,
} from 'lib/constants';

export const getDefaultToken = chainId => defaultTokens[chainId] || defaultTokens[1];

export const getNetworkLabel = chainId => networkLabels[chainId] || 'Unknown';

export const getNetworkCurrency = chainId => networkCurrencies[chainId] || { name: 'Unknown', symbol: 'Unknown' };

export const getExplorerUrl = chainId => (chainUrls[chainId] || chainUrls[1]).explorer;

export const getTokenListUrl = chainId =>
  defaultTokensUrl[chainId] || defaultTokensUrl[1];

export const removeElement = (array, index) => {
  const cloneArr = [...array];
  cloneArr.splice(index, 1);
  return cloneArr;
};

export const uniqueTokens = list => {
  const seen = {};
  return list.filter(token => {
    const { address } = token;
    const lowerCaseAddress = address.toLowerCase();
    const isDuplicate = Object.prototype.hasOwnProperty.call(
      seen,
      lowerCaseAddress,
    )
      ? false
      : (seen[lowerCaseAddress] = true);
    return isDuplicate;
  });
};

export const formatValue = (num, dec) => {
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

export const parseValue = (num, dec) => {
  // if (!num || isNaN(Number(num))) {
  //   return BigNumber.from(0);
  // }
  let result;
  try {
    result = utils.parseUnits(num, dec);
  } catch (err) {
    result = BigNumber.from(0);
  }
  return result;
};

export const fetchQueryParams = search => {
  if (!search || !search.trim().length) return null;
  return search
    .replace('?', '')
    .split(/&/g)
    .reduce((acc, keyValuePair) => {
      const [key, value] = keyValuePair.split('=');
      acc[key] = value;
      return acc;
    }, {});
};

export const getAccountString = account => {
  const len = account.length;
  return `${account.substr(0, 6)}...${account.substr(
    len - 4,
    len - 1,
  )}`.toUpperCase();
};

export const logError = error => {
  // eslint-disable-next-line no-console
  console.error(error);
};

export const logDebug = error => {
  if (process.env.REACT_APP_DEBUG_LOGS === 'true') {
    // eslint-disable-next-line no-console
    console.debug(error);
  }
};

export const truncateText = (text, maxLength) => {
  let truncated = text;

  if (truncated.length > maxLength - 3) {
    truncated = `${truncated.substr(0, maxLength - 3)}...`;
  }
  return truncated;
};

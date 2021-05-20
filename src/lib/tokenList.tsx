import schema from '@uniswap/token-lists/src/tokenlist.schema.json';
import Ajv from 'ajv';

import { getTokenListUrl, uniqueTokens } from './helpers';

export const fetchTokenList = async (chainId: any) => {
  const defaultTokens = await fetchDefaultTokens(chainId);
  const tokens = uniqueTokens(defaultTokens);
  return tokens;
};

const tokenListValidator = new Ajv({ allErrors: true }).compile(schema);

const fetchDefaultTokens = async (chainId: any) => {
  const url = getTokenListUrl(chainId);
  if (url) {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      if (chainId === 56) {
        json.tokens = json.tokens.map((token: any) => ({ ...token, chainId }));
      }
      if (tokenListValidator(json) || chainId === 56) {
        return json.tokens.filter((token: any) => token.chainId === chainId);
      }
    }
  }
  return [];
};
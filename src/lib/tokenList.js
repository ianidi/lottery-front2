import schema from '@uniswap/token-lists/src/tokenlist.schema.json';
import Ajv from 'ajv';
import { gql, request } from 'graphql-request';

import { getTokenListUrl, uniqueTokens } from './helpers';

export const fetchTokenList = async (
  chainId,
  // homeEndpoint,
) => {
  // const [defaultTokens, subgraphTokens] = await Promise.all([
  //   fetchDefaultTokens(chainId),
  //   fetchTokensFromSubgraph(homeEndpoint),
  // ]);
  // const tokens = uniqueTokens(defaultTokens.concat(subgraphTokens));
  const defaultTokens = await fetchDefaultTokens(chainId);
  const tokens = uniqueTokens(defaultTokens);
  return tokens;
};

const tokenListValidator = new Ajv({ allErrors: true }).compile(schema);

const fetchDefaultTokens = async chainId => {
  const url = getTokenListUrl(chainId);
  if (url) {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      if (chainId === 56) {
        json.tokens = json.tokens.map(token => ({ ...token, chainId }));
      }
      if (tokenListValidator(json) || chainId === 56) {
        return json.tokens.filter(token => token.chainId === chainId);
      }
    }
  }
  return [];
};

const homeTokensQuery = gql`
  query homeTokens {
    tokens(where: { homeAddress_contains: "0x" }, first: 1000) {
      chainId: homeChainId
      address: homeAddress
      name: homeName
      symbol
      decimals
    }
  }
`;

// const fetchTokensFromSubgraph = async (homeEndpoint) => {
//   const [homeData] = await Promise.all([
//     request(homeEndpoint, homeTokensQuery),
//   ]);
//   const homeTokens = homeData && homeData.tokens ? homeData.tokens : [];
//   return homeTokens;
// };

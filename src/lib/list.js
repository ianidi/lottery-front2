import { gql, request } from 'graphql-request';

const pageSize = 1000;

const requestsUserQuery = gql`
  query getRequests($first: Int!, $skip: Int!) {
    createLotteries(
      orderBy: txHash
      orderDirection: desc
      first: $first
      skip: $skip
    ) {
      id
      txHash
      member
      lotteryID
      amount
      timestamp
      # status
      liquidity
      formula
      maxBetPercent
      duration
      collateral
      tokenName
      tokenSymbol
      tokenDecimals
    }
  }
`;

export const getRequests = async (graphEndpoint) => {
  const userRequests = await getRequestsWithQuery(graphEndpoint, requestsUserQuery);
  return userRequests;
};

export const getRequestsWithQuery = async (graphEndpoint, query) => {
  let requests = [];
  let page = 0;
  const first = pageSize;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const data = await request(graphEndpoint, query, {
      first,
      skip: page * pageSize,
    });
    if (data) {
      requests = data.createLotteries;
    }
    if (!data || data.createLotteries.length < pageSize) break;
    page += 1;
  }

  return requests;
};
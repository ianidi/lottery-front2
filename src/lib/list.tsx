import { gql, request } from 'graphql-request';

export interface createLotteries {
  id: string
  txHash: string
  member: string
  lotteryID: string
  amount: string
  timestamp: number
  liquidity: number
  formula: number
  maxBetPercent: number
  duration: string
  collateral: string
  tokenName: string
  tokenSymbol: string
  tokenDecimals: string
}

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

export const getRequests = async (graphEndpoint: string) => {
  const userRequests = await getRequestsWithQuery(graphEndpoint, requestsUserQuery);
  return userRequests;
};

export const getRequestsWithQuery = async (graphEndpoint: string, query: string): Promise<Array<createLotteries>> => {
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
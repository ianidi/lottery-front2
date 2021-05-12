import { gql, request } from 'graphql-request';

const pageSize = 1000;

const requestsUserQuery = gql`
  query getRequests($member: String!, $first: Int!, $skip: Int!) {
    playLotteries(
      where: { member: $member }
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
      result
      collateral
      formula
      tokenName
      tokenSymbol
      tokenDecimals
    }
  }
`;

export const getRequests = async (member, graphEndpoint) => {
  const userRequests = await getRequestsWithQuery(member, graphEndpoint, requestsUserQuery);
  return userRequests;
};

export const getRequestsWithQuery = async (member, graphEndpoint, query) => {
  let requests = [];
  let page = 0;
  const first = pageSize;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const data = await request(graphEndpoint, query, {
      member,
      first,
      skip: page * pageSize,
    });
    if (data) {
      requests = data.playLotteries;
    }
    if (!data || data.playLotteries.length < pageSize) break;
    page += 1;
  }

  return requests;
};
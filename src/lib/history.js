import { gql, request } from 'graphql-request';

const pageSize = 1000;

const requestsUserQuery = gql`
  query getRequests($first: Int!, $skip: Int!) {
    lotteries(
      orderBy: txHash
      orderDirection: desc
      first: $first
      skip: $skip
    ) {
      id
      member
      lotteryID
      amount
      executor
      messageId
      status
      timestamp
      txHash
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
      requests = data.lotteries;
    }
    if (!data || data.lotteries.length < pageSize) break;
    page += 1;
  }

  return requests;
};
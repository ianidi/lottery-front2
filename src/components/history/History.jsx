import { Flex, Grid, Text } from '@chakra-ui/react';
import { HistoryItem } from 'components/history/HistoryItem';
import { HistoryPagination } from 'components/history/HistoryPagination';
import { NoHistory } from 'components/history/NoHistory';
import { useUserHistory } from 'hooks/useUserHistory';
import React from 'react';
import { Redirect } from 'react-router-dom';

const TOTAL_PER_PAGE = 20;

export const History = ({ page }) => {
  const { transfers, loading } = useUserHistory();

  const numPages = Math.ceil(transfers.length / TOTAL_PER_PAGE);
  // const displayHistory = transfers.slice(
  //   (page - 1) * TOTAL_PER_PAGE,
  //   Math.min(page * TOTAL_PER_PAGE, transfers.length),
  // );
  const displayHistory = [{ lotteryID: 1, amount: "5", result: false, decimals: "8", tokenSymbol: "USDT", txHash: "a", timestamp: 1620758121 }];

  if (numPages > 1 && page > numPages) {
    return <Redirect to="/history" />;
  }

  return (
    <Flex
      maxW="75rem"
      direction="column"
      mt={8}
      px={{ base: 4, sm: 8 }}
      w="100%"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          History
        </Text>
      </Flex>

      {displayHistory.length > 0 ? (
        <>
          <Grid
            templateColumns={{
              base: '1fr 1fr 1fr 1fr 1fr',
            }}
            color="grey"
            fontSize="sm"
            px={4}
            mb={4}
            display={{ base: 'none', md: 'grid' }}
          >
            <Text textAlign="center">Lottery ID</Text>
            <Text textAlign="center">Date</Text>
            <Text textAlign="center">Amount</Text>
            <Text textAlign="center">Result</Text>
            <Text textAlign="center">Tx</Text>
          </Grid>
          {displayHistory.map((item, index) => (
            <HistoryItem key={index} item={item} />
          ))}
          {numPages > 1 && (
            <HistoryPagination numPages={numPages} currentPage={page} />
          )}
        </>
      ) : (
        <NoHistory />
      )}
    </Flex>
  );
};

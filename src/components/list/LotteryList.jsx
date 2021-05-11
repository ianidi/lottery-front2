import { Flex, Grid, Text } from '@chakra-ui/react';
import { ListItem } from 'components/list/ListItem';
import { ListPagination } from 'components/list/ListPagination';
import { NoList } from 'components/list/NoList';
import { useLotteryList } from 'hooks/useLotteryList';
import React from 'react';
import { Redirect } from 'react-router-dom';

const TOTAL_PER_PAGE = 20;

export const LotteryList = ({ page }) => {
  const { transfers, loading } = useLotteryList();

  const numPages = Math.ceil(transfers.length / TOTAL_PER_PAGE);
  // const displayList = transfers.slice(
  //   (page - 1) * TOTAL_PER_PAGE,
  //   Math.min(page * TOTAL_PER_PAGE, transfers.length),
  // );
  const displayList = [{ amount: "5", result: false, decimals: "8", tokenSymbol: "USDT", txHash: "a", timestamp: 1620758121 }];

  if (numPages > 1 && page > numPages) {
    return <Redirect to="/list" />;
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
          Lottery list
        </Text>
      </Flex>

      {displayList.length > 0 ? (
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
            <Text textAlign="center">Date</Text>
            <Text textAlign="center">Amount</Text>
            <Text textAlign="center">Result</Text>
            <Text textAlign="center">Game</Text>
            <Text textAlign="center">Tx</Text>
          </Grid>
          {displayList.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
          {numPages > 1 && (
            <ListPagination numPages={numPages} currentPage={page} />
          )}
        </>
      ) : (
        <NoList />
      )}
    </Flex>
  );
};

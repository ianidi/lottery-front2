import { Flex, Grid, Text } from '@chakra-ui/react';
import { HistoryItem } from '../../components/history/HistoryItem';
import { HistoryPagination } from '../../components/history/HistoryPagination';
import { NoHistory } from '../../components/history/NoHistory';
import { useMemberHistory } from '../../hooks/useMemberHistory';
import { useWeb3Context } from '../../contexts/Web3Context';
import React from 'react';
import { Redirect } from 'react-router-dom';

interface Props {
  page: number
}

const TOTAL_PER_PAGE = 20;

export const History: React.FC<Props> = ({ page }) => {
  const { account } = useWeb3Context();

  const { transfers } = useMemberHistory({ member: account.toLowerCase() });

  const numPages = Math.ceil(transfers.length / TOTAL_PER_PAGE);
  const displayHistory = transfers.slice(
    (page - 1) * TOTAL_PER_PAGE,
    Math.min(page * TOTAL_PER_PAGE, transfers.length),
  );

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
              base: '1fr 1fr 1fr 1fr 1fr 1fr',
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
            <Text textAlign="center">Formula</Text>
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

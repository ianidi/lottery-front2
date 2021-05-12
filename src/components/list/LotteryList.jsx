import { Flex, Grid, Text, Checkbox, useDisclosure } from '@chakra-ui/react';
import { ListItem } from 'components/list/ListItem';
import { ListPagination } from 'components/list/ListPagination';
import { NoList } from 'components/list/NoList';
import { useLotteryList } from 'hooks/useLotteryList';
import { PlayModal } from 'components/modals/PlayModal';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPlayLotteryID } from 'store/appSlice';

const TOTAL_PER_PAGE = 20;

export const LotteryList = ({ page }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { transfers, loading } = useLotteryList();

  const [onlyLiquidityProvided, setOnlyLiquidityProvided] = useState(false);

  const transfersTEMP = [{ lotteryID: "1", poolAmount: "5", formula: 1, maxBetPercent: "10", decimals: "8", tokenSymbol: "USDT", liquidityProvider: false, timestamp: 1620758121 }];

  const filteredTransfers = onlyLiquidityProvided ? transfersTEMP.filter(i => i.liquidityProvider === true) : transfersTEMP;

  const numPages = Math.ceil(transfers.length / TOTAL_PER_PAGE);
  // const displayList = transfers.slice(
  //   (page - 1) * TOTAL_PER_PAGE,
  //   Math.min(page * TOTAL_PER_PAGE, transfers.length),
  // );
  const displayList = filteredTransfers;

  const play = (lotteryID) => {
    dispatch(setPlayLotteryID(lotteryID));
    onOpen();
  };

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
      <PlayModal isOpen={isOpen} onClose={onClose} />
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Lottery list
        </Text>
        <Checkbox
          isChecked={onlyLiquidityProvided}
          onChange={e => setOnlyLiquidityProvided(e.target.checked)}
          borderColor="grey"
          borderRadius="4px"
          size="lg"
          variant="solid"
        >
          <Text fontSize="sm">Show only where I provide liquidity</Text>
        </Checkbox>
      </Flex>

      {displayList.length > 0 ? (
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
            <Text textAlign="center">Liquidity pool</Text>
            <Text textAlign="center">Formula</Text>
            <Text textAlign="center">Max bet percent</Text>
            <Text textAlign="center">Active until</Text>
            <Text textAlign="center">Play</Text>
            <Text textAlign="center">Liquidity</Text>
          </Grid>
          {displayList.map((item, index) => (
            <ListItem key={index} item={item} play={play} />
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

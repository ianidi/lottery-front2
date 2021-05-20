import { Flex, Grid, Text, Checkbox, useDisclosure } from "@chakra-ui/react";
import { ListItem } from "../../components/list/ListItem";
import { ListPagination } from "../../components/list/ListPagination";
import { NoList } from "../../components/list/NoList";
import { useLotteryList } from "../../hooks/useLotteryList";
import { PlayModal } from "../../components/modals/PlayModal";
import { LiquidityModal } from "../../components/modals/LiquidityModal";
import { useWeb3Context } from "../../contexts/Web3Context";
import { createLotteries } from "../../lib/list";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedLottery,
  setSelectedLottery
} from "../../store/appSlice";

interface Props {
  page: number
}

const TOTAL_PER_PAGE = 20;

export const LotteryList: React.FC<Props> = ({ page }) => {
  const { account } = useWeb3Context();
  const dispatch = useDispatch();
  const {
    isOpen: isPlayOpen,
    onOpen: onPlayOpen,
    onClose: onPlayClose
  } = useDisclosure();
  const {
    isOpen: isLiquidityOpen,
    onOpen: onLiquidityOpen,
    onClose: onLiquidityClose
  } = useDisclosure();

  const { transfers } = useLotteryList();

  const selectedLottery = useSelector(selectSelectedLottery);

  const [onlyLiquidityProvided, setOnlyLiquidityProvided] = useState(false);
  const accountString = account.toLowerCase();

  const filteredTransfers = onlyLiquidityProvided
    ? transfers.filter(i => i.member.toLowerCase() === accountString)
    : transfers;

  const numPages = Math.ceil(filteredTransfers.length / TOTAL_PER_PAGE);
  const displayList = filteredTransfers.slice(
    (page - 1) * TOTAL_PER_PAGE,
    Math.min(page * TOTAL_PER_PAGE, filteredTransfers.length)
  );

  const play = (lottery: createLotteries) => {
    dispatch(setSelectedLottery(lottery));
    onPlayOpen();
  };

  const manageLiquidity = (lottery: createLotteries) => {
    dispatch(setSelectedLottery(lottery));
    onLiquidityOpen();
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
      {typeof selectedLottery === "object" && (
        <PlayModal isOpen={isPlayOpen} onClose={onPlayClose} />
      )}
      {typeof selectedLottery === "object" && (
        <LiquidityModal isOpen={isLiquidityOpen} onClose={onLiquidityClose} />
      )}
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
              base: "1fr 1fr 1fr 1fr 1fr 1fr 1fr"
            }}
            color="grey"
            fontSize="sm"
            px={4}
            mb={4}
            display={{ base: "none", md: "grid" }}
          >
            <Text textAlign="center">Lottery ID</Text>
            <Text textAlign="center">Liquidity pool</Text>
            <Text textAlign="center">Formula</Text>
            <Text textAlign="center">Max bet percent</Text>
            <Text textAlign="center">Active until</Text>
            <Text textAlign="center">Play</Text>
            <Text textAlign="center">Liquidity</Text>
          </Grid>
          {displayList.map((item, index) => (
            <ListItem
              key={index}
              item={item}
              accountString={accountString}
              play={play}
              manageLiquidity={manageLiquidity}
            />
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

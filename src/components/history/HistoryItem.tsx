import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { TxLink } from "../../components/common/TxLink";
import { useWeb3Context } from "../../contexts/Web3Context";
import { BigNumber, utils } from "ethers";
import { FORMULA } from "../../lib/constants";
import React from "react";
import { playLotteries } from "../../lib/history";

interface Props {
  item: playLotteries
}

export const HistoryItem: React.FC<Props> = ({
  item: {
    amount,
    result,
    collateral,
    tokenDecimals,
    tokenSymbol,
    tokenName,
    formula,
    lotteryID,
    txHash,
    timestamp
  }
}) => {
  const { providerChainId } = useWeb3Context();

  const timestampString = new Date(
    //@ts-ignore
    parseInt(timestamp, 10) * 1000
  ).toLocaleTimeString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Flex
      w="100%"
      background="white"
      boxShadow="0px 1rem 2rem rgba(204, 218, 238, 0.8)"
      borderRadius="1rem"
      fontSize="sm"
      p={4}
      mb={4}
    >
      <Grid
        templateColumns={{
          base: "1fr 1fr 1fr 1fr 1fr 1fr"
        }}
        w="100%"
      >
        <Flex justify="center">
          <Text my="auto">{lotteryID}</Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto">{timestampString}</Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto" align="center">
            {utils.formatUnits(
              BigNumber.from(amount),
              BigNumber.from(tokenDecimals)
            )}{" "}
            {tokenSymbol} ({tokenName})
          </Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto" align="center">
            {FORMULA[formula]}
          </Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto">{result ? "Win" : "Lose"}</Text>
        </Flex>
        <Flex justify="center">
          <TxLink chainId={providerChainId} hash={txHash}>
            <Button w="80%" size="sm" colorScheme="blue">
              View Tx
            </Button>
          </TxLink>
        </Flex>
      </Grid>
    </Flex>
  );
};

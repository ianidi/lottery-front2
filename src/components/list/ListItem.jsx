import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { BigNumber, utils } from "ethers";
import { FORMULA } from "../../lib/constants";
import React from "react";

export const ListItem = ({
  play,
  manageLiquidity,
  item,
  accountString,
  item: {
    lotteryID,
    liquidity,
    formula,
    maxBetPercent,
    member,
    duration,
    tokenName,
    tokenSymbol,
    tokenDecimals
  }
}) => {
  const activeUntilString =
    duration === "0"
      ? "Infinite"
      : new Date(parseInt(duration, 10) * 1000).toLocaleTimeString([], {
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
          base: "1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        }}
        w="100%"
        alignItems="center"
      >
        <Flex justify="center">
          <Text my="auto" align="center">
            {lotteryID}
          </Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto" align="center">
            {utils.formatUnits(
              BigNumber.from(liquidity),
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
          <Text my="auto" align="center">
            {maxBetPercent}%
          </Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto" align="center">
            {activeUntilString}
          </Text>
        </Flex>
        <Flex justify="center">
          <Button
            w="80%"
            size="sm"
            colorScheme="blue"
            onClick={() => play(item)}
          >
            Play
          </Button>
        </Flex>
        <Flex justify="center">
          <Button
            w="80%"
            size="sm"
            colorScheme="blue"
            onClick={() => manageLiquidity(item)}
          >
            {member === accountString ? "Manage liquidity" : "Add liquidity"}
          </Button>
        </Flex>
      </Grid>
    </Flex>
  );
};

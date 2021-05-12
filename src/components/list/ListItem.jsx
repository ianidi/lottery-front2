import {
  Button,
  Flex,
  Grid,
  Text,
  useToast,
} from '@chakra-ui/react';
import { BigNumber, utils } from 'ethers';
import { POLLING_INTERVAL, FORMULA } from 'lib/constants';
import React, { useCallback, useMemo } from 'react';
//tokenDecimals, tokenSymbol, formula
export const ListItem = ({ play, item, accountString, item: { liquidity, formula, maxBetPercent, member, duration } }) => {

  const activeUntilString = duration === "0" ? 'Infinite' : new Date(
    parseInt(duration, 10) * 1000,
  ).toLocaleTimeString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const toast = useToast();
  const showError = useCallback(
    msg => {
      if (msg) {
        toast({
          title: 'Error',
          description: msg,
          status: 'error',
          isClosable: 'true',
        });
      }
    },
    [toast],
  );
  // const claimable = useMemo(
  //   () => message && message.msgData && message.signatures,
  //   [message],
  // );

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
          base: '1fr 1fr 1fr 1fr 1fr 1fr',
        }}
        w="100%"
      >
        <Flex justify="center">
          {/* <Text my="auto">{utils.formatUnits(BigNumber.from(liquidity), BigNumber.from(tokenDecimals))} {tokenSymbol}</Text> */}
          <Text my="auto">{liquidity}</Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto">{FORMULA[formula]}</Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto">{maxBetPercent}%</Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto">{activeUntilString}</Text>
        </Flex>
        <Flex justify="center">
          <Button w="80%" size="sm" colorScheme="blue" onClick={() => play(item)}>Play</Button>
        </Flex>
        <Flex justify="center">
          <Button w="80%" size="sm" colorScheme="blue">{member === accountString ? 'Manage liquidity' : 'Add liquidity'}</Button>
        </Flex>
      </Grid>
    </Flex>
  );
};

{/*  */ }
//
// onClick={claimTokens}
// isLoading={loading}
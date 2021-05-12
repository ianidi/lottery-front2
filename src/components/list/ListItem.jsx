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

export const ListItem = ({ item: { poolAmount, maxBetPercent, formula, decimals, tokenSymbol, liquidityProvider, timestamp } }) => {

  const timestampString = timestamp === 0 ? 'Infinite' : new Date(
    parseInt(timestamp, 10) * 1000,
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
          <Text my="auto">{utils.formatUnits(BigNumber.from(poolAmount), BigNumber.from(decimals))} {tokenSymbol}</Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto">{FORMULA[formula]}</Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto">{maxBetPercent}</Text>
        </Flex>
        <Flex justify="center">
          <Text my="auto">{timestampString}</Text>
        </Flex>
        <Flex justify="center">
          <Button w="80%" size="sm" colorScheme="blue">Play</Button>
        </Flex>
        <Flex justify="center">
          <Button w="80%" size="sm" colorScheme="blue">{liquidityProvider ? 'Manage liquidity' : 'Add liquidity'}</Button>
        </Flex>
      </Grid>
    </Flex>
  );
};

{/*  */ }
//
// onClick={claimTokens}
// isLoading={loading}
import { Slider, SliderTrack, Box, SliderFilledTrack, SliderThumb, VStack, Flex, Text } from '@chakra-ui/react';
import { UnlockButton } from 'components/create/UnlockButton';
import { TransferButton } from 'components/create/TransferButton';
import { Token } from 'components/create/Token';
import React, { useState } from 'react';

export const Create = () => {
  const [maxBetPercent, setMaxBetPercent] = useState(10);

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      w={{ base: undefined, lg: 'calc(100% - 4rem)' }}
      maxW="75rem"
      my="auto"
      mx={{ base: 4, sm: 8 }}
    >
      <Flex
        maxW="40rem"
        minW="30rem"
        background="white"
        boxShadow="0px 1rem 2rem rgba(204, 218, 238, 0.8)"
        borderRadius="1rem"
        direction="column"
        align="center"
        p={{ base: 4, md: 8 }}
      >
        <Flex w="100%" justify="center" mb={6}>
          <Flex align="flex-start" direction="column">
            <Text fontWeight="bold" fontSize="lg">
              Start a new lottery
            </Text>
          </Flex>
        </Flex>

        <VStack spacing={4} width="100%" mb={6}>
          <Flex width="100%">
            <Text fontWeight="bold" fontSize="md">
              Liquidity token
            </Text>
          </Flex>
          <Token />
          <UnlockButton />
          <Flex width="100%">
            <Text fontWeight="bold" fontSize="md">
              Max bet percent ({maxBetPercent}%)
            </Text>
          </Flex>
          <Slider defaultValue={10} min={1} max={50} step={1} onChange={(val) => setMaxBetPercent(val)}>
            <SliderTrack bg="red.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={6} boxShadow="0px 10px 10px rgba(204, 218, 238, 0.8) !important" />
          </Slider>
        </VStack>
        <TransferButton />
      </Flex>
    </Flex >
  );
};

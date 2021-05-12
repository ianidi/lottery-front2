import { Slider, SliderTrack, Box, Select, SliderFilledTrack, SliderThumb, VStack, Flex, Text } from '@chakra-ui/react';
import { UnlockButton } from 'components/create/UnlockButton';
import { CreateButton } from 'components/create/CreateButton';
import { Token } from 'components/create/Token';
import { FORMULA } from 'lib/constants';
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectMaxBetPercent, setMaxBetPercent, selectFormula, setFormula, selectToken, selectAmount, selectBalanceIsZero, selectAmountIsZero, selectTransferAllowed } from "store/appSlice";

export const Create = () => {
  const dispatch = useDispatch();

  const maxBetPercent = useSelector(selectMaxBetPercent);
  const formula = useSelector(selectFormula);

  const token = useSelector(selectToken);
  const amount = useSelector(selectAmount);
  const balanceIsZero = useSelector(selectBalanceIsZero);
  const amountIsZero = useSelector(selectAmountIsZero);
  const transferAllowed = useSelector(selectTransferAllowed);

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
          <UnlockButton token={token} amount={amount} balanceIsZero={balanceIsZero} amountIsZero={amountIsZero} transferAllowed={transferAllowed} />
          <Flex width="100%">
            <Text fontWeight="bold" fontSize="md">
              Max bet percent ({maxBetPercent}%)
            </Text>
          </Flex>
          <Slider defaultValue={maxBetPercent} min={1} max={50} step={1} onChange={(val) => dispatch(setMaxBetPercent(val))}>
            <SliderTrack bg="red.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={6} boxShadow="0px 10px 10px rgba(204, 218, 238, 0.8) !important" />
          </Slider>
          <Flex width="100%">
            <Text fontWeight="bold" fontSize="md">
              Lottery math formula
            </Text>
          </Flex>
          <Select placeholder="Select formula" value={formula} onChange={(e) => dispatch(setFormula(e.target.value))}>
            {Object.entries(FORMULA).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
          </Select>
        </VStack>
        <CreateButton />
      </Flex>
    </Flex >
  );
};

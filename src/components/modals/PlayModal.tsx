import {
  Box,
  Button,
  Divider,
  Flex,
  Spinner,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { UnlockButton } from '../common/UnlockButton';
import { TxLink } from '../common/TxLink';
import { useWeb3Context } from '../../contexts/Web3Context';
import { FORMULA } from '../../lib/constants';
import { fetchTokenBalance } from '../../lib/token';
import { formatValue, logError, parseValue, truncateText } from '../../lib/helpers';
import { usePlay } from '../../hooks/usePlay';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectSelectedLottery, selectAllowance } from "../../store/appSlice";
import { BigNumber } from '@ethersproject/bignumber';
import NumberFormat from 'react-number-format';
import { defer } from 'rxjs';

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const PlayModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const toast = useToast();
  const { account, providerChainId } = useWeb3Context();

  const selectedLottery = useSelector(selectSelectedLottery);
  const allowance = useSelector(selectAllowance);

  const [balance, setBalance] = useState<BigNumber>(BigNumber.from("0"));
  const [balanceLoading, setBalanceLoading] = useState<boolean>(false);
  const [balanceIsZero, setBalanceIsZero] = useState<boolean>(false);
  const [amountInput, setAmountInput] = useState<string>("");
  const [amount, setAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [amountIsZero, setAmountIsZero] = useState<boolean>(false);
  const [transferAllowed, setTransferAllowed] = useState<boolean>(false);

  const { liquidity, lotteryID, maxBetPercent, collateral, tokenName, tokenSymbol, tokenDecimals, formula } = selectedLottery;

  const maxBetAmount = BigNumber.from(liquidity).div(BigNumber.from("100")).mul(BigNumber.from(maxBetPercent));

  const { playTxHash, playLoading, play } = usePlay({ lotteryID, amount });

  const showError = (msg: string) => {
    if (msg) {
      toast({
        title: 'Error',
        description: msg,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const onClick = () => {
    if (playLoading || !transferAllowed) {
      return;
    }
    play().then(() => {
      history.push('/history');
    }).catch(error => {
      if (error && error.message) {
        showError(error.message);
      } else {
        showError(
          'Impossible to perform the operation. Reload the application and try again.',
        );
      }
    });
  };

  useEffect(() => {
    const token = {
      chainId: providerChainId,
      address: collateral,
    };

    let subscription: any;
    if (token && account) {
      setBalanceLoading(true);
      subscription = defer(() =>
        fetchTokenBalance(token, account).catch(balanceError => {
          logError({ balanceError });
          setBalance(BigNumber.from(0));
          setBalanceIsZero(true);
          setBalanceLoading(false);
        }),
      ).subscribe(b => {
        setBalance(b);
        setBalanceIsZero(b.eq(BigNumber.from(0)))
        setBalanceLoading(false);
      });
    } else {
      setBalance(BigNumber.from(0));
      setBalanceIsZero(true);
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [account, setBalanceLoading, lotteryID, providerChainId, collateral]);

  useEffect(() => {
    const subscription = defer(() => {
      let number = amountInput;
      if (amountInput === "") { number = "0"; }
      const amount_ = parseValue(number, tokenDecimals);
      setAmount(amount_);
      setAmountIsZero(amount_.eq(BigNumber.from(0)));
    }).subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, [amountInput, tokenDecimals]);


  useEffect(() => {
    setTransferAllowed(BigNumber.from(balance).gt(BigNumber.from(0)) && BigNumber.from(amount).gt(BigNumber.from(0)) && (BigNumber.from(amount).lte(BigNumber.from(allowance))));
  }, [amountInput, allowance, amount, balance]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay background="modalBG">
        <ModalContent
          boxShadow="0px 1rem 2rem #617492"
          borderRadius="1rem"
          maxW="38rem"
          mx={{ base: 12, lg: 0 }}
        >
          <ModalHeader p={6}>
            <Text>Play lottery</Text>
          </ModalHeader>
          <ModalCloseButton
            size="lg"
            top={-10}
            right={-10}
            color="white"
            p={2}
          />
          <ModalBody px={6} py={0}>
            <Flex width="100%">
              <Text fontWeight="bold" fontSize="md">
                Enter bet amount ({tokenSymbol} - {truncateText(tokenName, 24)})
              </Text>
            </Flex>
            <Flex
              w="100%"
              direction="column"
            >
              <Flex
                justify="space-between"
                direction={{ base: 'column', sm: 'row' }}
              >
                <Flex
                  flex={1}
                  justify="flex-end"
                  align="center"
                  h="100%"
                  position="relative"
                  ml={{ base: undefined, sm: 2, md: undefined }}
                >
                  {balanceLoading ? (
                    <Spinner size="sm" color="grey" />
                  ) : (
                    <Text
                      color="grey"
                      textAlign="right"
                      style={{ position: 'absolute', bottom: '4px', right: 0 }}
                    >
                      {`Balance: ${formatValue(balance, tokenDecimals)}`}
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Flex mt={2}>
                <NumberFormat style={{ width: '100%', outline: 'none', fontWeight: 'bold', fontSize: '24px' }} value={amountInput} placeholder="0" decimalScale={tokenDecimals} onValueChange={(values) => setAmountInput(values.value)} />
                <Button
                  ml={2}
                  color="blue.500"
                  bg="blue.50"
                  size="sm"
                  fontSize="sm"
                  fontWeight="normal"
                  _hover={{ bg: 'blue.100' }}
                  onClick={() => {
                    if (maxBetAmount.gt(balance)) {
                      setAmountInput(formatValue(balance, tokenDecimals));
                    } else {
                      setAmountInput(formatValue(maxBetAmount, tokenDecimals));
                    }
                  }}
                >
                  Max
                  </Button>
              </Flex>
            </Flex>
            <Box w="100%" fontSize="sm" color={'black'} mt={2}>
              <Text as="span">Maximum bet percent from total liquidity is </Text>
              <Text as="b">{maxBetPercent}%</Text>
              <Text as="span">. </Text>
              <Text as="span">Maximum bet amount is </Text>
              <Text as="b">{formatValue(maxBetAmount, tokenDecimals)}</Text>
              <Text as="span">.</Text>
            </Box>
            <Flex justify="center">
              <UnlockButton token={{
                chainId: providerChainId,
                address: collateral,
              }} amount={amount} balanceIsZero={balanceIsZero} amountIsZero={amountIsZero} transferAllowed={transferAllowed} />
            </Flex>
            <Divider color="#DAE3F0" my={4} />
            <Box w="100%" fontSize="sm" color={'black'} mb={2}>
              <Text as="span">Keep in mind that you can both win or lose this amount. Lottery formula is </Text>
              <Text as="b">{FORMULA[formula]}.</Text>
            </Box>
          </ModalBody>
          <ModalFooter p={6} flexDirection="column">
            <Flex
              w="100%"
              justify="space-between"
              align={{ base: 'stretch', md: 'center' }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Button
                px={12}
                onClick={onClose}
                background="background"
                _hover={{ background: '#bfd3f2' }}
                color="#687D9D"
              >
                Cancel
              </Button>
              <Button
                px={12}
                onClick={onClick}
                colorScheme="blue"
                mt={{ base: 2, md: 0 }}
                cursor={transferAllowed ? 'pointer' : 'not-allowed'} opacity={transferAllowed ? 1 : 0.4}
              >
                {playLoading ? (
                  <TxLink chainId={providerChainId} hash={playTxHash}>
                    <Spinner color="white" size="sm" />
                  </TxLink>
                ) : (
                  <>
                    <Text color="white" fontWeight="bold">Confirm</Text>
                  </>
                )}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal >
  );
};

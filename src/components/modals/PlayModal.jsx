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
import { TxLink } from 'components/common/TxLink';
import { useWeb3Context } from 'contexts/Web3Context';
import { FORMULA } from 'lib/constants';
import { fetchTokenBalance } from 'lib/token';
import { formatValue, logError, parseValue } from 'lib/helpers';
import { useCreate } from 'hooks/useCreate';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectAmount, selectMaxBetPercent, selectFormula, selectDuration, selectSelectedLottery } from "store/appSlice";
import { BigNumber } from '@ethersproject/bignumber';
import { defer } from 'rxjs';

export const PlayModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const { account, providerChainId } = useWeb3Context();

  const selectedLottery = useSelector(selectSelectedLottery);

  const token = useSelector(selectToken);
  const maxBetPercent = 20;
  const formula = 1;

  const [balance, setBalance] = useState(BigNumber.from("0"));
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [amountInput, setAmountInput] = useState(0);
  const [amount, setAmount] = useState(0);

  const { createTxHash, createLoading, create } = useCreate(token, amount, maxBetPercent, 0);

  const showError = msg => {
    if (msg) {
      toast({
        title: 'Error',
        description: msg,
        status: 'error',
        isClosable: 'true',
      });
    }
  };

  const onClick = () => {
    if (createLoading) {
      return;
    }
    create().then(() => {
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
    let subscription;
    if (token && account) {
      setBalanceLoading(true);
      subscription = defer(() =>
        fetchTokenBalance(token, account).catch(balanceError => {
          logError({ balanceError });
          setBalance(BigNumber.from(0));
          setBalanceLoading(false);
        }),
      ).subscribe(b => {
        setBalance(b);
        setBalanceLoading(false);
      });
    } else {
      setBalance(BigNumber.from(0));
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [token, account, setBalanceLoading]);

  useEffect(() => {
    const subscription = defer(() => {
      let number = amountInput;
      if (amountInput === "") { number = 0; }
      const amount_ = parseValue(Number(number), token.decimals);
      setAmount(amount_);
    }).subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, [amountInput]);

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
                Enter bet amount
            </Text>
            </Flex>
            <Divider color="#DAE3F0" my={4} />
            <Box w="100%" fontSize="sm" color={'black'} mb={2}>
              <Text as="span">Keep in mind that you can both win or lose this amount. Lottery formula is </Text>
              <Text as="b">{`${FORMULA[formula]}`}.</Text>
            </Box>
            <Box w="100%" fontSize="sm" color={'black'}>
              <Text as="span">Maximum bet percent from total liquidity is </Text>
              <Text as="b">{`${maxBetPercent}`}%</Text>
              <Text as="span">.</Text>
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
              >
                {createLoading ? (
                  <TxLink chainId={providerChainId} hash={createTxHash}>
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
    </Modal>
  );
};

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
import { formatValue } from 'lib/helpers';
import { FORMULA } from 'lib/constants';
import { useCreate } from 'hooks/useCreate';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectToken, selectAmount, selectMaxBetPercent, selectFormula, selectDuration, selectSelectedLotteryID } from "store/appSlice";

export const PlayModal = ({ isOpen, onClose }) => {
  const history = useHistory();
  const toast = useToast();
  const { providerChainId } = useWeb3Context();

  const token = useSelector(selectToken);
  const amount = useSelector(selectAmount);
  const maxBetPercent = useSelector(selectMaxBetPercent);
  const formula = useSelector(selectFormula);
  const duration = useSelector(selectDuration);

  const selectedLotteryID = useSelector(selectSelectedLotteryID);

  const { createTxHash, createLoading, create } = useCreate(token, amount, maxBetPercent, duration);

  const formattedAmount = formatValue(amount, token.decimals);

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
      history.push('/list');
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

  // if (!token) return null;

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
            <Box w="100%" fontSize="sm" color={'black'} mb={2}>
              <Text as="span">You're sending </Text>
              <Text as="b">{`${formattedAmount} ${token.symbol}`}</Text>
              <Text as="span"> to lottery contract in order to play a game. Keep in mind that you can both win or lose this amount. Lottery formula is </Text>
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

import {
  Box,
  Button,
  Divider,
  Flex,
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
import { formatValue } from 'lib/helpers';
import React from 'react';
import { useSelector } from "react-redux";
import { selectToken, selectAmount } from "store/appSlice";

export const ConfirmTransferModal = ({ isOpen, onClose }) => {

  const token = useSelector(selectToken);
  const amount = useSelector(selectAmount);

  const transfer = async () => {
    // setLoading(true);
    // try {
    //   const tx = await relayTokens(
    //     ethersProvider,
    //     token,
    //     receiver || account,
    //     amount,
    //     {
    //       shouldReceiveNativeCur,
    //       foreignChainId,
    //     },
    //   );
    //   setTxHash(tx.hash);
    // } catch (transferError) {
    //   setLoading(false);
    //   logError({
    //     transferError,
    //     token,
    //     receiver: receiver || account,
    //     amount: amount.toString(),
    //     account,
    //   });
    //   throw transferError;
    // }
  };

  const toast = useToast();

  if (!token) return null;

  const fromAmt = formatValue(amount, token.decimals);
  const fromUnit = token.symbol;

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
    transfer().catch(error => {
      if (error && error.message) {
        showError(error.message);
      } else {
        showError(
          'Impossible to perform the operation. Reload the application and try again.',
        );
      }
    });
    onClose();
  };

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
            <Text>Confirm Transfer</Text>
          </ModalHeader>
          <ModalCloseButton
            size="lg"
            top={-10}
            right={-10}
            color="white"
            p={2}
          />
          <ModalBody px={6} py={0}>
            <Flex align="center" justify="center" width="100%">
              <Flex
                justify="center"
                align="center"
                direction="column"
                border="1px solid #DAE3F0"
                borderRadius="0.25rem"
                w="10rem"
                h="4rem"
                px={4}
              >
                <Text textAlign="center" fontWeight="bold">
                  {fromAmt}
                </Text>
                <Text textAlign="center" fontSize="sm">
                  {fromUnit}
                </Text>
              </Flex>
            </Flex>
            <Divider color="#DAE3F0" my={4} />
            <Box w="100%" fontSize="sm" color={'black'}>
              <Text as="span">{`Please confirm that you would like to create a new lottery and send `}</Text>
              <Text as="b">{`${fromAmt} ${fromUnit}`}</Text>
              <Text as="span"> to lottery liquidity fund</Text>
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
                Continue
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

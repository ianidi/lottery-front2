import React from 'react';
import { Button, Image, Text, useDisclosure, useToast } from '@chakra-ui/react';
import TransferIcon from 'assets/transfer.svg';
import { ConfirmTransferModal } from 'components/modals/ConfirmTransferModal';
import { useWeb3Context } from 'contexts/Web3Context';
import { useSelector } from "react-redux";
import { selectTransferAllowed } from "store/appSlice";

export const TransferButton = () => {
  const { ethersProvider } = useWeb3Context();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const transferAllowed = useSelector(selectTransferAllowed);

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

  const valid = () => {
    if (!ethersProvider) {
      showError('Please connect wallet');
      return false;
    }
    return true;
  };
  const onClick = () => {
    if (transferAllowed && valid()) {
      onOpen();
    }
  };

  return (
    <>
      <ConfirmTransferModal isOpen={isOpen} onClose={onClose} />
      <Button colorScheme="blue" onClick={onClick} cursor={transferAllowed ? 'pointer' : 'not-allowed'} opacity={transferAllowed ? 1 : 0.4}>
        <Image src={TransferIcon} mr={2} />
        <Text>Confirm</Text>
      </Button>
    </>
  );
};

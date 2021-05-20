import React from 'react';
import { Button, Image, Text, useDisclosure, useToast } from '@chakra-ui/react';
import TransferIcon from '../../assets/transfer.svg';
import { CreateModal } from '../../components/modals/CreateModal';
import { useWeb3Context } from '../../contexts/Web3Context';
import { useSelector } from "react-redux";
import { selectTransferAllowed, selectFormula } from "../../store/appSlice";

export const CreateButton: React.FC = () => {
  const { ethersProvider } = useWeb3Context();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const transferAllowed = useSelector(selectTransferAllowed);
  const formula = useSelector(selectFormula);

  const showError = (msg: string | JSX.Element) => {
    if (msg) {
      toast({
        title: 'Error',
        description: msg,
        status: 'error',
        isClosable: true,
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
    if (transferAllowed && !!formula && valid()) {
      onOpen();
    }
  };

  return (
    <>
      <CreateModal isOpen={isOpen} onClose={onClose} />
      <Button colorScheme="blue" onClick={onClick} cursor={transferAllowed && !!formula ? 'pointer' : 'not-allowed'} opacity={transferAllowed && !!formula ? 1 : 0.4}>
        <Image src={TransferIcon} mr={2} />
        <Text>Confirm</Text>
      </Button>
    </>
  );
};

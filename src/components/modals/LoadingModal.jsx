import {
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { BridgeContext } from 'contexts/BridgeContext';
import React, { useContext } from 'react';

export const LoadingModal = () => {
  const { loading } = useContext(BridgeContext);
  return (
    <Modal
      isOpen={!loading}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay background="modalBG">
        <ModalContent background="none" boxShadow="none" borderRadius="0">
          <Flex direction="column" align="center" justify="center">
            <Text color="white" fontWeight="bold">
              Loading ...
                </Text>
          </Flex>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

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
  useToast
} from "@chakra-ui/react";
import { TxLink } from "../../components/common/TxLink";
import { useWeb3Context } from "../../contexts/Web3Context";
import { useRedeem } from "../../hooks/useRedeem";
import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedLottery } from "../../store/appSlice";

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const LiquidityModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { providerChainId } = useWeb3Context();

  const selectedLottery = useSelector(selectSelectedLottery);

  const { lotteryID } = selectedLottery;

  const { redeemTxHash, redeemLoading, redeem } = useRedeem({ lotteryID });

  const showError = (msg: string | JSX.Element) => {
    if (msg) {
      toast({
        title: "Error",
        description: msg,
        status: "error",
        isClosable: true
      });
    }
  };

  const onClick = () => {
    if (redeemLoading) {
      return;
    }
    redeem()
      .then(() => {
        onClose();
      })
      .catch(error => {
        if (error && error.message) {
          showError(error.message);
        } else {
          showError(
            "Impossible to perform the operation. Reload the application and try again."
          );
        }
      });
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
            <Text>Manage liquidity</Text>
          </ModalHeader>
          <ModalCloseButton
            size="lg"
            top={-10}
            right={-10}
            color="white"
            p={2}
          />
          <ModalBody px={6} py={0}>
            <Box w="100%" fontSize="sm" color={"black"} mt={2}>
              <Text as="span">You have </Text>
              <Text as="b">xxx</Text>
              <Text as="span"> liquidity.</Text>
            </Box>
            <Divider color="#DAE3F0" my={4} />
            <Box w="100%" fontSize="sm" color={"black"} mb={2}>
              <Text as="span">You can withdraw your liquidity.</Text>
            </Box>
          </ModalBody>
          <ModalFooter p={6} flexDirection="column">
            <Flex
              w="100%"
              justify="space-between"
              align={{ base: "stretch", md: "center" }}
              direction={{ base: "column", md: "row" }}
            >
              <Button
                px={12}
                onClick={onClose}
                background="background"
                _hover={{ background: "#bfd3f2" }}
                color="#687D9D"
              >
                Cancel
              </Button>
              <Button
                px={12}
                onClick={onClick}
                colorScheme="blue"
                mt={{ base: 2, md: 0 }}
                cursor={true ? "pointer" : "not-allowed"}
                opacity={true ? 1 : 0.4}
              >
                {redeemLoading ? (
                  <TxLink chainId={providerChainId} hash={redeemTxHash}>
                    <Spinner color="white" size="sm" />
                  </TxLink>
                ) : (
                  <>
                    <Text color="white" fontWeight="bold">
                      Withdraw
                    </Text>
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

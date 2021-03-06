import {
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";
import SearchIcon from "../../assets/search.svg";
import { useWeb3Context } from "../../contexts/Web3Context";
import { PlusIcon } from "../../icons/PlusIcon";
import { LOCAL_STORAGE_KEYS } from "../../lib/constants";
import { logError, uniqueTokens } from "../../lib/helpers";
import { fetchTokenList } from "../../lib/tokenList";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/appSlice";


interface Props {
  isOpen: boolean
  onClose: () => void
  onCustom: () => void
}

const { CUSTOM_TOKENS } = LOCAL_STORAGE_KEYS;

export const TokenSelectorModal: React.FC<Props> = ({ isOpen, onClose, onCustom }) => {
  const dispatch = useDispatch();

  // Ref
  const initialRef = useRef();
  // Contexts
  const { providerChainId } = useWeb3Context();
  // const { disableBalanceFetchToken } = useSettings();
  // State
  const [loading, setLoading] = useState(true);
  const [tokenList, setTokenList] = useState<any>([]);
  const [filteredTokenList, setFilteredTokenList] = useState([]);
  const smallScreen = useBreakpointValue({ sm: false, base: true });

  const setDefaultTokenList = useCallback(async (chainId, customTokens) => {
    setLoading(true);
    try {
      const baseTokenList = await fetchTokenList(chainId);

      const customTokenList = [
        ...uniqueTokens(
          baseTokenList.concat(
            customTokens.filter((token: any) => token.chainId === chainId)
          )
        )
      ];

      setTokenList(customTokenList);
    } catch (fetchTokensError) {
      logError({ fetchTokensError });
    }
    setLoading(false);
  }, []);

  // Effects
  useEffect(
    () => {
      tokenList.length && setFilteredTokenList(tokenList);
    },
    [tokenList, setFilteredTokenList]
  );

  useEffect(
    () => {
      if (!isOpen) return;
      let localTokenList = window.localStorage.getItem(CUSTOM_TOKENS);
      localTokenList =
        !localTokenList || !localTokenList.length
          ? []
          : JSON.parse(localTokenList);
      providerChainId && setDefaultTokenList(providerChainId, localTokenList);
    },
    [isOpen, providerChainId, setDefaultTokenList]
  );

  // Handlers
  const onClick = (token: any) => {
    onClose();
    dispatch(setToken(token));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilteredTokenList = tokenList.filter((token: any) => {
      const lowercaseSearch = e.target.value.toLowerCase();
      const { name, symbol, address } = token;
      return (
        name.toLowerCase().includes(lowercaseSearch) ||
        symbol.toLowerCase().includes(lowercaseSearch) ||
        address.toLowerCase().includes(lowercaseSearch)
      );
    });
    setFilteredTokenList(newFilteredTokenList);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      isCentered
      //@ts-ignore
      initialFocusRef={initialRef}
    >
      <ModalOverlay background="modalBG">
        <ModalContent
          boxShadow="0px 1rem 2rem #617492"
          borderRadius="1rem"
          pb={4}
          pt={2}
          maxW="30rem"
          mx={{ base: 12, lg: 0 }}
        >
          <ModalHeader pb={0}>
            <Flex align="center" justify="space-between">
              Select a Token
              <Link
                fontSize="md"
                color="blue.500"
                fontWeight="normal"
                onClick={onCustom}
              >
                <Flex align="center">
                  <PlusIcon mr={2} />
                  <Text>{smallScreen ? "Custom" : "Add Custom Token"}</Text>
                </Flex>
              </Link>
            </Flex>
            <Text color="grey" my={2} fontSize="md" fontWeight="normal">
              Search Name or Paste Token Contract Address
            </Text>
            <InputGroup mb={4} borderColor="#DAE3F0">
              <Input
                placeholder="Search ..."
                onChange={onChange}
                _placeholder={{ color: "grey" }}
                //@ts-ignore
                ref={initialRef}
              />
              <InputRightElement px={0}>
                <Image src={SearchIcon} />
              </InputRightElement>
            </InputGroup>
          </ModalHeader>
          <ModalCloseButton
            size="lg"
            top={-10}
            right={-10}
            color="white"
            p={2}
          />
          <ModalBody minH="5rem">
            {loading && (
              <Flex w="100%" align="center" justify="center">
                <Spinner
                  color="blue.500"
                  thickness="4px"
                  size="xl"
                  speed="0.75s"
                />
              </Flex>
            )}
            {!loading &&
              filteredTokenList.map(token => {
                const {
                  name,
                  address,
                  // logoURI,
                  symbol
                } = token;
                return (
                  <Button
                    variant="outline"
                    size="lg"
                    width="100%"
                    borderColor="#DAE3F0"
                    key={address + symbol}
                    onClick={() => onClick(token)}
                    mb={2}
                  >
                    <Flex align="center" width="100%" justify="space-between">
                      <Flex align="center">
                        {/* <Flex
                          justify="center"
                          align="center"
                          background="white"
                          border="1px solid #DAE3F0"
                          boxSize={8}
                          overflow="hidden"
                          borderRadius="50%"
                        >
                          <Logo uri={logoURI} />
                        </Flex> */}
                        <Text fontSize="lg" fontWeight="bold">
                          {symbol}
                        </Text>
                      </Flex>
                      <Text
                        color="grey"
                        fontWeight="normal"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        maxWidth="60%"
                      >
                        {name}
                        {/* {!disableBalanceFetchToken && balance && decimals
                          ? formatValue(balance, decimals)
                          : name} */}
                      </Text>
                    </Flex>
                  </Button>
                );
              })}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useWeb3Context } from '../../contexts/Web3Context';
import { WalletIcon } from '../../icons/WalletIcon';
import { getAccountString, getNetworkLabel } from '../../lib/helpers';
import React from 'react';

interface Props {
  close: () => void
}

export const WalletSelector: React.FC<Props> = ({ close }) => {
  const { disconnect, account, providerChainId } = useWeb3Context();

  const placement = useBreakpointValue({ base: 'bottom', md: 'bottom-end' });
  if (!account || !providerChainId) return null;
  return (
    <Flex>
      {/* @ts-ignore */}
      <Popover placement={placement}>
        <PopoverTrigger>
          <Button colorScheme="blue">
            <WalletIcon mr={2} />
            <Text> {getAccountString(account)} </Text>
            <Flex
              justify="center"
              align="center"
              bg="white"
              borderRadius="6px"
              px="0.75rem"
              height="2rem"
              fontSize="sm"
              color="blue.500"
              fontWeight="600"
              ml={4}
            >
              {getNetworkLabel(providerChainId)}
            </Flex>
          </Button>
        </PopoverTrigger>
        <PopoverContent border="none" right={0} p="0">
          <PopoverBody
            width="100%"
            align="center"
            boxShadow="0 0.5rem 1rem #CADAEF"
            p={4}
          >
            <Flex
              justify="space-between"
              align="center"
              direction="column"
              fontWeight="bold"
            >
              <Text mb={{ base: 4, md: undefined }}>
                Connected to {getNetworkLabel(providerChainId)}
              </Text>
              <Button
                colorScheme="blue"
                onClick={() => {
                  {/* @ts-ignore */ }
                  disconnect();
                  close();
                }}
              >
                <Text> Disconnect </Text>
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

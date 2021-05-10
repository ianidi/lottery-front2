import {
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { WalletSelector } from 'components/common/WalletSelector';
import { useWeb3Context } from 'contexts/Web3Context';
import { CreateIcon } from 'icons/CreateIcon';
import { LotteryIcon } from 'icons/LotteryIcon';
import { HistoryIcon } from 'icons/HistoryIcon';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const CreateLink = ({ close }) => {
  const history = useHistory();
  return (
    <Button
      variant="ghost"
      color="grey"
      _hover={{ color: 'blue.500', bgColor: 'blackAlpha.100' }}
      onClick={() => {
        history.push('/');
        close();
      }}
      leftIcon={<CreateIcon />}
    >
      <Text color="black">New lottery</Text>
    </Button>
  );
};

const LotteryLink = ({ close }) => {
  const history = useHistory();
  return (
    <Button
      variant="ghost"
      color="grey"
      _hover={{ color: 'blue.500', bgColor: 'blackAlpha.100' }}
      onClick={() => {
        history.push('/list');
        close();
      }}
      leftIcon={<LotteryIcon />}
    >
      <Text color="black">Lottery list</Text>
    </Button>
  );
};

const HistoryLink = ({ close }) => {
  const history = useHistory();
  return (
    <Button
      variant="ghost"
      color="grey"
      _hover={{ color: 'blue.500', bgColor: 'blackAlpha.100' }}
      onClick={() => {
        history.push('/history');
        close();
      }}
      leftIcon={<HistoryIcon />}
    >
      <Text color="black">History</Text>
    </Button>
  );
};

export const Header = () => {
  const { account } = useWeb3Context();
  const [isOpen, setOpen] = useState(false);
  const valid = !!account;
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      justify="space-between"
      position={{ base: isOpen ? 'fixed' : 'relative', md: 'relative' }}
      top={isOpen ? 0 : undefined}
      left={isOpen ? 0 : undefined}
      align={{ base: 'stretch', md: 'center' }}
      maxW="75rem"
      minH={20}
      px={{ base: 4, sm: 8 }}
      w="100%"
      background={isOpen ? { base: 'white', md: 'transparent' } : 'transparent'}
      direction={{ base: 'column', md: 'row' }}
      mb={isOpen ? { base: 4, md: 0 } : 0}
      boxShadow={
        isOpen ? { base: '0 0.5rem 1rem #CADAEF', md: 'none' } : 'none'
      }
      h={isOpen && isSmallScreen ? '100%' : undefined}
      zIndex={isOpen ? 5 : undefined}
    >
      <Flex justify="space-between" h={20} align="center">
        <Link to="/">
          <Flex justify="space-around" align="center">
            <Text fontWeight="bold">Lottery</Text>
          </Flex>
        </Link>
      </Flex>
      <Stack
        position={{ base: 'relative', md: 'static' }}
        direction={{ base: 'column', md: 'row' }}
        display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
        w={{ base: '100%', md: 'auto' }}
        h={{ base: '100%', md: 'auto' }}
        align="center"
        justify="center"
      >
        {valid && (
          <>
            <CreateLink close={() => setOpen(false)} />
            <LotteryLink close={() => setOpen(false)} />
            <HistoryLink close={() => setOpen(false)} />
          </>
        )}
        <WalletSelector close={() => setOpen(false)} />
      </Stack>
    </Flex>
  );
};

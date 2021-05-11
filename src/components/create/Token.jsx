import { Button, Flex, Image, Input, Spinner, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import DropDown from 'assets/drop-down.svg';
// import { Logo } from 'components/common/Logo';
import { SelectTokenModal } from 'components/modals/SelectTokenModal';
import { useWeb3Context } from 'contexts/Web3Context';
import { formatValue, logError, truncateText, parseValue } from 'lib/helpers';
import { fetchTokenBalance } from 'lib/token';
import React, { useEffect, useState } from 'react';
import { defer } from 'rxjs';
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectBalance, setAmount, setBalance } from "store/appSlice";
import { BigNumber } from '@ethersproject/bignumber';

export const Token = () => {
  const dispatch = useDispatch();

  const { account } = useWeb3Context();

  const token = useSelector(selectToken);
  const balance = useSelector(selectBalance);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const smallScreen = useBreakpointValue({ base: true, lg: false });

  const [balanceLoading, setBalanceLoading] = useState(false);
  const [amountInput, setAmountInput] = useState('0');

  useEffect(() => {
    let subscription;
    if (token && account) {
      setBalanceLoading(true);
      subscription = defer(() =>
        fetchTokenBalance(token, account).catch(balanceError => {
          logError({ balanceError });
          dispatch(setBalance(BigNumber.from(0)));
          setBalanceLoading(false);
        }),
      ).subscribe(b => {
        dispatch(setBalance(b));
        setBalanceLoading(false);
      });
    } else {
      dispatch(setBalance(BigNumber.from(0)));
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [token, account, setBalanceLoading]);

  useEffect(() => {
    const subscription = defer(() => {
      const amount = parseValue(amountInput, token.decimals);
      dispatch(setAmount(amount));
    }).subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, [amountInput]);

  return (
    <Flex width="100%">
      <SelectTokenModal onClose={onClose} isOpen={isOpen} />
      {token && (
        <Flex
          w="100%"
          direction="column"
        >
          <Flex
            justify="space-between"
            mb={4}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Flex
              align="center"
              cursor="pointer"
              onClick={onOpen}
              zIndex={1}
              background="white"
            >
              {/* <Flex
                justify="center"
                align="center"
                background="white"
                border="1px solid #DAE3F0"
                boxSize={8}
                overflow="hidden"
                borderRadius="50%"
              >
                <Logo uri={token.logoURI} />
              </Flex> */}
              <Text fontSize="lg" fontWeight="bold" mx={2}>
                {truncateText(token.name, 24)}
              </Text>
              <Image src={DropDown} cursor="pointer" />
            </Flex>
            <Flex
              flex={1}
              justify="flex-end"
              align="center"
              h="100%"
              position="relative"
              ml={{ base: undefined, sm: 2, md: undefined }}
            >
              {balanceLoading ? (
                <Spinner size="sm" color="grey" />
              ) : (
                <Text
                  color="grey"
                  textAlign="right"
                  {...(smallScreen
                    ? {}
                    : { position: 'absolute', bottom: '4px', right: 0 })}
                >
                  {`Balance: ${formatValue(balance, token.decimals)}`}
                </Text>
              )}
            </Flex>
          </Flex>
          <Flex>
            <Input
              flex={1}
              variant="unstyled"
              type="number"
              value={amountInput}
              maxLength={18}
              placeholder="0.0"
              textAlign="left"
              fontWeight="bold"
              onChange={e => {
                setAmountInput(e.target.value);
              }}
              fontSize="2xl"
            />
            <Button
              ml={2}
              color="blue.500"
              bg="blue.50"
              size="sm"
              fontSize="sm"
              fontWeight="normal"
              _hover={{ bg: 'blue.100' }}
              onClick={() => {
                setAmountInput(balance.toString());
                // dispatch(setAmount(utils.formatUnits(balance, token.decimals)));
              }}
            >
              Max
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

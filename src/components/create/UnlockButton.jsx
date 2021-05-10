import React from 'react';
import { Button, Image, Link, Spinner, Text, useToast } from '@chakra-ui/react';
import UnlockIcon from 'assets/unlock.svg';
import { TxLink } from 'components/common/TxLink';
import { useWeb3Context } from 'contexts/Web3Context';
import { useApproval } from 'hooks/useApproval';
import { useSelector } from "react-redux";
import { selectToken, selectAmount, selectBalanceIsZero, selectTransferAllowed } from "store/appSlice";

export const UnlockButton = () => {
  const toast = useToast();
  const { providerChainId } = useWeb3Context();

  const token = useSelector(selectToken);
  const amount = useSelector(selectAmount);
  const balanceIsZero = useSelector(selectBalanceIsZero);
  const transferAllowed = useSelector(selectTransferAllowed);

  const { approvalTxHash, approvalLoading, approve } = useApproval(token, amount);

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
    if (!approvalLoading) {
      approve().catch(error => {
        if (error && error.message) {
          if (
            error.data &&
            (error.data.includes('Bad instruction fe') ||
              error.data.includes('Reverted'))
          ) {
            showError(
              <Text>
                There is problem with the token unlock. Try to revoke previous
                approval if any on{' '}
                <Link
                  href="https://revoke.cash"
                  textDecor="underline"
                  isExternal
                >
                  https://revoke.cash/
                </Link>{' '}
                and try again.
              </Text>,
            );
          } else {
            showError(error.message);
          }
        } else {
          showError(
            'Impossible to perform the operation. Reload the application and try again.',
          );
        }
      });
    }
  };

  if (balanceIsZero || transferAllowed) { return null; }

  return (
    <Button
      colorScheme="blue"
      onClick={onClick}
      _hover={{ color: 'cyan.600' }}
      cursor='pointer'
      transition="0.25s"
      w={{ base: '10rem', sm: '12rem', lg: 'auto' }}
    >
      {approvalLoading ? (
        <TxLink chainId={providerChainId} hash={approvalTxHash}>
          <Spinner color="white" size="sm" />
        </TxLink>
      ) : (
        <>
          <Text color="white" fontWeight="bold">Unlock balance</Text>
          <Image src={UnlockIcon} ml={2} />
        </>
      )}
    </Button>
  );
};

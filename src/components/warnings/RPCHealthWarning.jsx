import { Alert, AlertIcon, Flex, Text } from '@chakra-ui/react';
import { useRPCHealth } from 'hooks/useRPCHealth';
import React from 'react';

export const RPCHealthWarning = () => {
  const { homeHealthy } = useRPCHealth();

  if (homeHealthy) return null;

  return (
    <Flex align="center" direction="column" w="100%" mb="4">
      <Alert
        status="warning"
        borderRadius={5}
        boxShadow="0px 1rem 2rem rgba(204, 218, 238, 0.8)"
      >
        <AlertIcon minWidth="20px" />
        <Text fontSize="small">
          The RPC-node is not responding. Please set custom RPC URL in settings or come back later.
        </Text>
      </Alert>
    </Flex>
  );
};

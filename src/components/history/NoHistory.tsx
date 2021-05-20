import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const NoHistory: React.FC = () => {
  return (
    <Flex
      w="100%"
      background="white"
      boxShadow="0px 1rem 2rem rgba(204, 218, 238, 0.8)"
      borderRadius="1rem"
      p={8}
      direction="column"
      align="center"
    >
      <Text fontWeight="bold" mb={4}>
        No history found
      </Text>
      <Link to="/list">
        <Button colorScheme="blue">
          Play
        </Button>
      </Link>
    </Flex>
  );
};

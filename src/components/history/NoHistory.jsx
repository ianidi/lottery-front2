import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react';
import NoHistoryImage from 'assets/no-history.svg';
import React from 'react';
import { Link } from 'react-router-dom';

export const NoHistory = () => {
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
        No History Found
      </Text>
      <Link to="/list">
        <Button colorScheme="blue">
          Play
        </Button>
      </Link>
    </Flex>
  );
};

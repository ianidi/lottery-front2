import { Link } from '@chakra-ui/react';
import { getExplorerUrl } from '../../lib/helpers';
import React from 'react';

interface Props {
  chainId?: number
  hash?: string
  children: JSX.Element
}

export const TxLink = ({ chainId, hash, children }: Props) => {
  const link = `${getExplorerUrl(chainId)}${hash}`;
  if (hash)
    return (
      <Link
        href={link}
        w="100%"
        h="100%"
        isExternal
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Link>
    );
  return children;
};

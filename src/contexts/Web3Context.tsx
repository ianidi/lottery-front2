import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { logError } from '../lib/helpers';
import { RPC_URL } from '../lib/constants';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { SafeAppWeb3Modal as Web3Modal } from '@gnosis.pm/safe-apps-web3modal';

interface Web3Provider {
  children?: React.ReactNode
}

interface Web3State {
  providerChainId?: number
  ethersProvider?: ethers.providers.Web3Provider
  account?: string
}

interface useWeb3Context {
  ethersProvider?: ethers.providers.Web3Provider | undefined
  connectWeb3?: () => Promise<void>
  loading?: boolean
  disconnect?: () => Promise<void>
  providerChainId?: number | undefined
  account?: string | undefined
}

export const Web3Context = React.createContext<useWeb3Context>({});
export const useWeb3Context = () => useContext(Web3Context);

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: RPC_URL,
        3: RPC_URL,
      },
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

export const Web3Provider = ({ children }: Web3Provider) => {
  const [{ providerChainId, ethersProvider, account }, setWeb3State] = useState<Web3State>(
    {},
  );
  const [loading, setLoading] = useState(true);

  const setWeb3Provider = useCallback(async (prov, initialCall = false) => {
    try {
      if (prov) {
        const web3Provider = new Web3(prov);
        const provider = new ethers.providers.Web3Provider(
          // @ts-ignore
          web3Provider.currentProvider,
        );
        const chainId = Number(prov.chainId);
        if (initialCall) {
          const signer = provider.getSigner();
          const gotAccount = await signer.getAddress();
          setWeb3State({
            account: gotAccount,
            ethersProvider: provider,
            providerChainId: chainId,
          });
        } else {
          setWeb3State(_provider => ({
            ..._provider,
            ethersProvider: provider,
            providerChainId: chainId,
          }));
        }
      }
    } catch (error) {
      logError({ web3ModalError: error });
    }
  }, []);

  const connectWeb3 = useCallback(async () => {
    try {
      setLoading(true);

      const modalProvider = await web3Modal.requestProvider();

      await setWeb3Provider(modalProvider, true);

      const isGnosisSafe = !!modalProvider.safe;

      if (!isGnosisSafe) {
        modalProvider.on('accountsChanged', (accounts: Array<string>) => {
          setWeb3State(_provider => ({
            ..._provider,
            account: accounts[0],
          }));
        });
        modalProvider.on('chainChanged', () => {
          setWeb3Provider(modalProvider);
        });
      }
    } catch (error) {
      logError({ web3ModalError: error });
    }
    setLoading(false);
  }, [setWeb3Provider]);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();
    setWeb3State({});
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    (async function load() {
      if ((await web3Modal.canAutoConnect()) || web3Modal.cachedProvider) {
        connectWeb3();
      } else {
        setLoading(false);
      }
    })();
  }, [connectWeb3]);

  return (
    <Web3Context.Provider
      value={{
        ethersProvider,
        connectWeb3,
        loading,
        disconnect,
        providerChainId,
        account,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
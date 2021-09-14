import { useState, useEffect } from 'react'
import Onboard from 'bnc-onboard'
import { API, Initialization, Wallet } from 'bnc-onboard/dist/src/interfaces'
import { Web3Provider } from '@ethersproject/providers'

/**
 * A React Web3 wallet hook for [Onboard.js](https://blocknative.com/onboard) library.
 */
export const useOnboard = (
  {
    options,
    initialData
  }: {
    options?: Initialization & { networkId?: number }
    initialData?: Partial<{ address: string; balance: string }>
  } = {
    options: { networkId: 1 },
    initialData: {}
  }
) => {
  const [onboard, setOnboard] = useState<API>()
  const [wallet, setWallet] = useState<Wallet>()
  const [address, setAdress] = useState<string>(initialData?.address || '')
  const [balance, setBalance] = useState<string>(initialData?.balance || '0')
  const [isWalletSelected, setWalletSelected] = useState<boolean>()
  const [provider, setProvider] = useState<Web3Provider>()

  useEffect(() => {
    setOnboard(
      Onboard({
        ...options,
        networkId: options?.networkId || 1,
        subscriptions: {
          ...options?.subscriptions,
          wallet: wallet => {
            options?.subscriptions?.wallet?.(wallet)

            if (wallet.provider && wallet.name) {
              setWallet(wallet)

              const ethersProvider = new Web3Provider(wallet.provider)

              window.localStorage.setItem('selectedWallet', wallet.name)

              setProvider(ethersProvider)
            } else {
              setProvider(null)
              setWallet(null)
              window.localStorage.removeItem('selectedWallet')
            }
          },
          address: address => {
            options?.subscriptions?.address?.(address)
            if (address) setAdress(address)
          },
          balance: balance => {
            options?.subscriptions?.balance?.(balance)
            if (isWalletSelected) setBalance(balance)
          }
        }
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem('selectedWallet')

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet).then(() => {
        setWalletSelected(true)
      })
    }
  }, [onboard])

  const selectWallet = async () => {
    if (!isWalletSelected && onboard) {
      await onboard.walletSelect()

      await onboard.walletCheck()

      setWalletSelected(true)

      onboard.config({ darkMode: true, networkId: 1 })
    }
  }

  const disconnectWallet = () => {
    if (onboard) {
      onboard.walletReset()

      setWalletSelected(false)
      setBalance(null)
      setAdress(null)

      window.localStorage.removeItem('selectedWallet')
    }
  }

  return { onboard, wallet, address, selectWallet, balance, isWalletSelected, provider, disconnectWallet }
}

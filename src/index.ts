import { useState, useEffect } from 'react'
import Onboard from 'bnc-onboard'
import { API, Initialization, Wallet } from 'bnc-onboard/dist/src/interfaces'

import { ethers } from 'ethers'

let provider: ethers.providers.Provider

export const useOnboard = (
  {
    options,
    initialData
  }: {
    options?: Initialization & { networkId?: number }
    initialData?: Partial<{ address: string; balance: number }>
  } = {
    options: { networkId: 1 },
    initialData: {}
  }
) => {
  const [onboard, setOnboard] = useState<API>()
  const [wallet, setWallet] = useState<Wallet>()
  const [address, setAdress] = useState<string>(initialData?.address)
  const [balance, setBalance] = useState<number>(initialData?.balance)
  const [isWalletSelected, setWalletSelected] = useState<boolean>()

  useEffect(() => {
    setOnboard(
      Onboard({
        ...options,
        subscriptions: {
          ...options.subscriptions,
          wallet: wallet => {
            options.subscriptions?.wallet?.(wallet)

            if (wallet.provider) {
              setWallet(wallet)

              const ethersProvider = new ethers.providers.Web3Provider(wallet.provider)

              window.localStorage.setItem('selectedWallet', wallet.name)

              provider = ethersProvider
            } else {
              provider = null
              setWallet(null)
              window.localStorage.removeItem('selectedWallet')
            }
          },
          address: address => {
            options.subscriptions?.address?.(address)
            if (address) setAdress(address)
          },
          balance: balance => {
            options.subscriptions?.balance(balance)
            setBalance(parseInt(balance) / 10 ** 18)
          }
        }
      })
    )
  }, [options])

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem('selectedWallet')

    if (previouslySelectedWallet && onboard) {
      setWalletSelected(true)
      onboard.walletSelect(previouslySelectedWallet)
    }
  }, [onboard])

  const selectWallet = async () => {
    await onboard.walletSelect()

    await onboard.walletCheck()

    setWalletSelected(true)

    onboard.config({ darkMode: true, networkId: 1 })
  }

  const disconnectWallet = () => {
    onboard.walletReset()

    setWalletSelected(false)
    setBalance(undefined)
    setAdress(undefined)

    window.localStorage.removeItem('selectedWallet')
  }

  return { onboard, wallet, address, selectWallet, balance, isWalletSelected, provider, disconnectWallet }
}

# use-onboard

A React Web3 wallet hook for [Onboard.js](https://blocknative.com/onboard) library.

## Features

- Fully configurable as much as Onboard itself
- `selectWallet` and `disconnectWallet` functions to manage wallet state
- Optional `initialData` to pass for initial `address` and `balance` values while wallet is loading

## Install

```sh
pnpm i use-onboard
```

## Example

```jsx
import React from 'react'
import { useWallet } from 'use-onboard'

const App = ({ initialData }) => {
  // in case you are authorized before this won't ask to login from the wallet
  const { selectWallet, address, isWalletSelected, disconnectWallet, balance } = useWallet({
    options: {
      dappId: process.env.DAPP_ID, // The API key created by step one above
      networkId: 1, // The Ethereum network ID your Dapp uses.
      walletSelect: {
        wallets: WALLETS
      }
    },
    initialData // optional initial to data to pass while wallet is loading
  })

  return (
    <div>
      {
        <button
          onClick={async () => {
            if (isWalletSelected) {
              disconnectWallet()
            } else {
              await selectWallet()
            }
          }}
        >
          {isWalletSelected ? 'Disconnect' : 'Connect'}
        </button>
      }
      <p>Address: {address}</p>
      <p>Balance: {balance} ETH</p>
    </div>
  )
}
```

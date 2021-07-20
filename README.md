<div align="center">

# _`useOnboard()`_

<br />
<img src="https://raw.githubusercontent.com/talentlessguy/use-onboard/master/logo.svg" height="200px" />

[![NPM][npm-badge]][npm-url] [![NPM][dl-badge]][npm-url] [![radicle][Radicle]][radicle-link]

A React Web3 wallet hook for [Onboard.js](https://blocknative.com/onboard) library.

<br />
</div>

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
import { useOnboard } from 'use-onboard'

const App = ({ initialData }) => {
  // in case you are authorized before this won't ask to login from the wallet
  const { selectWallet, address, isWalletSelected, disconnectWallet, balance } = useOnboard({
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
            if (isWalletSelected) disconnectWallet()
            else await selectWallet()
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

[npm-badge]: https://img.shields.io/npm/v/use-onboard?style=for-the-badge&color=4E8EE9&label=&logo=npm
[npm-url]: https://npmjs.com/package/use-onboard/swagger
[dl-badge]: https://img.shields.io/npm/dt/use-onboard?style=for-the-badge&color=4E8EE9
[radicle-link]: radicle://link/v0/rad:git:hnrkk4d16rqusj9o5qfm1mdjxj4uy5o1e7q5y
[radicle]: https://img.shields.io/badge/🌱%20hosted%20on-radicle-4E8EE9?style=for-the-badge

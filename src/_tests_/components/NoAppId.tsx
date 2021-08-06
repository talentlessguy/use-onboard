import React from 'react'
import { useOnboard } from '../../index'

const NoAppId = () => {
  // in case you are authorized before this won't ask to login from the wallet
  const { selectWallet, address, isWalletSelected, disconnectWallet, balance } = useOnboard({
    options: {
      networkId: 1 // Ethereum network ID
    }
  })

  return (
    <div>
      {
        <button
          onClick={async () => {
            if (isWalletSelected) disconnectWallet()
            else await selectWallet()
          }}>
          connection button
        </button>
      }
      <p>walletSelected: {isWalletSelected ? 'Disconnect' : 'Connect'}</p>
      <p>Address: {address}</p>
      <p>Balance: {balance} ETH</p>
    </div>
  )
}

export { NoAppId }

import { render, screen } from '@testing-library/react'
import { NoAppId } from './components/NoAppId'
import '@testing-library/jest-dom/extend-expect'

test('isWalletSelected should be false by default', () => {
  render(<NoAppId />)
  const isWalletSelected = screen.getByText(/^walletSelected:/)
  expect(isWalletSelected).toHaveTextContent(`walletSelected: Connect`)
})

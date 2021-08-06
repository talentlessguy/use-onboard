import { render, screen } from '@testing-library/react'
import { NoAppId } from './components/NoAppId'
import '@testing-library/jest-dom/extend-expect'

// eslint-disable-next-line no-undef
test('isWalletSelected should be false by default', () => {
  render(<NoAppId />)
  const isWalletSelected = screen.getByText(/^walletSelected:/)
  // eslint-disable-next-line no-undef
  expect(isWalletSelected).toHaveTextContent(`walletSelected: Connect`)
})

import { render } from '@testing-library/react'
import { useOnboard } from '../index.ts'
import Ganache from 'ganache-cli'
import '@testing-library/jest-dom/extend-expect'

function setup() {
  const returnVal = {}
  function TestComponent() {
    Ganache.provider()
    Object.assign(returnVal, useOnboard())
    return null
  }
  render(<TestComponent />)
  return returnVal
}

// eslint-disable-next-line no-undef
test('isWalletSelected should be false by default', () => {
  const defaultReturnedValues = setup()
  // eslint-disable-next-line no-undef
  expect(defaultReturnedValues.isWalletSelected).toBe(false)
})

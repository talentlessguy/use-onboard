import { render } from '@testing-library/react'
import { useOnboard } from '../src/index'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ganache from 'ganache-cli'
import '@testing-library/jest-dom/extend-expect'

function setup() {
  const returnVal: any = {}
  function TestComponent() {
    Ganache.provider()
    Object.assign(returnVal, useOnboard())
    return null
  }
  render(<TestComponent />)
  return returnVal
}

// // eslint-disable-next-line no-undef
// test('isWalletSelected should be false by default', () => {
//   const defaultReturnedValues = setup()
//   // eslint-disable-next-line no-undef
//   expect(defaultReturnedValues.isWalletSelected).toBe(false)
// })
describe('defaults', () => {
  describe('isWalletSelected should be false by default', () => {
    const defaultReturnedValues = setup()
    // eslint-disable-next-line no-undef
    expect(defaultReturnedValues.isWalletSelected).toBe(false)
  })
})

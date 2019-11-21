import { notExtendPeriod } from './utils'

describe('notExtendPeriod', () => {
  it('notExtendPeriod', () => {
    const extend_period = 1
    expect(notExtendPeriod(extend_period)).toBeFalsy()
  })
})

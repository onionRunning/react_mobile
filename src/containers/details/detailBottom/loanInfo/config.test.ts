import { LoanInfoColumns } from './config'

describe('config', () => {
  it('LoanInfoColumns 0', () => {
    expect(LoanInfoColumns[0].render!('2019-11-15T16:50:07+08:00')).toBe('2019-11-15 16:50:07')
  })

  it('LoanInfoColumns 1', () => {
    expect(LoanInfoColumns[1].render!('2019-11-15T16:50:07+08:00')).toBe('2019-11-15 16:50:07')
  })
})

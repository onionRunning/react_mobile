import { RepaymentInfoColumns } from './config'

describe('config', () => {
  it('RepaymentInfoColumns', () => {
    expect(RepaymentInfoColumns[0].render!('2019-12-04T17:39:24+08:00')).toBe('2019-12-04 17:39:24')
  })
})

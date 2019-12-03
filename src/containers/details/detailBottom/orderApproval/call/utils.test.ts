import { Columns } from './utils'

describe('utils', () => {
  it('Columns 0', () => {
    expect(Columns[0].render!('2019-12-02T14:30:28+08:00')).toBe('2019-12-02 14:30:28')
  })
})

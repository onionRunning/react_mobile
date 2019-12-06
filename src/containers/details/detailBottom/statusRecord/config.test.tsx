import { getTableTitle } from './config'

describe('config', () => {
  it('getTableTitle 0', () => {
    expect(getTableTitle(() => '')[0].render!('1', {}, 0)).toBe('1')
  })

  it('getTableTitle 1', () => {
    expect(getTableTitle(() => '')[1].render!('CreateApplication')).toBe('Create Application')
  })

  it('getTableTitle 3', () => {
    expect(getTableTitle(() => '')[3].render!('2019-11-15T16:50:07+08:00')).toBe('2019-11-15 16:50:07')
  })
})

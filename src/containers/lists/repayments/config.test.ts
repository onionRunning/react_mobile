import * as Function from './config'

describe('const', () => {
  it('getBtn', () => {
    expect(Function.getBtn().length).toBeGreaterThan(0)
  })
  it('getTableTitle', () => {
    const cb = jest.fn()
    expect(Function.getTableTitle(cb).length).toBeGreaterThan(0)
  })
})

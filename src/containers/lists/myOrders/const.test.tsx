import * as con from './const'

describe('const', () => {
  it('setName', () => {
    expect(con.setName(' Gggy Gggh ')).toBe('Gggy Gggh')
  })
  it('setTime', () => {
    expect(con.setTime('2019-09-11T15:51:00+05:30')).toBe('2019-09-11 15:51:00')
  })
  it('setProduct', () => {
    expect(con.setProduct('QuickRupee')).toEqual('MQuickRupee')
    expect(con.setProduct('GotoCash')).toEqual('GotoCash')
  })
})

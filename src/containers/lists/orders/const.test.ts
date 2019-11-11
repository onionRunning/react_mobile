import * as con from './const'

describe('const test', () => {
  it('AllIdType', () => {
    expect(con.AllIdType.length).toEqual(8)
  })
  it('TimeRange', () => {
    expect(Object.keys(con.TimeRange('x', 'y'))).toEqual(['start', 'end'])
  })
  it('OrderAllStatus', () => {
    expect(con.OrderAllStatus.length).toEqual(12)
  })
  it('OrderTypes', () => {
    expect(con.OrderTypes.length).toEqual(2)
  })
  it('getSortValue', () => {
    expect(con.getSortValue(con.ASC)).toEqual(con.ASC_CHOSE)
    expect(con.getSortValue(con.DESC)).toEqual(con.DESC_CHOSE)
    expect(con.getSortValue('')).toEqual('')
  })
})

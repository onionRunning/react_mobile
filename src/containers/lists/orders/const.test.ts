import * as con from './const'

describe('const test', () => {
  it('AllIdType', () => {
    expect(con.AllIdType.length).toEqual(5)
  })
  it('TimeRange', () => {
    expect(Object.keys(con.TimeRange('x', 'y'))).toEqual(['start', 'end'])
  })
  it('OrderAllStatus', () => {
    expect(con.OrderAllStatus.length).toEqual(8)
  })
  it('OrderTypes', () => {
    expect(con.OrderTypes.length).toEqual(2)
  })
  it('getSortValue', () => {
    expect(con.getSortValue(con.ASC)).toEqual(con.ASC_CHOSE)
    expect(con.getSortValue(con.DESC)).toEqual(con.DESC_CHOSE)
    expect(con.getSortValue('')).toEqual('')
  })

  it('addFont 1', () => {
    expect(con.addFont([{ key: '1' }]).length).toEqual(2)
  })
  it('addFont spec not empty', () => {
    expect(con.addFont([], 'true')[0].value).toEqual('0')
  })
  it('handArr', () => {
    expect(con.handArr([1, 2, 3]).length).toEqual(3)
  })
  it('handArr 2', () => {
    const k: any = {}
    expect(con.handArr(k).length).toEqual(1)
  })
  it('handerPerson ', () => {
    expect(con.handerPerson([{ name: 1, id: 2 }]).length).toEqual(1)
  })

  it('filterPerson ', () => {
    expect(con.filterPerson([{ name: 1, value: 0 }]).length).toEqual(1)
    expect(con.filterPerson([{ name: 1, value: 1 }]).length).toEqual(2)
  })
  it('handleData ', () => {
    expect(con.handleData([{ key: 'test' }, { key: 'add' }], 'add')).toEqual(1)
  })
  it('handlerSelectCont ', () => {
    const config = [
      { key: 'test', data: '' },
      { key: 'operator_id', data: '' },
      { key: 'product_name', data: '' },
      { key: 'loan_days', data: '' }
    ]
    const person = [{ id: 1, name: 'hj' }]
    const temp = con.handlerSelectCont(config, '', person)
    expect(temp[con.handleData(config, 'operator_id')].data.length).toEqual(2)

    const product = { loan_days: [], products: [] }
    const temp2 = con.handlerSelectCont(config, product, person)
    expect(temp2[con.handleData(config, 'product_name')].data.length).toEqual(0)
    expect(temp2[con.handleData(config, 'loan_days')].data.length).toEqual(0)
  })
})

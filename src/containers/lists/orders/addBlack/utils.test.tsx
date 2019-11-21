import * as utils from './utils'
const findTitle = (cont: any[], name: string) => {
  return cont.filter(item => item.title === name)[0]
}

describe('const test', () => {
  it('AllIdType', () => {
    expect(utils.turnToNumber.length).toEqual(1)
  })
  it('reflectStr', () => {
    expect(utils.reflectStr('')).toEqual('')
    expect(utils.reflectStr('ManuallyAddedBlacklist/OverdueBlacklist')).toEqual('BlackList 1,BlackList 2')
  })
  it('tabBlackTitle', () => {
    expect(utils.tabBlackTitle().length).toEqual(11)
  })
  it('tabBlackTitle 1', () => {
    expect(findTitle(utils.tabBlackTitle(), 'Order type').render({})).toEqual('')
  })
  it('tabBlackTitle 2', () => {
    expect(findTitle(utils.tabBlackTitle(), 'Review time').render('2019-10-10T08:10:10').props).toEqual({
      children: '2019-10-10 08:10:10'
    })
  })
  it('tabBlackTitle 3', () => {
    expect(findTitle(utils.tabBlackTitle(), 'tag').render('123').props).toEqual({ children: '123' })
  })
  it('searchBlackConfig', () => {
    expect(utils.searchBlackConfig.length).toEqual(6)
  })

  it('blackBtnItems', () => {
    expect(utils.blackBtnItems().length).toEqual(2)
  })

  it('getOrderNo', () => {
    expect(utils.getOrderNo([1, 2, 3], [{ id: 1, order_no: 'xx' }])).toEqual(['xx'])
  })
})

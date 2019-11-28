import * as utils from './utils'

const findTitle = (cont: any[], name: string) => {
  return cont.filter(item => item.title === name)[0]
}
describe('const test', () => {
  it('AllIdType', () => {
    expect(utils.turnToNumber.length).toEqual(2)
  })

  it('btnItems', () => {
    expect(utils.btnItems().length).toEqual(1)
  })

  it('getTabTitle', () => {
    expect(utils.getTabTitle(() => {}).length).toEqual(12)
    expect(findTitle(utils.getTabTitle(() => {}), 'Order type').render('xx').props).toEqual({ children: undefined })
  })
  it('getTabTitle2', () => {
    expect(findTitle(utils.getTabTitle(() => {}), 'Application time').render('xx').type).toEqual('span')
  })
  it('getTabTitle3', () => {
    expect(findTitle(utils.getTabTitle(() => {}), 'Review time').render('xx').type).toEqual('span')
  })
  it('getTabTitle4', () => {
    expect(findTitle(utils.getTabTitle(() => {}), 'Review Status').render('xx').type).toEqual('span')
  })
  it('getTabTitle5', () => {
    expect(findTitle(utils.getTabTitle(() => {}), 'Operating').render('xx').type).toEqual('span')
  })
  it('initRequest', () => {
    expect(Object.keys(utils.initRequest).length).toEqual(5)
  })
})

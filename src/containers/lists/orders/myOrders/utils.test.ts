import * as utils from './utils'

const clickCallback = jest.fn()

describe('const test', () => {
  it('AllIdType', () => {
    expect(utils.getTableTitle(clickCallback).length).toEqual(10)
  })
  it('render time', () => {
    const tbs = utils.getTableTitle(clickCallback).filter(item => item.title === 'Application time')[0]
    expect(tbs.render!('2019-10-10T10:10:10', {}, 1)).toBeTruthy()
  })

  it('render status', () => {
    const tbs = utils.getTableTitle(clickCallback).filter(item => item.title === 'Status')[0]
    expect(tbs.render!('xxxxxxx', {}, 1)).toBeTruthy()
  })

  it('render Operating', () => {
    const tbs = utils.getTableTitle(clickCallback).filter(item => item.title === 'Operating')[0]
    expect(tbs.render!('xxxxxxx', {}, 1)).toBeTruthy()
  })

  it('filterData', () => {
    expect(utils.filterData.length).toEqual(7)
  })
})

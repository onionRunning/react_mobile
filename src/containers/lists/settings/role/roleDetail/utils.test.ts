import { arrRemoveArr, arrRemoveDuplicate, getChildrenIds } from './utils'

describe('utils', () => {
  it('arrRemoveArr', () => {
    expect(arrRemoveArr([1, 2], [1])).toEqual([2])
  })

  it('arrRemoveDuplicate', () => {
    expect(arrRemoveDuplicate([1, 1, 2])).toEqual([1, 2])
  })

  it('getChildrenIds', () => {
    const role = {
      id: 1,
      name: 'Order',
      notes: '订单模块',
      number: 1,
      parentNumber: 0,
      siblingsHasChild: true,
      children: [
        {
          id: 6,
          name: 'Order list',
          notes: '订单列表',
          number: 101,
          parentNumber: 1,
          siblingsHasChild: false
        }
      ]
    }
    expect(getChildrenIds(role, [])).toEqual([1, 6])
  })
})

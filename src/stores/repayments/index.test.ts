import Repayments from './index'
import api from '../../api'

jest.mock('api')
const getListsSuccess = () => {
  return new Promise(resolve => {
    resolve({ success: true, data: { repayment: [1, 2], total_count: 2 } })
  })
}

describe('repayments store', () => {
  let instance: Repayments
  beforeEach(() => {
    instance = new Repayments()
  })
  it('getRepaymentList', () => {
    api.getRepaymentList = getListsSuccess as any
    instance.getRepaymentList({
      page: 1,
      per_page: 10
    })
    expect(instance.page_count).toEqual(10)
    expect(instance.page).toEqual(1)
    // expect(instance.lists.length).toEqual(1)
  })
})
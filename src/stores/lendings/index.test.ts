import Lendings from './index'
import api from '../../api'

jest.mock('api')
const getListsSuccess = () => {
  return new Promise(resolve => {
    resolve({
      success: true,
      data: { loan_list: [{ loan: { id: '1' }, loan_flow: { amount: 2000 } }], total_count: 1 }
    })
  })
}
const requestAutoSuccess = () => {
  return new Promise(resolve => {
    resolve({ success: true, data: true })
  })
}
const requestSuccess = () => {
  return new Promise(resolve => {
    resolve({ success: true })
  })
}
const requestError = () => {
  return new Promise(resolve => {
    resolve({ success: false })
  })
}
describe('lendings', () => {
  let instance: Lendings
  beforeEach(() => {
    instance = new Lendings()
  })
  it('getLendingList 请求成功', async () => {
    api.getLendingLists = getListsSuccess as any
    await instance.getLendingList({
      page: 1,
      per_page: 10
    })
    expect(instance.total_count).toEqual(1)
    expect(instance.lendingList.length).toEqual(1)
  })
  it('getLendingList 请求错误', async () => {
    api.myOrders = requestError as any
    expect(await instance.getLendingList({})).toBeUndefined()
  })
  it('checkAutoStatus', async () => {
    api.getAutoStatus = requestAutoSuccess as any
    const cb = jest.fn()
    await instance.checkAutoStatus(cb)
    expect(cb).toBeCalled()
  })
  it('UpdateAutoStatus', async () => {
    const cb = jest.fn()
    api.updateAutoStatus = requestSuccess as any
    await instance.UpdateAutoStatus({ config_value: 'on' }, cb)
    expect(cb).toBeCalled()
  })
  it('createCancelLoan', async () => {
    const cb = jest.fn()
    const req = {
      order_no: '111',
      operator: 'admin',
      operator_id: 123
    }
    api.getCancelLoan = requestSuccess as any
    await instance.createCancelLoan(req, cb)
    expect(cb).toBeCalled()
  })
  it('createLoanRetry', async () => {
    const cb = jest.fn()
    const req = {
      order_no: '111',
      operator: 'admin',
      operator_id: 123
    }
    api.getLoanOrRetry = requestSuccess as any
    await instance.createLoanRetry(req, cb)()
    expect(cb).toBeCalled()
  })
})

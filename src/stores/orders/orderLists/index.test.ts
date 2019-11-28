import OrderLists from './index'
import api from '../../../api'

jest.mock('api')
const getOrderListsSuccess = () => {
  return new Promise(resolve => {
    resolve({ success: true, data: { list: [1, 2] } })
  })
}
const requestSuccess = () => {
  return new Promise(resolve => {
    resolve({ success: true, data: [2] })
  })
}
const requestError = () => {
  return new Promise(resolve => {
    resolve({ success: false })
  })
}
describe('my orders', () => {
  let ins: OrderLists
  beforeEach(() => {
    ins = new OrderLists()
  })
  it('getOrderLists', async () => {
    api.getOrderList = getOrderListsSuccess as any
    await ins.getOrderLists({})
    expect(ins.lists.length).toBe(2)
  })
  it('getOrderLists2', async () => {
    api.getOrderList = requestError as any
    await ins.getOrderLists({})
    expect(ins.lists.length).toBe(0)
  })
  it('clearData', async () => {
    await ins.clearData()
    expect(ins.lists.length).toEqual(0)
  })

  it('getOperateUser', async () => {
    api.getPersonApprove = requestSuccess as any
    await ins.getOperateUser()
    expect(ins.users.length).toEqual(1)
  })
  it('getOperateUser2', async () => {
    api.getPersonApprove = requestError as any
    await ins.getOperateUser()
    expect(ins.users.length).toEqual(0)
  })
})

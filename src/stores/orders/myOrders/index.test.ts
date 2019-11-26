import MyOrders from './index'
import api from '../../../api'

jest.mock('api')
const getMyOrdersSuccess = () => {
  return new Promise(resolve => {
    resolve({ success: true, data: { list: [1, 2] } })
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
describe('my orders', () => {
  let ins: MyOrders
  beforeEach(() => {
    ins = new MyOrders()
  })
  it('getMyOrderLists', async () => {
    api.myOrders = getMyOrdersSuccess as any
    await ins.getMyOrderLists({})
    expect(ins.myOrderLists.length).toBe(2)
  })
  it('getMyOrderLists2', async () => {
    api.myOrders = requestError as any
    await ins.getMyOrderLists({})
  })

  const props: any = {
    successCb: jest.fn(),
    errCb: jest.fn()
  }
  it('getGrabOrder', async () => {
    api.grabOrders = requestSuccess as any
    await ins.getGrabOrder({}, props)
    expect(props.successCb).toBeCalled()
  })
  it('getGrabOrder2', async () => {
    api.grabOrders = requestError as any
    await ins.getGrabOrder({}, props)
    expect(props.errCb).toBeCalled()
  })
  it('clearMyOrdersData', async () => {
    await ins.clearMyOrdersData()
    expect(ins.myOrderLists.length).toEqual(0)
  })
})

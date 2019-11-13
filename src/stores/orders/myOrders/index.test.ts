import MyOrders from './index'
import api from '../../../api'

jest.mock('api')
api.myOrders = (): any => {
  return new Promise(resolve => {
    resolve({
      success: true,
      data: {}
    })
  })
}

describe('my orders', () => {
  let ins: MyOrders
  beforeEach(() => {
    ins = new MyOrders()
  })
  it('getMyOrderLists', () => {
    ins.getMyOrderLists({})
  })
})

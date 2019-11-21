import CheckRepeat from './index'
import api from '../../../api'

jest.mock('api')
const getListsSuccess = () => {
  return new Promise(resolve => {
    resolve({
      success: true,
      data: '{"CheckAndOther": [{ order_no: "test" }] }'
    })
  })
}
const requestError = () => {
  return new Promise(resolve => {
    resolve({ success: false })
  })
}
describe('CheckRepeat', () => {
  let instance: CheckRepeat
  beforeEach(() => {
    instance = new CheckRepeat()
  })
  // it('getCheckLists 请求成功', async () => {
  //   api.getRepeatList = getListsSuccess as any
  //   const cb = jest.fn()
  //   expect(await instance.getCheckLists({order_no: '111'}, cb)).not.toBeUndefined()
  // })
  it('getCheckLists 请求错误', async () => {
    api.myOrders = requestError as any
    const cb = jest.fn()
    expect(await instance.getCheckLists({ order_no: '1111' }, cb)).toBeUndefined()
  })
  it('retryChecklists 请求成功', async () => {
    api.checkRepeatList = getListsSuccess as any
    instance.getCheckLists = jest.fn()
    const cb = jest.fn()
    await instance.retryChecklists(
      {
        order_no: '111'
      },
      cb
    )
    expect(instance.getCheckLists).toBeCalled()
  })
})

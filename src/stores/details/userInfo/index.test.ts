import UserDetail from './index'
import api from '../../../api'

jest.mock('api')
const getListsSuccess = () => {
  return new Promise(resolve => {
    resolve({
      success: true,
      data: {
        device_info: {},
        user_info: {
          name: 'test'
        },
        order_info: {},
        phl_extra_info: {}
      }
    })
  })
}
const getListsSuccessNoData = () => {
  return new Promise(resolve => {
    resolve({
      success: true
    })
  })
}
const requestError = () => {
  return new Promise(resolve => {
    resolve({ success: false })
  })
}
describe('userDetail', () => {
  let instance: UserDetail
  beforeEach(() => {
    instance = new UserDetail()
  })
  it('getUserInfo 请求成功', async () => {
    api.getUserInfo = getListsSuccess as any
    await instance.getUserInfo({ order_no: '111' })
    expect(instance.userInfo.name).toEqual('test')
  })
  it('getUserInfo 请求成功 没有data', async () => {
    api.getUserInfo = getListsSuccessNoData as any
    await instance.getUserInfo({ order_no: '111' })
    expect(instance.orderInfo.name).toBeUndefined()
  })
  it('getUserInfo 请求错误', async () => {
    api.getUserInfo = requestError as any
    expect(await instance.getUserInfo({ order_no: '111' })).toBeUndefined()
  })
})

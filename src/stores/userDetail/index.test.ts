import UserDetail from './index'
import api from '../../api'

jest.mock('api')
const getListsSuccess = () => {
  return new Promise(resolve => {
    resolve({
      success: true,
      data: {
        order_msg: {
          sign_name_file_url: 'test'
        },
        user_msg: {},
        work: {},
        personal: {},
        id: {},
        device_info: {},
        contact: {},
        account: {},
        score_card_results: {},
        total_count: 1
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
    await instance.getUserInfo({ order_no: '111', customer_id: '111' }, 'orders')
    expect(instance.order_msg.sign_name_file_url).toEqual('test')
  })
  it('getUserInfo 请求成功 没有data', async () => {
    api.getUserInfo = getListsSuccessNoData as any
    await instance.getUserInfo({ order_no: '111', customer_id: '111' }, 'orders')
    expect(instance.order_msg.sign_name_file_url).toBeUndefined()
  })
  it('getUserInfo 请求错误', async () => {
    api.getUserInfo = requestError as any
    expect(await instance.getUserInfo({ order_no: '111', customer_id: '111' }, 'orders')).toBeUndefined()
  })
})

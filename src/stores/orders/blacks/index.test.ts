import Blacks from './index'
import api from '../../../api'

jest.mock('api')
const getSuccess = () => {
  return new Promise(resolve => {
    resolve({ success: true, data: { application_list: [1, 2] } })
  })
}
const getBlackListsSuccess = () => {
  return new Promise(resolve => {
    resolve({ success: true, data: { data: [1, 2] } })
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
  let ins: Blacks
  const addCb = jest.fn()
  const removeCb = jest.fn()
  beforeEach(() => {
    ins = new Blacks()
  })
  it('getMyOrderLists', async () => {
    api.queryBlacklistManagementLists = getSuccess as any
    await ins.getBlackMngLists({})
    expect(ins.blackMngLists.length).toBe(2)
  })
  it('getMyOrderLists2', async () => {
    api.queryBlacklistManagementLists = requestError as any
    await ins.getBlackMngLists({})
    expect(ins.blackMngLists.length).toBe(0)
  })
  it('addBlackMngOrder1', async () => {
    api.addBlacklist = requestSuccess as any
    await ins.addBlackMngOrder({}, addCb)
    expect(addCb).toBeCalledWith()
  })
  it('addBlackMngOrder1', async () => {
    api.addBlacklist = requestError as any
    await ins.addBlackMngOrder({}, addCb)
  })
  it('getBlackLists', async () => {
    api.queryBlacklists = getBlackListsSuccess as any
    await ins.getBlackLists({})
    expect(ins.blackLists.length).toBe(2)
  })
  it('getBlackLists2', async () => {
    api.queryBlacklists = requestError as any
    await ins.getBlackLists({})
    expect(ins.blackLists.length).toBe(0)
  })

  it('removeBlackList', async () => {
    api.removeBlacklist = requestSuccess as any
    await ins.removeBlackList({}, removeCb)
    expect(removeCb).toBeCalledWith()
  })
  it('removeBlackList2', async () => {
    api.removeBlacklist = requestError as any
    await ins.removeBlackList({}, removeCb)
  })

  it('clearblackMng', () => {
    ins.clearblackMng()
    expect(ins.blackMngLists.length).toBe(0)
  })
  it('clearBlackList', () => {
    ins.clearBlackList()
    expect(ins.blackLists.length).toBe(0)
  })
})

import * as Function from './const'

const config = {
  p20101: true, // 自动放款开关
  p20102: true, // 下载放款列表
  p20103: true, // 确认手动放款
  p20104: true, // 重试放款
  p20105: true, // 贷款取消
  p20106: true // 批量放款
}
describe('const', () => {
  it('getBtn', () => {
    expect(Function.getBtn(config).length).toBeGreaterThan(0)
  })
  it('setTime', () => {
    expect(Function.setTime('2019-10-30T15:00:00+05:30')).toEqual('2019-10-30 15:00:00')
  })
  it('setName', () => {
    expect(Function.setName('test')).toEqual('test')
  })
  it('setStatus', () => {
    console.log(typeof Function.setStatus('LoanCanceled'))
    expect(Function.setStatus('LoanCanceled')).not.toBeUndefined()
  })
})

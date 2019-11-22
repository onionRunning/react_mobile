import * as Con from './config'

describe('config', () => {
  it('getCompanyAddress 不可用的对象', () => {
    expect(Con.getCompanyAddress({})).toEqual('')
  })
  it('getCompanyAddress 可用的对象', () => {
    const obj = {
      user_company_address: 'test',
      user_company_detailed_address: 'detail'
    }
    expect(Con.getCompanyAddress(obj)).toEqual('test detail')
  })
})

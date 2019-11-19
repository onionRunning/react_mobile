import * as Con from './config'

describe('config', () => {
  it('getCompanyAddress 不可用的对象', () => {
    expect(Con.getCompanyAddress({})).toEqual('')
  })
  it('getCompanyAddress 可用的对象', () => {
    const obj = {
      company_address: 'test',
      company_detail_address: 'detail'
    }
    expect(Con.getCompanyAddress(obj)).toEqual('test detail')
  })
})

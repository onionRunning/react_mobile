import * as method from './method'
describe('method', () => {
  it('decrypt sdf', () => {
    const str = 'sdf'
    const decryptStr = method.strEncrypt(str)
    // expect(decryptStr).toBe('')
    expect(method.strDecrypt(decryptStr)).toBe(str)
  })

  it('decrypt 1234', () => {
    const str = '12324'
    const decryptStr = method.strEncrypt(str)
    expect(method.strDecrypt(decryptStr)).toBe(str)
  })

  it('decrypt Qr20190416000002', () => {
    const str = 'Qr20190416000002'
    const decryptStr = method.strEncrypt(str)
    expect(method.strDecrypt(decryptStr)).toBe(str)
  })

  it('fixedTwo', () => {
    expect(method.fixedTwo(2)).toBe(2)
    expect(method.fixedTwo(2.22222)).toBe(2.22)
    expect(method.fixedTwo(2.22522)).toBe(2.22)
    expect(method.fixedTwo('2.22522')).toBe(2.22)
    expect(method.fixedTwo(0)).toBe(0)
    expect(method.fixedTwo(2059.7)).toBe(2059.7)
  })

  it('transformSort', () => {
    expect(method.transformSort('')).toBe('')
    expect(method.transformSort('descend')).toBe('desc')
    expect(method.transformSort('ascend')).toBe('asc')
  })
})

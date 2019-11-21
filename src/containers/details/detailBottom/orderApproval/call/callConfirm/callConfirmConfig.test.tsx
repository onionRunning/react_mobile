import * as Funtion from './config'

describe('Function', () => {
  it('handArr', () => {
    const detail = 'string'
    expect(Funtion.handArr(detail)).toEqual('string')
  })
  it('getStatus', () => {
    const status = 'fail'
    expect(Funtion.getStatus(status)).toEqual('fail')
  })
  it('InitParams', () => {
    const props = {
        call_id: '1'
      },
      state = {
        remark: 'remark',
        light: 'fail',
        detail: 'string'
      }
    expect(Funtion.InitParams(props, state).remark).toEqual('remark')
  })
  it('exsitArr', () => {
    const detail = [
      {
        name: 'name',
        back: 'back'
      }
    ]
    expect(Funtion.exsitArr(detail, [])).toBeFalsy()
  })
  it('justifyArr', () => {
    const detail = [
      {
        name: 'name',
        back: 'back'
      }
    ]
    expect(Funtion.justifyArr(detail, [], [])).toBeFalsy()
  })
  it('vertify', () => {
    const state = {
        status: '',
        selectValue: {
          value: 'test'
        }
      },
      info = jest.fn()
    expect(Funtion.vertify(info, state)).toBeTruthy()
    expect(info).toBeCalled()
  })
})

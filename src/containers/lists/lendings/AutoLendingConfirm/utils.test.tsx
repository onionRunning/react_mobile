import * as Function from './utils'

describe('Function', () => {
  it('turnToSwitchMsg', () => {
    const msg = {}
    expect(Function.turnToSwitchMsg(msg).length).toBe(0)
    const msg1 = [
      {
        name: 'AutoLoanSwitchForCashNiJuan',
        label: 'test',
        checked: true,
        value: 'on'
      }
    ]
    expect(Function.turnToSwitchMsg(msg1).length).toBe(1)
  })
})

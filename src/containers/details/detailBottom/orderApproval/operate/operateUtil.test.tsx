import * as Function from './utils'

describe('Function', () => {
  it('limitChooseNumber', () => {
    const limit = {
        Rejected: {
          min: 1
        },
        Return: {
          min: 1
        },
        'Loan cancellation': {
          min: 1
        }
      },
      type = 'Rejected',
      len = 1
    expect(Function.limitChooseNumber(limit, type, len)).toBeFalsy()
  })
  it('vertify', () => {
    const state = {
      application_status: ''
    }
    expect(Function.vertify(state).flag).toBeTruthy()

    const state1 = {
      application_status: 'Approved'
    }
    expect(Function.vertify(state1).flag).toBeFalsy()

    const state2 = {
      application_status: 'Loan cancellation',
      reasons: ''
    }
    expect(Function.vertify(state2).flag).toBeTruthy()
  })
  it('getFinConfig', () => {
    const all = {
        reject_reason: [],
        return_reason: [],
        cancel_reason: []
      },
      status = 'Rejected'
    expect(Function.getFinConfig(all, status).length).toBe(0)

    const status1 = 'Return'
    expect(Function.getFinConfig(all, status1).length).toBe(0)

    const status2 = 'Loan cancellation'
    expect(Function.getFinConfig(all, status2).length).toBe(0)

    const status3 = 'other'
    expect(Function.getFinConfig(all, status3).length).toBe(0)
  })
})

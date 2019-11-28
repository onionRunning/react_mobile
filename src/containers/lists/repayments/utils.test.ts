import * as Function from './uitls'
import errors from 'global/errors'

describe('repayments/utils', () => {
  it('vertifyRangeAmount', () => {
    const state0 = {
      start: -10,
      end: 2000
    }
    const state4 = {
      start: 2000,
      end: 1000
    }
    expect(Function.vertifyRangeAmount(state0.start, state0.end)).toEqual(errors.INPUT_CORRECT_START_AMOUNT)
    expect(Function.vertifyRangeAmount(state4.start, state4.end)).toEqual(errors.START_AMOUNT_LESS_THAN_END_AMOUNT)
  })
})

import * as Function from './const'
import errors from 'global/errors'

const config = {
  p20101: true, // 自动放款开关
  p20102: true, // 下载放款列表
  p20103: true, // 确认手动放款
  p20104: true, // 重试放款
  p20105: true, // 贷款取消
  p20106: true // 批量放款
}
export const orderStatus = {
  No: '', // 没有状态信息
  LoanFailed: 'Loan Failed', // 放款失败
  CreateLoan: 'Loan Create', // 创建放款单
  LoanProcessing: 'Loan Processing' // 放款中
}

describe('const', () => {
  // it('getBtn', () => {
  //   expect(Function.getBtn(config).length).toBeGreaterThan(0)
  // })
  it('setTime', () => {
    expect(Function.setTime('2019-10-30T15:00:00+05:30')).toEqual('2019-10-30 15:00:00')
  })
  it('setName', () => {
    expect(Function.setName('test')).toEqual('test')
  })
  it('setStatus', () => {
    expect(Function.setStatus('Create Loan')).not.toBeUndefined()
  })
  it('getMakeLoanText', () => {
    // 订单失败状态
    const element = {
      loan_status: 'Loan Failed',
      order_no: '111',
      product_name: 'name',
      loan_flow_status: 'Loan Faild',
      loan_pay_type: 'test',
      is_in_batch_loan: false // 批量放款
    }
    expect(Function.getMakeLoanText(element)).toEqual('Retry')
    // 创建状态
    const element1 = {
      loan_status: 'Create Loan',
      order_no: '111',
      product_name: 'name',
      loan_flow_status: 'Loan Faild',
      loan_pay_type: 'test'
    }
    expect(Function.getMakeLoanText(element1)).toEqual('Make Loan')
    // 其他状态
    const element2 = {
      loan_status: 'Loan Processing',
      order_no: '111',
      product_name: 'name',
      loan_flow_status: 'Loan Faild',
      loan_pay_type: 'test'
    }
    expect(Function.getMakeLoanText(element2)).toEqual('')
    // 其他状态
    const element3 = {
      loan_status: 'Create Loan',
      order_no: '111',
      product_name: 'name',
      loan_flow_status: 'Loan Faild',
      loan_pay_type: 'test'
    }
    expect(Function.getMakeLoanText(element3)).toEqual('Make Loan')
    // const config1 = {
    //   p20101: true, // 自动放款开关
    //   p20102: true, // 下载放款列表
    //   p20103: false, // 确认手动放款
    //   p20104: false, // 重试放款
    //   p20105: true, // 贷款取消
    //   p20106: true // 批量放款
    // }
    // 其他状态
    const element4 = {
      loan_status: 'Create Loan',
      order_no: '111',
      product_name: 'name',
      loan_flow_status: 'Loan Faild',
      loan_pay_type: 'test',
      is_in_batch_loan: true // 批量放款
    }
    expect(Function.getMakeLoanText(element4)).toEqual('Make Loan')
  })
  it('getCancleLoanText', () => {
    const element = {
      loan_status: 'Loan Failed',
      order_no: '111',
      product_name: 'name',
      is_in_batch_loan: false, // 批量放款,
      loan_flow_status: 'Loan Failed',
      loan_pay_type: 'test'
    }
    expect(Function.getCancleLoanText(element)).toEqual('Loan cancellation')
    const element1 = {
      loan_status: 'Create Loan',
      order_no: '111',
      product_name: 'name',
      is_in_batch_loan: false, // 批量放款
      loan_flow_status: '',
      loan_pay_type: 'test'
    }
    expect(Function.getCancleLoanText(element1)).toEqual('Loan cancellation')
    const element2 = {
      loan_status: 'other',
      order_no: '111',
      product_name: 'name',
      loan_flow_status: 'Loan Faild',
      loan_pay_type: 'test',
      is_in_batch_loan: false // 批量放款
    }
    expect(Function.getCancleLoanText(element2, config)).toEqual('')
    const element3 = {
      loan_status: 'Loan Processing',
      order_no: '111',
      product_name: 'name',
      loan_flow_status: 'test',
      loan_pay_type: 'OFFLINE_LOAN',
      is_in_batch_loan: false // 批量放款
    }
    expect(Function.getCancleLoanText(element3, config)).toEqual('Loan cancellation')
  })
  it('choseRight', () => {
    const type = 'cancel'
    expect(Function.choseRight(type).text).toEqual('Do you confirm the loan cancellation?')

    const type1 = 'makeOrRetry'
    expect(Function.choseRight(type1).text).toEqual('Do you confirm this loan disbursement?')
  })
  it('IsValid string', () => {
    expect(Function.IsValid('')).toBeTruthy()
  })
  it('IsValid undifined', () => {
    expect(Function.IsValid(undefined)).toBeTruthy()
  })
  it('vertify', () => {
    const state0 = {
      loan_amount_start: -10,
      loan_amount_end: 2000
    }
    const state1 = {
      loan_amount_start: 10,
      loan_amount_end: -2000
    }
    const state2 = {
      loan_amount_start: 1000
    }
    const state3 = {
      loan_amount_end: 2000
    }
    const state4 = {
      loan_amount_start: 2000,
      loan_amount_end: 1000
    }
    expect(Function.vertify(state0)).toEqual(errors.INPUT_CORRECT_START_AMOUNT)
    expect(Function.vertify(state1)).toEqual(errors.INPUT_CORRECT_END_AMOUNT)
    expect(Function.vertify(state2)).toEqual(errors.INPUT_END_AMOUNT)
    expect(Function.vertify(state3)).toEqual(errors.INPUT_START_AMOUNT)
    expect(Function.vertify(state4)).toEqual(errors.START_AMOUNT_LESS_THAN_END_AMOUNT)
  })
  it('showName', () => {
    expect(Function.showName('apply')).toEqual('Application time')
    expect(Function.showName('request_loan')).toEqual('Disbursement Requisition time')
    expect(Function.showName('actual_loan')).toEqual('Disbursement succeed time')
    expect(Function.showName('test')).toEqual('test')
  })
  it('commonVertify', () => {
    const state = {
        apply_start_date: '2019-01-23',
        apply_end_date: '2019-03-23'
      },
      type = 'apply'
    expect(Function.commonVertify(state, type)).toEqual(
      "Number of days between start and end in Application time can't be more than 30"
    )
  })
  it('vertifyTimes', () => {
    const state = {
      apply_start_date: '2019-09-1',
      apply_end_date: '2019-10-23'
    }
    expect(Function.vertifyTimes(state)).toEqual(
      "Number of days between start and end in Application time can't be more than 30"
    )
    const state1 = {
      apply_start_date: '2019-10-03',
      apply_end_date: '2019-10-23'
    }
    expect(Function.vertifyTimes(state1)).toBeUndefined()
  })
})

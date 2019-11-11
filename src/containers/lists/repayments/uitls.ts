import moment from 'moment'
import { RepaymentListReq } from 'api/params'
import { isNumber } from 'util'

const useless = {
  actual_loan_end_date: '',
  actual_loan_start_date: '',
  due_end_date: '',
  due_start_date: '',
  like_keyword: '',
  loan_amount_end: '',
  loan_amount_start: '',
  product_name: '',
  repayment_schedule_status: '',
  sort_order: '',
  sort_value: ''
}

//校验筛选条件是否全部为空
export const areAllParamsEmpty = (req: RepaymentListReq) => {
  const obj = { ...useless, ...req, page: '', per_page: '', sort_order: '', sort_value: '' }
  for (let k in obj) {
    if (obj[k as keyof typeof obj]) {
      return ''
    }
  }
  return 'Please select at least one option'
}

export const IsValid = (str: any): boolean => {
  return str === undefined || str === ''
}

//校验贷款金额
export const vertifyRangeAmount = (start?: number, end?: number): string | undefined => {
  if (isNumber(start) && start < 0) return 'please input the correct start of Loan Amount'
  if (isNumber(end) && end < 0) return 'please input the correct end of Loan Amount'
  if (isNumber(start) && !isNumber(end)) return 'please input the end of Loan Amount'
  if (isNumber(end) && !isNumber(start)) return 'please input the start of Loan Amount'
  if (isNumber(start) && isNumber(end) && start >= end) return "the start shouldn't be more the end in Loan Amount"
}
//校验时间段
export const vertifyTime = (start: string, end: string, name: string): false | string => {
  if (moment(start).isAfter(moment(), 'day')) return `start of ${name} can't be more than today `
  if (!start && end) return `please choose start of ${name}`
  if (start && !end) return `please choose end of ${name}`
  if (
    moment(end)
      .subtract(30, 'days')
      .isAfter(start)
  ) {
    return `Number of days between start and end in ${name} can't be more than 30`
  }

  return false
}
//校验还款时间段
export const vertifyAmountTime = (start: string, end: string, name: string): false | string => {
  if (!start && end) return `please choose start of ${name}`
  if (start && !end) return `please choose end of ${name}`
  if (moment(start).isAfter(moment(end), 'day')) return `start of ${name} can't be more than the end `
  if (
    name !== 'Due date' &&
    moment(end)
      .add(-30, 'd')
      .isAfter(moment(start))
  )
    return `Number of days between start and end in ${name}  can't be more than 30`
  return false
}

//检查是否显示线下还款按钮
export const showOfflineRepay = (status: string) => {
  return status === 'RsProcessing' || status === 'RsOverdue'
}

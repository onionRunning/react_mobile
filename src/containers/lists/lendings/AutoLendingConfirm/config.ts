export const autoLoanNoData = 'No configurable information'

// 显示自动放款开关
export const showSwitch = ['AutoLoanSwitchForCashNiJuan', 'AutoLoanSwitchForPeso2go', 'AutoLoanSwitchForJetPeso']

// 自动放款开关res对应的label
export const switchLabels = {
  AutoLoanSwitch: 'All',
  AutoLoanSwitchForCashNiJuan: 'CashNiJuan',
  AutoLoanSwitchForPeso2go: 'Peso2Go',
  AutoLoanSwitchForJetPeso: 'JetPeso'
}

// 开关状态
export const switchStatus = {
  on: 'on',
  off: 'off'
}
// on off type
export type OnOff = 'on' | 'off'

// 自动扣款配置interface
export interface StateInterface {
  switchMsg: SwitchInterface[]
}
// state interface
export interface SwitchInterface {
  available: string
  checked: boolean
  label: string
  value: OnOff
  id: number
  conf_type: string
  created_at: string
  deleted_at: string
  name: string
  remark: string
  remark_available: string
  updated_at: string
}

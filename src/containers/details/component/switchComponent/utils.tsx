import React from 'react'
import LoanInfo from 'containers/details/detailBottom/loanInfo'
import SMSRecord from 'containers/details/detailBottom/smsRecord'
import StatusRecord from 'containers/details/detailBottom/statusRecord'
import UserInfo from 'containers/details/detailTop/userInfo'
import CheckRepeat from 'containers/details/detailTop/checkRepeat'

const T = () => <div />

interface TabProps {
  [p: string]: any
}
export const TabConfig: TabProps = {
  Repayment: T,
  Loan: LoanInfo,
  'SMS record': SMSRecord,
  'Status record': StatusRecord,
  'Approve operate': T,
  'User info': UserInfo,
  'Mobile device information': T,
  'Duplicate checking detection': CheckRepeat
}

export const D_HEIGHT = 172
export const F_HEIGHT = 36
export const RADIO = 2

import React from 'react'
import MobileInfo from 'containers/details/mobileInfo'
import LoanInfo from 'containers/details/detailBottom/loanInfo'
import SMSRecord from 'containers/details/detailBottom/smsRecord'
import StatusRecord from 'containers/details/detailBottom/statusRecord'

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
  'User info': T,
  'Mobile device information': MobileInfo,
  'Duplicate checking detection': T
}

export const D_HEIGHT = 172
export const F_HEIGHT = 36
export const RADIO = 2

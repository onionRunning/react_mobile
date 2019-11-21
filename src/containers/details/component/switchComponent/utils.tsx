// import React from 'react'
import RepaymentInfo from 'containers/details/detailBottom/repayment'
import OrderApproval from 'containers/details/detailBottom/orderApproval'
import MobileInfo from 'containers/details/detailTop/mobileInfo'
import LoanInfo from 'containers/details/detailBottom/loanInfo'
import SMSRecord from 'containers/details/detailBottom/smsRecord'
import StatusRecord from 'containers/details/detailBottom/statusRecord'
import UserInfo from 'containers/details/detailTop/userInfo'
import CheckRepeat from 'containers/details/detailTop/checkRepeat'

interface TabProps {
  [p: string]: any
}
export const TabConfig: TabProps = {
  Repayment: RepaymentInfo,
  Loan: LoanInfo,
  'SMS record': SMSRecord,
  'Status record': StatusRecord,
  'Approve operate': OrderApproval,
  'User info': UserInfo,
  'Mobile device information': MobileInfo,
  'Duplicate checking detection': CheckRepeat
}

export const D_HEIGHT = 172
export const F_HEIGHT = 36
export const RADIO = 2

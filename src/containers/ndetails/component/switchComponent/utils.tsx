import React, { ComponentClass } from 'react'
import UserInfo from 'containers/ndetails/detailTop/userInfo'
import CheckRepeat from 'containers/ndetails/detailTop/checkRepeat'

const T = () => <div />

interface TabProps {
  [p: string]: ComponentClass<{}> | React.FC<{}> | any
}
export const TabConfig: TabProps = {
  Repayment: T,
  Loan: T,
  'SMS record': T,
  'Status record': T,
  'Approve operate': T,
  'User info': UserInfo,
  'Mobile device information': T,
  'Duplicate checking detection': CheckRepeat
}

export const D_HEIGHT = 172
export const F_HEIGHT = 36
export const RADIO = 2

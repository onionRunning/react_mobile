import React, { ComponentClass } from 'react'

const T = () => <div />

interface TabProps {
  [p: string]: ComponentClass<{}> | React.FC<{}>
}
export const TabConfig: TabProps = {
  Repayment: T,
  Loan: T,
  'SMS record': T,
  'Status record': T,
  'Approve operate': T,
  'User info': T,
  'Mobile device information': T,
  'Duplicate checking detection': T
}

export const D_HEIGHT = 172
export const F_HEIGHT = 36
export const RADIO = 2

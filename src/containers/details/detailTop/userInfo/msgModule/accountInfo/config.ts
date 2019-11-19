// 获取验证结果按钮配置
export const authResultBtnConfig = {
  btnText: 'Bank account verification'
  // stateName: 'need_verify_bank'
}

// 第三方验证账户信息结果
export const authResultConfig = {
  title: 'Bank verification result',
  widthStyle: 'large',
  stateName: 'bank_verify_result'
}

// 收款账户
export const base = [
  {
    title: 'Recipient account type', // 收款账户类型
    stateName: 'account_type'
  },
  {
    title: 'Account Holder',
    stateName: 'account_name'
  }
]
export const CollectionAccountInfoInput = [
  ...base,
  {
    title: 'Bank issuer/E-wallet',
    stateName: 'receipt_bank_name'
  },
  {
    title: 'Bank account number/Account Number',
    stateName: 'receipt_band_account'
  }
]
export const CollectionAccountInfoInputCash = [
  ...base,
  {
    title: 'Institution',
    stateName: 'institution_name'
  }
]

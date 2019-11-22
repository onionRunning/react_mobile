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
    stateName: 'user_account_type'
  },
  {
    title: 'Account Holder',
    stateName: 'user_account_name'
  }
]
export const CollectionAccountInfoInputBank = [
  ...base,
  {
    title: 'Bank issuer/E-wallet',
    stateName: 'user_receipt_bank_name'
  },
  {
    title: 'Bank account number/Account Number',
    stateName: 'user_receipt_bank_account'
  }
]
export const CollectionAccountInfoInputEwallet = [
  ...base,
  {
    title: 'Bank issuer/E-wallet',
    stateName: 'user_e_wallet_name'
  },
  {
    title: 'Bank account number/Account Number',
    stateName: 'user_e_wallet_account'
  }
]
// TODO: 字段名不确定
export const CollectionAccountInfoInputCash = [
  ...base,
  {
    title: 'Institution',
    stateName: 'institution_name'
  }
]

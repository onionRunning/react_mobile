import { action } from 'mobx'
import { LoanInfoReq, LoanInfoRes } from 'interface/details/loanInfo'
import api from 'api'
import Message from 'components/message'

class LoanInfo {
  @action getLoanInfoList = async (
    payload: LoanInfoReq,
    currentList: string,
    callBack: (loanInfo: LoanInfoRes[]) => void
  ) => {
    try {
      const res = await api.getLoanInfo(payload, currentList)
      console.log(res)
      if (res.success && res.data) {
        callBack(res.data)
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
}

export default LoanInfo

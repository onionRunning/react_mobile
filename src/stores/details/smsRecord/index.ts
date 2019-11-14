import { observable, action } from 'mobx'
import { SMSRecordReq, SMSRecordList } from 'interface/details/smsRecord'
import api from 'api'
import Message from 'components/message'

class LoanInfo {
  @observable SMSRecordList: SMSRecordList[] = []

  @action getLoanInfoList = async (payload: SMSRecordReq, currentList: string) => {
    try {
      const res = await api.getSMSRecord(payload, currentList)
      console.log(res)
      if (res.success && res.data) {
        this.SMSRecordList = res.data
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
}

export default LoanInfo

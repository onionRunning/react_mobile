import { observable, action } from 'mobx'
import { SMSRecordReq, SMSRecordList, SendSmsReq } from 'interface/details/smsRecord'
import api from 'api'
import Message from 'components/message'

class SMSRecord {
  @observable SMSRecordList: SMSRecordList[] = []

  @action getSMSRecordList = async (payload: SMSRecordReq, currentList: string) => {
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

  @action sendMsgSMSRecord = async (payload: SendSmsReq, callback: () => void) => {
    try {
      const res = await api.sendMsgSMSRecord(payload)
      console.log(res)
      if (res.success && res.data) {
        callback()
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
}

export default SMSRecord

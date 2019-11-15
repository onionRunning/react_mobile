import { observable, action } from 'mobx'
import { StatusRecordReq, StatusRecordList } from 'interface/details/statusRecord'
import api from 'api'
import Message from 'components/message'

class LoanInfo {
  @observable statusRecord: StatusRecordList[] = []
  @action getStatusRecord = async (payload: StatusRecordReq, currentList: string) => {
    try {
      const res = await api.getStatusRecord(payload, currentList)
      console.log(res)
      if (res.success && res.data) {
        this.statusRecord = res.data
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
}

export default LoanInfo

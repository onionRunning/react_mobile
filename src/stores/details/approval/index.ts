import { action } from 'mobx'
import { ApprovalResultReq, ApprovalResultRes } from 'interface/details/approval'
import api from 'api'
import Message from 'components/message'

class Approval {
  @action getApprovalResult = async (payload: ApprovalResultReq, callBack: (result: ApprovalResultRes) => void) => {
    try {
      const res = await api.getOrderApprovalResult(payload)
      if (res.success && res.data) {
        callBack(res.data)
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
  @action getTelephoneList = async (payload: ApprovalResultReq) => {
    try {
      const res = await api.getTelephoneList(payload)
      console.log(res)
      // if (res.success && res.data) {
      //   callBack(res.data)
      // } else {
      //   Message.error(res.info)
      // }
    } catch (error) {
      Message.error(error)
    }
  }
}

export default Approval

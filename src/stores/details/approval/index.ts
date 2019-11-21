import { observable, action } from 'mobx'
import api from 'api'
import * as params from 'api/params'
import * as response from 'api/response'
import Message from 'components/message'

class Approval {
  @observable approvalResult: response.ApprovalResult = {
    application_status: '',
    application_finish_time: '',
    return_time: '',
    operator_name: '',
    remark: ''
  }
  @observable orderReason: response.OrderReason = {}
  @observable telephoneList: response.TelephoneList[] = []

  // 获取审核结果
  @action getApprovalResult = async (payload: params.ApprovalResultReq) => {
    try {
      const res = await api.getOrderApprovalResult(payload)
      if (res.success && res.data) {
        this.approvalResult = { ...this.approvalResult, ...res.data.order_msg }
        this.orderReason = { ...res.data.order_reasons }
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 获取电话校验信息
  @action getTelephoneVerifyInfo = async (
    payload: params.TelephoneVerifyReq,
    callBack: (result: response.TelephoneList[]) => void
  ) => {
    try {
      const res = await api.getTelephoneVerifyInfo(payload)
      console.log(res)
      if (res.success && res.data) {
        callBack(res.data.CallRecord)
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 获取通话记录
  @action getCallRecord = async (
    payload: params.CallRecordInfoReq,
    callBack: (result: response.CallRecordInfoList[]) => void
  ) => {
    try {
      const res = await api.getCallRecord(payload)
      console.log(res)
      if (res.success && res.data) {
        callBack(res.data || [])
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 拨打电话
  @action callUp = async (payload: params.CallUpReq, callBack: (id: string) => void) => {
    try {
      const res = await api.callUp(payload)
      console.log(res)
      if (res.success && res.data) {
        callBack(res.data.call_id || '')
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 更新话务系统信息
  @action updateCallInfo = async (payload: params.UpdateCallInfoReq, callBack: () => void) => {
    try {
      const res = await api.updateCallInfo(payload)
      console.log(res)
      if (res.success) {
        callBack()
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
}

export default Approval

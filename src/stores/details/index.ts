import { observable, action } from 'mobx'
import api from 'api'
import * as params from 'api/params'
import * as response from 'api/response'
import Message from 'components/message'

class Details {
  @observable repaymentInfoList: response.RepaymentInfoList[] = []
  @observable repaymentInfoFlowList: response.RepaymentInfoFlowList[] = []
  @observable loanInfoList: response.LoanInfoList[] = []
  @observable SMSRecordList: response.SMSRecordList[] = []
  @observable statusRecordList: response.StatusRecordList[] = []

  // 获取还款信息
  @action getRepaymentInfo = async (payload: params.RepaymentDetailReq, currentList: string) => {
    try {
      const res = await api.getRepaymentDetail(payload, currentList)
      if (res.success) {
        this.repaymentInfoList = res.data || []
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 获取还款流水
  @action getRepaymentFlow = async (payload: params.RepaymentDetailReq, currentList: string) => {
    try {
      const res = await api.getRepaymentDetailFlow(payload, currentList)
      if (res.success) {
        this.repaymentInfoFlowList = res.data || []
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 获取放款信息
  @action getLoanInfoList = async (payload: params.LoanInfoReq, currentList: string) => {
    try {
      const res = await api.getLoanInfo(payload, currentList)
      if (res.success) {
        // this.loanInfoList = res.data || []
        this.loanInfoList = []
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 获取短信记录
  @action getSMSRecordList = async (payload: params.SMSRecordReq, currentList: string) => {
    try {
      const res = await api.getSMSRecord(payload, currentList)
      if (res.success) {
        this.SMSRecordList = res.data || []
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 发送短信
  @action sendMsgSMSRecord = async (payload: params.SendSmsReq, callback: () => void) => {
    try {
      const res = await api.sendMsgSMSRecord(payload)

      if (res.success && res.data) {
        callback()
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 获取状态记录
  @action getStatusRecord = async (payload: params.StatusRecordReq, currentList: string) => {
    try {
      const res = await api.getStatusRecord(payload, currentList)
      if (res.success) {
        this.statusRecordList = res.data || []
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
}

export default Details

import { observable, action } from 'mobx'
import api from 'api'
import { RepaymentDetailReq, RepaymentInfoList } from 'interface/details/repaymentInfo'
import { LoanInfoReq, LoanInfoList } from 'interface/details/loanInfo'
import { SMSRecordReq, SendSmsReq, SMSRecordList } from 'interface/details/SMSRecord'
import { StatusRecordReq, StatusRecordList } from 'interface/details/statusRecord'
import Message from 'components/message'

class Details {
  @observable repaymentInfoList: RepaymentInfoList[] = []
  // @observable repaymentInfoFlowList: RepaymentInfoFlowList[] = []
  @observable loanInfoList: LoanInfoList[] = []
  @observable SMSRecordList: SMSRecordList[] = []
  @observable statusRecordList: StatusRecordList[] = []

  // 获取还款信息
  @action getRepaymentInfo = async (payload: RepaymentDetailReq) => {
    try {
      const res = await api.getRepaymentDetail(payload)
      if (res.success && res.data) {
        console.log(res)
        // this.repaymentInfoList = res.data || []
        this.repaymentInfoList = []
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 获取还款流水
  // @action getRepaymentFlow = async (payload: RepaymentDetailReq) => {
  //   try {
  //     const res = await api.getRepaymentDetailFlow(payload)
  //     if (res.success && res.data) {
  //       // this.repaymentInfoFlowList = res.data || []
  //       this.repaymentInfoFlowList
  //     } else {
  //       Message.error(res.info)
  //     }
  //   } catch (error) {
  //     Message.error(error)
  //   }
  // }

  // 获取放款信息
  @action getLoanInfoList = async (payload: LoanInfoReq) => {
    try {
      const res = await api.getLoanInfo(payload)
      if (res.success && res.data) {
        console.log(res)
        this.loanInfoList = []
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 获取短信记录
  @action getSMSRecordList = async (payload: SMSRecordReq) => {
    try {
      const res = await api.getSMSRecord(payload)
      if (res.success && res.data) {
        this.SMSRecordList = res.data.flows || []
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 发送短信
  @action sendMsgSMSRecord = async (payload: SendSmsReq, callback: () => void) => {
    try {
      const res = await api.sendMsgSMSRecord(payload)
      if (res.success) {
        callback()
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  // 获取状态记录
  @action getStatusRecord = async (payload: StatusRecordReq) => {
    try {
      const res = await api.getStatusRecord(payload)
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

import { observable, action } from 'mobx'
import api from 'api/index'
import { CancelLoanReq, LendingsPayload, LoanOrRetryReq, LendingResItem, UpdateAutoLoanReq } from 'interface/lendings'
import { Callback } from 'global/type'
import { formatTime, formatTf } from 'global/method'
import Message from 'components/message'

class Lendings {
  // 自动放款按钮状态
  @observable autoStatus: boolean = false
  @observable lendingList: any[] = []
  @observable page: number = 1
  @observable total_count: number = 0
  @observable page_count: number = 10

  /**
   * 获取贷款列表
   * @params LendingsPayload
   */
  @action getLendingList = async (payload: LendingsPayload) => {
    const res = await api.getLendingLists(payload)
    try {
      if (res && res.success) {
        if (res.data) {
          this.lendingList = res.data.loan_list ? this.handleData(res.data.loan_list) : []
          this.page = payload.page!
          this.page_count = payload.per_page!
          this.total_count = res.data.total_count
        }
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
  /**
   * 获取自定放款状态
   */
  @action checkAutoStatus = async (cb: Callback) => {
    const res = await api.getAutoStatus()
    try {
      if (res && res.success && res.data) {
        cb && cb(res.data.current_statuses)
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  @action UpdateAutoStatus = async (payload: UpdateAutoLoanReq, cb?: Callback) => {
    const res = await api.updateAutoStatus(payload)
    try {
      if (res && res.success) {
        cb && cb()
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }
  /**
   * 取消放款
   * @params order_no,operator,operator_id
   */
  @action createCancelLoan = async (payload: CancelLoanReq, cb: Callback) => {
    const res = await api.getCancelLoan(payload)
    try {
      if (res && res.success) {
        cb && cb()
      } else {
        Message.error(res.info)
      }
    } catch (error) {
      Message.error(error)
    }
  }

  /**
   * 放款or重新放款
   * @params order_no,operator,operator_id
   */
  @action createLoanRetry = (payload: LoanOrRetryReq, cb: Callback) => async () => {
    const res = await api.getLoanOrRetry(payload)
    try {
      if (res && res.success) {
        cb && cb()
      }
    } catch (error) {
      Message.error(error)
    }
  }
  handleData = (data: LendingResItem[]) => {
    return data.map((obj: LendingResItem) => {
      return {
        id: obj.loan.id, // id
        order_no: obj.loan.order_no, // 申请单编号
        customer_name: obj.loan.customer_name, // 客户名
        apply_time: formatTime(obj.loan.apply_time), // 申请时间
        request_loan_time: formatTime(obj.loan.request_loan_time), // 请求放款时间
        approved_principal: obj.loan.loan_principal, // 审批金额
        loan_amount: obj.loan_flow.actual_loan_amount, // 实际放款金额（申请金额-砍头费）
        loan_days: obj.loan.loan_days, // 贷款每期天数
        channel: obj.loan.loan_channel, // 渠道
        loan_status: formatTf(obj.loan.status), // 订单状态
        actual_loan_time: formatTime(obj.loan_flow.actual_loan_time), // 放款结果时间\成功放款时间
        loan_flow_status: formatTf(obj.loan_flow.status), // 放款流水状态
        loan_flow_number: obj.loan_flow.loan_flow_no, // 放款流水号
        request_no: obj.loan_flow.loan_flow_no, // 请求支付编号,即放款流水号
        err_msg: obj.loan_flow.fail_reason, // 放款失败信息，支付系统返回的错误消息
        customer_id: obj.loan.customer_info_id || '', // 客户id（用户信息表id）
        product_name: obj.loan.product_name, // 产品名称
        order_type: obj.loan.order_type, // 订单类型
        out_flow_num: obj.loan_flow.out_loan_flow, // p4.2.1紧急需求 新增第三方放款流水号
        loan_pay_code: obj.loan_flow.loan_pay_code, // p4.3.1 放款码(之前遗漏)
        pay_channel: obj.loan_flow.loan_pay_platform, // 放款渠道
        loan_pay_type: obj.loan.loan_pay_type // 放款方式
      }
    })
  }
}
export default Lendings

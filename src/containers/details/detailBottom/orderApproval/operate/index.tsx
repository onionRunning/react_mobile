import React, { Component } from 'react'
import { radioConfig } from './const'
import InfoWrapper from 'containers/details/component/infoWrapper'
import { Radio } from 'antd'
import AntdSelect from './AntdSelect'
import Button from 'components/button'
import { getFinConfig } from './utils'
import styles from './index.module.scss'
import { MixProps } from 'global/interface'
import { RadioChangeEvent } from 'antd/lib/radio/interface'

const RadioGroup = Radio.Group

interface Props extends MixProps {
  reasionLists?: any[]
  detailPayload?: any
  currentList?: any
  checksReadOnly?: () => boolean
}
export class Operate extends Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {
      application_status: '',
      reasons: [],
      remark: ''
    }
  }

  render() {
    const { remark } = this.state
    return (
      <div className={styles.wrap}>
        <div className={styles.radio_box}>{this.renderRadio()}</div>
        {/* <div className="order-select">{this.renderSelect()}</div> */}
        <div className={styles.content_box}>
          <div className={styles.textarea_box}>
            <p>Comments</p>
            <textarea
              name="remark"
              className="order-remark"
              value={remark}
              onChange={this.handleChangeTextarea}
              id="order-remark"
            />
          </div>
          <div className={styles.tip}>{remark.length}/1000</div>
        </div>
        <div className={styles.operate_box}>
          <Button type="primary" onClick={this.handleSubmitInfo}>
            Confrirm to submit
          </Button>
        </div>
      </div>
    )
  }

  renderRadio = () => {
    return (
      <RadioGroup size="large" onChange={this.handleChangeRadio}>
        {radioConfig.map((item, index) => {
          return (
            <span className={styles.radio_item} key={index} id={`operate-${item.toLowerCase()}-btn`}>
              <Radio name="application_status" value={item} />
              {item}
            </span>
          )
        })}
      </RadioGroup>
    )
  }

  // show select
  renderSelect = () => {
    const { application_status } = this.state
    const mode = application_status !== 'Loan cancellation' ? 'multiple' : 'default'
    var configs: any[] = getFinConfig(this.props.reasionLists, application_status) // 配置
    configs = configs.map(item => {
      return { ...item, label: item.reason_code, value: item.reason_value }
    })
    return (
      application_status !== 'Approved' &&
      application_status !== '' && (
        <AntdSelect
          placeholder={''}
          application_status={application_status}
          name={'reasons'}
          mode={mode}
          onChange={this.handleChangeSelect}
          options={configs}
        />
      )
    )
  }

  // radio value
  handleChangeRadio = (e: RadioChangeEvent) => this.setState({ application_status: e.target.value })

  // select value
  handleChangeSelect = (val: any) => {
    this.setState({
      ...val
    })
  }

  // textarea value
  handleChangeTextarea = (
    e: React.ChangeEvent<{
      value: string
      name: string
    }>
  ) => {
    const value = e.target.value.replace(/[\u4E00-\u9FA5]/g, '')
    if (value.length > 1000) return
    this.setState({ [e.target.name]: value })
  }
  // 初始化参数
  initParams = () => {
    // const { order_no } = this.props.detailPayload
    // const currentList = this.props.currentList
    // const { application_status, reasons, remark } = this.state
    // var configs = getFinConfig(this.props.reasionLists, application_status)
    // return {
    //   order_no,
    //   operator_name: sessionStorage.getItem('username'),
    //   operator_id: parseInt(sessionStorage.getItem('userId')!, 10),
    //   application_status: RightBack[application_status],
    //   reasons: finallyArr(reasons, configs),
    //   remark: remark,
    //   suffix: `${currentList}_result`
    // }
  }

  // 提交审批
  handleSubmitInfo = () => {
    // 如果用户当前在编辑客户信息,则不允许提交审批结果,必须完成修改才能提交
    const { checksReadOnly = () => false } = this.props
    if (checksReadOnly()) return
    // let auth = vertify(this.state)
    // if (auth.flag) {
    //   this.props.dispatch(Action.createAlertError(auth.hintText!))
    //   return
    // }

    // this.props.dispatch({
    //   type: Type.APPROVE_ORDER_REQUEST,
    //   payload: this.initParams(),
    //   cb: this.handleApproveSuccess
    // })
  }

  handleApproveSuccess = () => {
    this.props.history.push('/auth/my_orders')
  }
}

// export const getReducer = (state: any) => {
//   const { approvalReducer } = state
//   return {
//     ...approvalReducer
//   }
// }

export default InfoWrapper('Operation approval')(Operate)

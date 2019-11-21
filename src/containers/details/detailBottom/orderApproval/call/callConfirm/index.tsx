import React, { Component } from 'react'
import Select, { ListItem, SelectOption } from 'components/select'
import { selfAnswer, statusList, contactAnswer } from './config'
import { Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import './index.scss'
const RadioGroup = Radio.Group

interface Props {
  show?: boolean
  name?: string
  relation_ship: string
  onCancel: () => void
  onConfirm: (reason: string, remark: string) => void
}

interface State {
  reason: string
  remark: string
  option: ListItem[]
}

export class CallConfirm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      reason: '',
      remark: '',
      option: []
    }
  }

  componentDidMount() {
    const { relation_ship } = this.props
    this.setState({
      option: relation_ship === 'self' || relation_ship === 'self2' ? selfAnswer : contactAnswer
    })
  }

  render() {
    const { name, show, onCancel } = this.props
    const { option, reason, remark } = this.state
    if (!show) return <></>
    return (
      <div className="call-record-confirm">
        <div className="call-confirm-cons">
          <div className="call-title-name">
            <span>name: {name}</span>
          </div>
          <p className="call-p">Check result</p>
          <div className="call-title-name">Phone status</div>
          <div className={`show-status`}>{this.renderRadio(statusList)}</div>
          {// 当选中answered 出现下拉框
          reason === 'Answered' && (
            <div className="call-description">
              <div className="call-title-name">Description:</div>
              <div className="description-select">
                <Select onChange={this.handleChangeSelect} list={option} value={remark} />
              </div>
            </div>
          )}
          <button className="theme-btn-small call-but call-close" onClick={onCancel}>
            close
          </button>
          <button className="theme-btn-small call-but call-save" onClick={this.handleClickSave}>
            save
          </button>
        </div>
      </div>
    )
  }

  // 渲染单选框
  renderRadio = (all: any[]) => {
    return (
      <RadioGroup size="large" onChange={this.handleChangeRadio}>
        {all.map((item, index) => {
          return (
            <div key={index} className={`call-radio-span `}>
              <Radio name="val" value={item} />
              <b>{item}</b>
            </div>
          )
        })}
      </RadioGroup>
    )
  }

  // 点击单选按钮
  handleChangeRadio = (e: RadioChangeEvent) => {
    this.setState({ reason: e.target.value })
    // 非 Answered
    if (e.target.value !== 'Answered') {
      this.setState({ remark: '' })
    }
  }

  // 下拉框选择
  handleChangeSelect = (item: SelectOption) => {
    this.setState({
      remark: item.value
    })
  }

  // 保存
  handleClickSave = () => {
    const { reason, remark } = this.state
    const { onConfirm } = this.props
    onConfirm(reason, remark)
  }
}

export default CallConfirm

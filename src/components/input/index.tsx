import React, { Component } from 'react'
import { noop } from 'lodash'
import { getStringLength } from 'global/method'

import './index.scss'

export interface Msg {
  key: string
  id?: string
  name?: string
  label?: string
  type?: string
  placeholder?: string
  defaultValue?: string
  className?: string
  required?: boolean
  prickle?: string
}

interface Props {
  msg: Msg
  onChange: (...args: any[]) => void
  isEmpty: (...args: any[]) => void
  maxLength?: number
}

interface State {
  val: string
}

class ConditionInput extends Component<Props, State> {
  static defaultProps = {
    msg: {
      type: 'text', // 输入框类型: text, number
      label: '', // label关键字
      key: '', // 用于请求的字段
      name: '', // 输入框name属性值
      id: '', // 输入框id值
      placeholder: 'Please enter', // 默认提示内容
      defaultValue: '', // 传入的默认输入值
      className: '', // 是否有传入的输入框样式
      required: false, // 是否使用h5请求输入,输入框为必填项
      prickle: '' // 是否包含单位
    },
    maxLength: 50, // 限制字符串长度,默认12个字节
    onChange: noop, // 获取输入框内容
    isEmpty: noop // 失去焦点时检测空
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      val: props.msg.defaultValue ? props.msg.defaultValue : ''
    }
  }
  render() {
    const { msg } = this.props
    // 条件渲染输入
    return (
      <label className={msg.label ? 'input-label-wrapper' : 'input-label-wrapper no-label'}>
        {msg.label}
        <input
          type={msg.type ? msg.type : 'text'}
          id={msg.id}
          name={msg.name}
          placeholder={msg.placeholder ? msg.placeholder : 'Please enter'}
          className={msg.className ? msg.className : 'filter-input-small'}
          onBlur={this.handleOnBlur}
          onChange={this.handleChange}
          value={this.state.val}
        />
        {msg.prickle ? msg.prickle : ''}
      </label>
    )
  }
  // 处理输入框失去焦点
  handleOnBlur = (e: React.ChangeEvent<{ value: string }>) => {
    let val = e.target.value
    const { required } = this.props.msg
    // 如果不需要设置必填,则直接返回
    if (!required) return
    // 如果输入框为必填项,但是内容为空,提示不能为空
    if (val === '') {
      this.props.isEmpty()
    }
  }
  // 处理输入框输入
  handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    let value = e.target.value.replace(/[\u4E00-\u9FA5]/g, '')
    const { maxLength, msg } = this.props
    // 检测字符串长度
    let length = getStringLength(value)
    this.setState({
      val: value.substr(0, maxLength)
    })

    // 获取name值传出去
    let changeData = {
      id: msg.id,
      key: msg.key,
      value: value,
      isLimited: length > maxLength! // 字符串是否超出限制
    }
    this.props.onChange(changeData)
  }
}

export default ConditionInput

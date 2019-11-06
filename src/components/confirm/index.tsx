import React, { Component } from 'react'
import { noop, isFunction } from 'lodash'
import './confirm.scss'
import closeImg from '../../assets/x@2x.png'

const returnNull = () => null

const defaultProps = {
  show: false,
  title: 'Exit', // 模态框的标题
  text: 'Whether to quit the current account？', // 模态框提示内容
  autoClose: false, // 是否自动关闭模态框
  closeTime: 2000, // 默认自动关闭模态框时间
  cancelText: 'No', // 取消按钮默认文字
  okText: 'Yes', // 确认按钮默认文字
  showSelect: returnNull, // 展示下拉选项
  onCancel: returnNull, // 取消按钮默认处理函数
  onOk: returnNull // 确认按钮默认处理函数
}

type Props = typeof defaultProps

type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R

type ConfirmProps = Modify<
  Props,
  {
    showSelect: () => JSX.Element
    onCancel: () => void
    onOk: () => void
  }
>

class Confirm extends Component<ConfirmProps> {
  timer?: any

  // 设置组件的默认状态
  static defaultProps = {
    show: false,
    title: 'Exit', // 模态框的标题
    text: 'Whether to quit the current account？', // 模态框提示内容
    autoClose: false, // 是否自动关闭模态框
    closeTime: 2000, // 默认自动关闭模态框时间
    cancelText: 'No', // 取消按钮默认文字
    okText: 'Yes', // 确认按钮默认文字
    showSelect: noop, // 展示下拉选项
    onCancel: noop, // 取消按钮默认处理函数
    onOk: noop // 确认按钮默认处理函数
  }
  shouldComponentUpdate(nextProps: ConfirmProps) {
    // 模态框自动关闭
    this.handleCloseModal(nextProps)
    return true
  }
  handleCloseModal = (props: ConfirmProps) => {
    // 如果指定了自动关闭模态框且模态框为显示状态,在规定的时间内自动关闭
    if (props.autoClose && props.show) {
      this.timer = setTimeout(() => {
        // 关闭模态框
        if (isFunction(this.props.onCancel)) {
          this.props.onCancel()
        }
      }, this.props.closeTime)
      // 否则清除定时器,保证不受定时器影响
    } else {
      this.timer = undefined
    }
  }
  // 渲染
  render() {
    const { show, title, onCancel, children, text, showSelect, onOk, okText, cancelText } = this.props
    return (
      <div className={show ? 'confirm confirm-enter' : 'confirm'}>
        <div className="confirm-wapper">
          <h3 className="confirm-title">
            {title}
            <img src={closeImg} alt="" className="title-close-icon" onClick={onCancel} />
          </h3>
          <div className="confirm-content">
            {children}
            <p>{text}</p>
            {isFunction(showSelect) && <div>{showSelect()}</div>}
          </div>
          <div className="confirm-btn-wapper">
            <button className="theme-btn-large confirm-btn" onClick={onOk} id={'yes-btn'}>
              {okText}
            </button>
            <button className="btn-cancel" onClick={onCancel} id={'no-btn'}>
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Confirm

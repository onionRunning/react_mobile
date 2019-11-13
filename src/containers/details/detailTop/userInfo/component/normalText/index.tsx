import React, { Component } from 'react'
import './index.scss'
import { Tooltip } from 'antd'
import { formatTime, formatMoney, splitWord } from 'global/method'

interface Props {
  title: string
  widthStyle: string
  value: string | number
  userType?: string
}

export class NormalText extends Component<Props> {
  handTypeValue = (type: string, value: string | number) => {
    switch (type) {
      case 'time':
        return formatTime(value as string)
      case 'money':
        return `Rs. ${formatMoney(value as number)}`
      case 'date':
        return `${value ? value : ''} days`
      case 'status':
        return splitWord(value)
      case 'label':
        return <span className={String(value)}>{value}</span>
      default:
        return value
    }
  }

  showValue = (value: string, type?: string) => {
    if (type === 'name') {
      // 用于处理名字多空格问题
      return <span dangerouslySetInnerHTML={{ __html: value.replace(/ /g, '&nbsp') }} />
    }
    return value
  }
  render() {
    const { title, widthStyle, value, userType } = this.props
    const val: any = userType ? this.handTypeValue(userType, value) : value
    return (
      <div className="normal-text-com">
        <span>{`${title ? title + ' :' : ''}`}</span>
        <Tooltip title={val} trigger="contextMenu">
          <p className={widthStyle}>{val ? this.showValue(val, userType) : val === 0 ? 0 : ''}</p>
        </Tooltip>
      </div>
    )
  }
}
//TODO
export default NormalText

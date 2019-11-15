import React, { Component } from 'react'
import NormalText from '../normalText'

interface PropsType {
  [names: string]: string | number | boolean | Function
}

// todo
interface Props {
  data?: PropsType
  config?: any[]
}

export default class FormInputListUI extends Component<Props> {
  render() {
    const { config = [], data = {} } = this.props
    return <div className="info-item">{this.renderList(config, data)}</div>
  }
  renderList = (config: any[], data: PropsType) => {
    return (
      config &&
      config.map((item, index) => {
        const val = item.func ? item.func(data) : data[item.stateName]
        return <NormalText key={index} {...item} value={val} />
      })
    )
  }
}

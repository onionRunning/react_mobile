import React, { Component } from 'react'
import NormalText from '../normalText'

interface PropsType {
  [names: string]: string | number | boolean | Function
}
interface Config {
  title: string
  stateName: string
  func?: Function | undefined
  widthStyle?: string
}

interface Props {
  data?: PropsType
  config?: Config[]
}

export default class FormInputListUI extends Component<Props> {
  render() {
    const { config = [], data = {} } = this.props
    return <div className="info-item">{this.renderList(config, data)}</div>
  }
  renderList = (config: Config[], data: PropsType) => {
    return (
      config &&
      config.map((item, index) => {
        const val = item.func ? item.func(data) : data[item.stateName]
        return <NormalText key={index} {...item} value={val} />
      })
    )
  }
}

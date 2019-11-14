import React, { Component } from 'react'
import { MixProps } from 'global/interface'
import { TabConfig, D_HEIGHT, RADIO } from './utils'

interface Props extends MixProps {
  type: string
  level?: string
}

interface State {
  height: number
}

export class SwitchComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      height: this.getHeight()
    }
  }
  componentDidMount() {
    this.screenChange()
  }
  // todo 防抖 && 节流
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }
  screenChange = () => {
    window.addEventListener('resize', this.resize)
  }
  // 延迟触发
  resize = () => {
    this.setState({
      height: this.getHeight()
    })
  }
  getHeight = () => {
    const viewHeight = document.documentElement.clientHeight || document.body.clientHeight
    return (viewHeight - D_HEIGHT) / RADIO
  }

  finHeight = () => {
    return this.getHeight()
  }

  render() {
    const { type } = this.props
    return (
      <div className="loan-info-container" style={{ height: this.finHeight() }}>
        {this.renderTabs(type)}
      </div>
    )
  }

  renderTabs = (type: string) => {
    const BaseComponent = TabConfig[type]
    return BaseComponent ? <BaseComponent {...this.props} /> : <div />
  }
}

export default SwitchComponent

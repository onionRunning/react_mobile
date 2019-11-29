import React, { Component } from 'react'
import NavBar from '../navBar'
import SwitchComponent from '../switchComponent'
import { MixProps } from 'global/interface'
import { getDefaultType } from './utills'

interface ConfigType {
  title: string
  type: string
  isShow?: boolean
}

interface Props extends MixProps {
  level: string
  config: ConfigType[]
}

interface State {
  type: string
  backType?: string
}

class TabComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { type: '' }
  }

  render() {
    const props: any = {
      ...this.props,
      type: this.state.type || getDefaultType(this.props.level),
      handleClick: this.handleClick
    }
    return (
      <>
        <NavBar {...props} />
        <SwitchComponent {...props} />
      </>
    )
  }
  handleClick = (type: string) => () => {
    this.setState({ type })
  }
}

export default TabComponent

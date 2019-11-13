import React, { Component } from 'react'
import { NavBar } from '../navBar'
import SwitchComponent from '../switchComponent'
import { MixProps } from 'global/interface'
import { choseRedictTab } from './utils'
import { userPermission } from 'design/permission'
interface ConfigType {
  title: string
  type: string
  isShow: boolean
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
    const props = {
      ...this.props,
      type: this.getCurrentType(),
      handleClick: this.handleClick
    }
    return (
      <>
        <NavBar {...props} />
        <SwitchComponent {...props} />
      </>
    )
  }
  getCurrentType = () => {
    const { level } = this.props
    const { detail_type } = this.props.location.state
    const { type } = this.state
    // console.log(detail_type,"xx")
    return type || choseRedictTab(level, detail_type, userPermission.finnalPermission!)
  }
  handleClick = (type: string) => () => {
    this.setState({
      type
    })
  }
}

export default TabComponent

/**
 *
 */

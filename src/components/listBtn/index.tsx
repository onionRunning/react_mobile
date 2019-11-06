import React, { Component } from 'react'
import './index.scss'

interface Props {
  data?: any[]
  btnClick: Function
}

interface State {
  tabsActive: string
}

class ListBtn extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { tabsActive: '' }
  }
  componentDidMount() {
    const { data } = this.props
    this.setState({ tabsActive: data ? data[0].stateName : '' })
  }
  render() {
    const { data } = this.props
    return <div className="list-btn-info">{this.getButtonList(data)}</div>
  }
  //渲染 按钮列表
  getButtonList = (data: any) => {
    return (
      data &&
      data.map((item: any, key: number) => {
        const name = this.state.tabsActive === item.stateName ? '-active' : ''
        return (
          <div key={key} className={`button item-button${name}`} onClick={this.changeAppType(item)} id={item.id}>
            {item.title}
          </div>
        )
      })
    )
  }

  changeAppType = (item: any) => () => {
    this.setState({
      tabsActive: item.stateName
    })
    this.props.btnClick(item)
  }
}

export default ListBtn

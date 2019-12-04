import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import errs from 'global/errors'
import Message from 'components/message'
import './index.scss'
// import * as H from 'history'
import { RouteComponentProps } from 'react-router-dom'
// import { RouterProps } from 'react-router'
// 路由
type Rou = RouteComponentProps

interface Props extends Rou {
  routes?: any[]
  showErr?: () => void
}

// 面包屑导航
export class BreadCrumbCom extends Component<Props> {
  itemRender = (route: any, params: any, routes: any[]) => {
    const last = routes.indexOf(route) === routes.length - 1
    return last ? (
      <span className="bread-crumb-current">{route.breadcrumbName}</span>
    ) : (
      <span onClick={this.handleJump(route.path)}>{route.breadcrumbName}</span>
    )
  }
  render() {
    const { routes } = this.props
    return (
      <div className="bread-crumb-com">
        <span className="my-position">My position : </span>
        <Breadcrumb
          style={{ fontSize: '14px', display: 'inline-block' }}
          separator=">"
          itemRender={this.itemRender}
          routes={routes}
        />
      </div>
    )
  }
  // handleGoback = () => {
  //   this.props.history.goBack()
  // }
  handleJump = (path: string) => () => {
    if (this.props.location.pathname.includes('readOnly')) {
      Message.warning(errs.READONLY_ERROR)
      return
    }
    this.props.history.push(path)
  }
}

export default BreadCrumbCom

import React from 'react'
import './index.scss'
import { RouteComponentProps } from 'react-router-dom'
import { getRouteMap, settingRoute, vertifyRoutePermission } from './utils'
// import { RoutesConfig } from '../config'
import { isArray } from 'lodash'
import { userPermission } from 'design/permission'

interface Props extends RouteComponentProps {
  checkIsReadOnly: () => boolean
  baseUrl: string
  config: any
}

export class LeftNav extends React.Component<Props> {
  componentDidMount() {
    this.handlerSecondNav()
  }
  render() {
    return (
      <div className="header-left">
        <ul className="left-nav">{this.showFirstNav()}</ul>
      </div>
    )
  }

  // 设置二级路由标签的位置,不推荐直接处理节点,
  handlerSecondNav = () => {
    const settingName = settingRoute(this.props.location.pathname) ? 'active_3' : 'no_activc_3'
    const leftPadding: any = document.getElementsByClassName(settingName)[0]
    const { _module } = userPermission.finnalPermission!
    // 判断权限 - 确定是第几个second-nav 一共有2个
    const secondNavIndex = !_module.p1 ? 0 : 1
    const fin: any = document.getElementsByClassName('second-nav')[secondNavIndex]
    if (fin && fin.style) {
      fin.style.paddingLeft = leftPadding && leftPadding.offsetLeft - 30 + 'px'
    }
  }

  showFirstNav = () => {
    const { config } = this.props
    const routeMap = getRouteMap(config, this.props.location.pathname, this.props.baseUrl)
    return routeMap.map((item, index) => {
      if (!item.isShow) return null
      const className = item.isHeight ? `route_active active_${index}` : `no_activc_${index}`
      return (
        <li key={index} className={className} onClick={this.clickRoute(item.route)} id={item.id}>
          <i />
          {item.title}
          {this.showSecondNav(item.children, index)}
        </li>
      )
    })
  }

  showSecondNav = (second?: { title: string; route: string }[], i?: number) => {
    if (second === undefined) return null
    if (second.length === 0) return null
    return (
      <ul key={i} className="second-nav">
        {this.secondNavList(second)}
      </ul>
    )
  }

  secondNavList = (temp: { title: string; route: string }[]) => {
    const currentRoute = this.props.location.pathname
    const routeMap = getRouteMap(temp, currentRoute, this.props.baseUrl)
    return routeMap.map((item, index) => {
      if (!item.isShow) return null
      const className = item.isHeight ? `s_route_active` : ''
      return (
        <li key={index} className={className} onClick={this.clickRoute(item.route)} id={item.id}>
          {item.title}
        </li>
      )
    })
  }

  // 一级页签点击
  clickRoute = (route: string | string[]) => () => {
    if (vertifyRoutePermission(userPermission.finnalPermission!, route)) return
    const { checkIsReadOnly, baseUrl } = this.props
    if (checkIsReadOnly()) return
    if (!route) return ''
    if (isArray(route) && route.length > 0) return ''
    this.props.history.push(`${baseUrl}${route}`)
  }
}

export default LeftNav

/**
 * 左侧导航栏
 * 展示一二级页签点击页签跳转相应页面
 * 跳转有限制条件:查重跳出的单无法点击
 */

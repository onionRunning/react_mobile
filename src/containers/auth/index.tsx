import React, { Component, lazy } from 'react'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import Common from 'stores/common'
import Header from './header'
import { getRedictRoute } from './utils'
import { userPermission } from 'design/permission'

export const getDetails = () => import('containers/details')
const OrderDetails = lazy(getDetails)

export const getBlackLists = () => import('containers/lists/orders/blackLists')
const BlackLists = lazy(getBlackLists)

export const getAddBlack = () => import('containers/lists/orders/addBlack')
const AddBlack = lazy(getAddBlack)

export const getUserList = () => import('containers/lists/settings/user/userList')
const UserList = lazy(getUserList)

export const getUserDetail = () => import('containers/lists/settings/user/userDetail')
const UserDetail = lazy(getUserDetail)

export const getRoleList = () => import('containers/lists/settings/role/roleList')
const RoleList = lazy(getRoleList)

export const getRoleDetail = () => import('containers/lists/settings/role/roleDetail')
const RoleDetail = lazy(getRoleDetail)

export const getOrderLists = () => import('containers/lists/orders/orderLists')
const OrderLists = lazy(getOrderLists)

export const getMyOrder = () => import('containers/lists/orders/myOrders')
const MyOrders = lazy(getMyOrder)

export const getLending = () => import('containers/lists/lendings')
const Lendings = lazy(getLending)

export const getRepayments = () => import('containers/lists/repayments')
const Repayments = lazy(getRepayments)

interface Props extends RouteComponentProps<{ showType: string }> {
  baseUrl: string
  common: Common
}
class Auth extends Component<Props> {
  componentDidMount() {
    this.checkToken(sessionStorage.getItem('token'))
  }

  // 检查token
  checkToken = (token: string | null) => {
    if (!token) this.props.history.replace('/login')
  }

  render() {
    const { match } = this.props
    const { finnalPermission } = userPermission
    return (
      <>
        <Header {...this.props} baseUrl={match.url} />
        <Switch>
          <Redirect exact={true} from={match.url} to={`${match.url}${getRedictRoute(finnalPermission)}`} />
          <Route path={`${match.url}/order_details`} component={OrderDetails} />
          <Route path={`${match.url}/blacklist`} component={BlackLists} />
          <Route path={`${match.url}/blacklist_management`} component={AddBlack} />
          <Route path={`${match.url}/orders`} component={OrderLists} />
          <Route path={`${match.url}/my_orders`} component={MyOrders} />
          <Route path={`${match.url}/users`} component={UserList} />
          <Route path={`${match.url}/users_page/:type/:id?`} component={UserDetail} />
          <Route path={`${match.url}/roles`} component={RoleList} />
          <Route path={`${match.url}/roles_page/:type/:id?`} component={RoleDetail} />
          <Route path={`${match.url}/lendings`} component={Lendings} />
          <Route path={`${match.url}/repayments`} component={Repayments} />
        </Switch>
      </>
    )
  }
}
// todo: 组件的路由校验是否需要添加 ,防止手动输入路由（也会被踢）
export default Auth

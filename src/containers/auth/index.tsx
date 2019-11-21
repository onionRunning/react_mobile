import React, { Component, lazy } from 'react'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import Common from 'stores/common'
import Header from './header'
import { getRedictRoute } from './utils'
import { userPermission } from 'design/permission'

const OrderDetails = lazy(() => import('containers/details'))
const BlackLists = lazy(() => import('containers/lists/orders/blackLists'))
const AddBlack = lazy(() => import('containers/lists/orders/addBlack'))
const UserList = lazy(() => import('containers/lists/settings/user/userList'))
const UserDetail = lazy(() => import('containers/lists/settings/user/userDetail'))
const RoleList = lazy(() => import('containers/lists/settings/role/roleList'))
const RoleDetail = lazy(() => import('containers/lists/settings/role/roleDetail'))
const OrderLists = lazy(() => import('containers/lists/orders/orderLists'))
const MyOrders = lazy(() => import('containers/lists/orders/myOrders'))
const Lendings = lazy(() => import('containers/lists/lendings'))
const Repayments = lazy(() => import('containers/lists/repayments'))

interface Props extends RouteComponentProps<{ showType: string }> {
  baseUrl: string
  common: Common
}
class Auth extends Component<Props> {
  componentDidMount() {
    // this.checkToken(sessionStorage.getItem('token'))
  }

  // 检查token
  //   checkToken = (token: string | null) => {
  //     // if (!token) this.props.history.replace('/login')
  //   }

  render() {
    const { match } = this.props
    const { finnalPermission } = userPermission
    return (
      <>
        <Header {...this.props} baseUrl={match.url} />
        <Switch>
          <Redirect exact={true} from={match.url} to={`${match.url}${getRedictRoute(finnalPermission) || '/no'}`} />
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

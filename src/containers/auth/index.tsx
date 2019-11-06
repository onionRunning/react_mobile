import React, { Component, lazy } from 'react'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import Header from './header'
import { getRedictRoute } from './utils'
import { userPermission } from 'design/permission'

const MyOrders = lazy(() => import('containers/lists/myOrders'))
const User = lazy(() => import('containers/lists/settings/user/userList'))

class Auth extends Component<RouteComponentProps<{ showType: string }>> {
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
          <Route path={`${match.url}/my_orders`} component={MyOrders} />
          <Route path={`${match.url}/users`} component={User} />
        </Switch>
      </>
    )
  }
}
// todo: 组件的路由校验是否需要添加 ,防止手动输入路由（也会被踢）
export default Auth

import React, { lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// todo

const LoginContainer = lazy(() => import('containers/login'))

export class Routes extends React.Component<any> {
  render() {
    return (
      <>
        <Switch>
          <Redirect exact={true} from="/" to="/login" />
          <Route path="/login" component={LoginContainer} />
        </Switch>
      </>
    )
  }
}
export default Routes

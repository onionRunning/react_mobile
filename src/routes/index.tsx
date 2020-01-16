import React, { lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// todo

const Auth = lazy(() => import('containers/auth'))

export class Routes extends React.Component<any> {
  render() {
    return (
      <>
        <Switch>
          <Redirect exact={true} from="/" to="/auth" />
          <Route path="/auth" component={Auth} />
        </Switch>
      </>
    )
  }
}
export default Routes

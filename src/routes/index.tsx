import React, { lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Hint from 'components/hint'
import Confirm from 'components/confirm'
import Loading from 'components/loading'
import ImgViewer from 'components/imgViewer'

import Common from '../stores/common'
// todo

const LoginContainer = lazy(() => import('containers/login'))
const Auth = lazy(() => import('containers/auth'))

interface Props {
  common: Common
}
export class Routes extends React.Component<Props> {
  render() {
    const { hint, loading, confirm, imgView } = this.props.common
    return (
      <>
        <Switch>
          <Redirect exact={true} from="/" to="/login" />
          <Route path="/login" component={LoginContainer} />
          <Route path="/auth" component={Auth} />
        </Switch>
        <Hint {...hint} />
        <Confirm {...confirm} />
        <Loading {...loading} />
        <ImgViewer {...imgView} />
      </>
    )
  }
}
export default inject('common')(observer(Routes))

import React, { lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// todo

const Home = lazy(() => {
  return import('containers/home')
})

const Game = lazy(() => {
  return import('containers/game')
})

// 定义路由层
const Routes = () => {
  return (
    <>
      <Switch>
        <Redirect exact={true} from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/game" component={Game} />
      </Switch>
    </>
  )
}
export default Routes

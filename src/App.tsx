import React from 'react'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import RootStore from './stores/root'
import { Route, Router } from 'react-router-dom'
import Routes from './routes'

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routingStore)

class App extends React.Component {
  public render() {
    return (
      <Provider {...RootStore}>
        <Router history={history}>
          <Route component={Routes} />
        </Router>
      </Provider>
    )
  }
}

export default App

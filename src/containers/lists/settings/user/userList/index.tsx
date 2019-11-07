import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ListTitle from 'components/listTitle'
import styles from './index.module.scss'

interface Props extends RouteComponentProps {
  temp: null
}

interface State {
  page: number
  pageSize: number
}

class User extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      page: 1,
      pageSize: 10
    }
  }

  render() {
    return (
      <div className={styles.page}>
        <ListTitle>User management</ListTitle>
      </div>
    )
  }
}

export default User

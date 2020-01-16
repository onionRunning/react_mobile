import React, { useState } from 'react'
import { TabBar } from 'antd-mobile'
import { tabContent } from './config'
import styles from './index.module.scss'
import My from '../content/my'

const { Item } = TabBar
interface Props {
  name?: string
}

const Auth: React.FC<Props> = (props: Props) => {
  const [choseType, changeType] = useState<string>('life')
  const pressItem = (type: string) => () => {
    changeType(type)
  }
  console.log(props)
  const renderItems = () => {
    return tabContent(pressItem, choseType).map(item => {
      return (
        <Item {...item}>
          <My />
        </Item>
      )
    })
  }
  return (
    <div className={styles.container}>
      <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white">
        {renderItems()}
      </TabBar>
    </div>
  )
}

export default Auth

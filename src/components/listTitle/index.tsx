import React from 'react'
import styles from './index.module.scss'

interface Props {
  children: React.ReactNode
}

const listTitle: React.FC<Props> = props => {
  return <h3 className={styles.wrap}>{props.children}</h3>
}

export default listTitle

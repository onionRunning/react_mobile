import React, { ComponentClass } from 'react'
import styles from './index.module.scss'

interface Props {
  headTitle?: string
}

// TODO
const InfoWrapper = (title?: string) => (Target: ComponentClass<any>): any => {
  return (props: Props) => {
    const showTitle = title ? title : props.headTitle
    return (
      <div className={styles.wrapper}>
        <p className={styles.title}>{showTitle}</p>
        <Target {...props} />
      </div>
    )
  }
}

export default InfoWrapper

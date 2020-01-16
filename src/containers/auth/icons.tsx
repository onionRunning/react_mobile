import React from 'react'
import styles from './index.module.scss'
interface Props {
  url: string
}

const Icons: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={styles.icon_item}
      style={{
        backgroundImage: `url(${props.url})`
      }}
    />
  )
}
export default Icons

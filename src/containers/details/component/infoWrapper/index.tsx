import React, { ComponentClass } from 'react'
import './index.scss'

interface Props {
  headTitle?: string
}
// TODO
const InfoWrapper = (title?: string) => (Target: ComponentClass<any>): React.FC<any> => {
  return (props: Props) => {
    const showTitle = title ? title : props.headTitle
    return (
      <div className="content-wrapper">
        <p className="title">{showTitle}</p>
        <Target {...props} />
      </div>
    )
  }
}
export default InfoWrapper

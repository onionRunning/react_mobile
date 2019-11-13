import React, { Component } from 'react'
import './index.scss'

interface Props {
  headTitle?: string
}
// TODO
const InfoWrapper = (title?: string) => (Target: any): any => {
  return class extends Component<Props> {
    render() {
      const { headTitle = '' } = this.props
      return (
        <div className="content-wrapper">
          <p className="title">{title ? title : headTitle}</p>
          <Target {...this.props} />
        </div>
      )
    }
  }
}
export default InfoWrapper

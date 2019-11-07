import React from 'react'
import ReactDOM from 'react-dom'

interface Props {
  node: HTMLElement
}

const Portal: React.FC<Props> = ({ children, node }) => {
  return ReactDOM.createPortal(children, node)
}

export default Portal

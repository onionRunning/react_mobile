import React, { Component } from 'react'
import './index.scss'

interface ConfigType {
  type: string
  title: string
  isShow: boolean
  id?: string
}

interface Props {
  config?: ConfigType[]
  handleClick: any
  type?: string
}

export class NavBar extends Component<Props> {
  render() {
    const { config = [], handleClick, type } = this.props
    return (
      <div className="con-nav-bar">
        <ul>
          {config &&
            config.map((item, index) => {
              return (
                <li
                  className={`${item.type === type ? 'active' : ''}`}
                  onClick={handleClick(item.type)}
                  key={index}
                  id={item.id}
                >
                  {item.title}
                </li>
              )
            })}
        </ul>
      </div>
    )
  }
}

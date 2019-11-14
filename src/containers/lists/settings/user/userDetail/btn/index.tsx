import React, { Component } from 'react'
import Button from 'components/button'
import { BtnItem } from '../config'
import styles from './index.module.scss'
interface Props {
  btnData: BtnItem[]
  clickProps: (b: string) => void
}

export class Btn extends Component<Props> {
  render() {
    const { btnData } = this.props
    return <div className={styles.wrap}>{this.renderBtns(btnData)}</div>
  }

  renderBtns = (data: BtnItem[]) => {
    return data.map((item, index) => {
      return (
        <Button key={index} type={item.type} onClick={this.handleOnClick(item.key)} id={item.id}>
          {item.label}
        </Button>
      )
    })
  }

  handleOnClick = (v: any) => () => {
    this.props.clickProps(v)
  }
}

export default Btn

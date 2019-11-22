import React from 'react'
import style from './index.module.scss'
import { ScoreInterface } from 'interface/details/userInfo'

interface Props {
  data: ScoreInterface
}

class DecileCard extends React.Component<Props> {
  render() {
    const { data } = this.props
    if (!data) return <div />
    const num = 10
    const arr = Array(num).fill('level')
    return (
      <div className="info-item">
        <div className={style.form}>
          <span className={style.label}>Decile : </span>
          <div className={style.decileCard}>
            {arr.map((_: string, index: number) => {
              return (
                <span className={data.tt_level === index + 1 ? `${style.active}` : ''} key={index}>
                  {index + 1}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
export default DecileCard

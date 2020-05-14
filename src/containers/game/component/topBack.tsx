import React from 'react'
import COINS from 'assets/icon.png'
import BACK from 'assets/back.png'
import gameStyle from '../game.module.scss'

interface Props {
  coins?: number
  handleBack?(): void
}

const TopBack: React.FC<Props> = (props: Props) => {
  const { coins, handleBack } = props
  return (
    <div className={gameStyle.topBar}>
      <img className={gameStyle.leftBack} src={BACK} alt="返回" onClick={handleBack} />
      <div className={gameStyle.coinBox}>
        <img src={COINS} alt="金钱" />
        <span>{coins}</span>
      </div>
    </div>
  )
}

export default TopBack

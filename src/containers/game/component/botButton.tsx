import React from 'react'
import REDUCE_COINS from 'assets/icond.png'
import gameStyle from '../game.module.scss'

interface Props {
  startTips(): void
}
const BotButton = (props: Props) => {
  const { startTips } = props
  return (
    <div className={gameStyle.botButs}>
      <button className={gameStyle.share}>
        <span className={gameStyle.shareLeft}>分享</span>
        <div className={gameStyle.shareRight}>
          <p>分享成功</p>
          <p>可获得100分</p>
          <p>奖励</p>
        </div>
      </button>
      <button className={gameStyle.tips} onClick={startTips}>
        <span>提示</span>
        <div className={gameStyle.tipsBottom}>
          <img src={REDUCE_COINS} alt="减少金额" />
          <span>-3</span>
        </div>
      </button>
    </div>
  )
}

export default BotButton

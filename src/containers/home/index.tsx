import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import BOT from 'assets/bot.png'
import KNIFE from 'assets/knife.png'
import BUTTONLINE from 'assets/begin-shine.svg'
import globalStyle from 'global/global.module.scss'

const Home = (props: RouteComponentProps) => {
  // 开始游戏
  const startGame = () => {
    props.history.push('/game')
  }
  return (
    <>
      <div className={globalStyle.home}>
        <img className={globalStyle.logo} src={BOT} alt="logo" />
        <p>成语趣猜猜</p>
      </div>
      <div className={globalStyle.wrapperButton}>
        <button className={globalStyle.button} type="开始猜成语" onClick={startGame}>
          <img src={KNIFE} alt="小刀" />
          <span>开始猜成语</span>
        </button>
        <img className={globalStyle.beginShine} src={BUTTONLINE} alt="shine" />
      </div>
    </>
  )
}

export default Home

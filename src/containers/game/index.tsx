import React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import GameStore from 'stores/game'
import TopBack from './component/topBack'
import Explains from './component/explain'
import WorldLists from './component/world'
import BotButton from './component/botButton'
import Popup from './component/popup'
import gameStyle from './game.module.scss'
import { INIT_NUMBER } from 'global/const'

interface Props extends RouteComponentProps {
  game: GameStore
}

@inject('game')
@observer
class Game extends React.Component<Props> {
  async componentDidMount() {
    const { setIdiomValue, initWorld, initLevel } = this.props.game
    initLevel()
    const res = await setIdiomValue()
    initWorld()
    if (res) {
      console.error(res)
    }
  }

  render() {
    const { idiomWorld, worldLists, idiomLists, currentLevel, coins, isShowPop } = this.props.game
    if (idiomLists.length === INIT_NUMBER.ZERO) return null
    const name = idiomLists[currentLevel].name
    const world = idiomLists[currentLevel].description
    return (
      <div className={gameStyle.gameBox}>
        <TopBack handleBack={this.handleBack} coins={coins} />
        <Explains
          level={currentLevel}
          name={name}
          data={idiomWorld}
          onClick={this.clickIdiom}
          clickClear={this.clickClear}
        />
        <WorldLists onClick={this.clickWorld} data={worldLists} />
        <BotButton startTips={this.startTips} />
        <Popup isShowPop={isShowPop} world={world} onclick={this.clickNext} />
      </div>
    )
  }
  handleBack = () => {
    this.props.history.goBack()
  }
  // 点击文字信息产生的交互
  clickWorld = (index: number) => {
    return () => {
      // console.error(index, 'index')
      // check 超过4个值已经消失了
      const { uodateWorld } = this.props.game
      uodateWorld(index)
    }
  }

  // 点击展示成语 移除自己 添加world
  clickIdiom = (id: number, index: number) => {
    return () => {
      const { removeIdiom } = this.props.game
      removeIdiom(id, index)
    }
  }
  // 点击清除按钮进行重置
  clickClear = () => {
    const { initWorldAndIdiom } = this.props.game
    initWorldAndIdiom()
  }
  // 点击开始提示按钮
  startTips = () => {
    const { getTips } = this.props.game
    getTips()
  }
  // 点击下一题, 初始化下个题目
  clickNext = () => {
    const { updateNextIdioms } = this.props.game
    updateNextIdioms()
  }
}

export default Game

import React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import GameStore from 'stores/game'
import TopBack from './component/topBack'
import Explains from './component/explain'
import WorldLists from './component/world'
import gameStyle from './game.module.scss'

interface Props extends RouteComponentProps {
  game: GameStore
}

@inject('game')
@observer
class Game extends React.Component<Props> {
  async componentDidMount() {
    const { setIdiomValue, initWorld } = this.props.game
    const res = await setIdiomValue()
    initWorld()
    if (res) {
      console.error(res)
    }
  }

  render() {
    const { idiomWorld, worldLists } = this.props.game
    return (
      <div className={gameStyle.gameBox}>
        <TopBack handleBack={this.handleBack} coins={10086} />
        <Explains data={idiomWorld} onClick={this.clickIdiom} />
        <WorldLists onClick={this.clickWorld} data={worldLists} />
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
}

export default Game

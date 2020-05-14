import React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import GameStore from 'stores/game'
import TopBack from './component/topBack'
import Explains from './component/explain'
import gameStyle from './game.module.scss'

interface Props extends RouteComponentProps {
  game: GameStore
}

@inject('game')
@observer
class Game extends React.Component<Props> {
  async componentDidMount() {
    const { setIdiomValue } = this.props.game
    const res = await setIdiomValue()
    if (res) {
      console.error(res)
    }
  }

  render() {
    console.error(this.props.game)
    return (
      <div className={gameStyle.gameBox}>
        <TopBack handleBack={this.handleBack} coins={10086} />
        <Explains />
      </div>
    )
  }
  handleBack = () => {
    // eslint-disable-next-line no-invalid-this
    this.props.history.goBack()
  }
}

export default Game

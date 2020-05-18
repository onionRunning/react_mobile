import React, { useState, useEffect, useRef } from 'react'
import COINS from 'assets/icon.png'
import BACK from 'assets/back.png'
import gameStyle from '../game.module.scss'
import { INIT_NUMBER } from 'global/const'

interface Props {
  rangeCoins?: number
  coins?: number
  handleBack?(): void
}
const DELAY_TIMNE = 1000
const useDelayResult = (data: number) => {
  const mounted = useRef(false)
  const [value, setValue] = useState(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    setValue(pre => {
      return !pre
    })
    const timer = setTimeout(() => {
      setValue(pre => {
        return !pre
      })
    }, DELAY_TIMNE)
    return () => {
      clearTimeout(timer)
      setValue(false)
    }
  }, [data])
  return value
}

const TopBack: React.FC<Props> = (props: Props) => {
  const { coins, handleBack, rangeCoins } = props
  const isShowRecuce = useDelayResult(coins!)

  const createReduce = (isFlag: boolean) => {
    if (isFlag) {
      const showLevel = rangeCoins! > INIT_NUMBER.ZERO ? `+${rangeCoins!.toString()}` : rangeCoins
      return <span className={gameStyle.reduceConins}>{showLevel}</span>
    }
  }
  return (
    <div className={gameStyle.topBar}>
      <img className={gameStyle.leftBack} src={BACK} alt="返回" onClick={handleBack} />
      <div className={gameStyle.coinBox}>
        <img src={COINS} alt="金钱" />
        <span>{coins}</span>
      </div>
      {createReduce(isShowRecuce)}
    </div>
  )
}

export default TopBack

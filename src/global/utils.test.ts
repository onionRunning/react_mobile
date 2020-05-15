import * as utils from './utils'

// data 准备
const START_NUMBER = 0
const END_NUMBER = 10
const RANDOM_WORLD = 20
const TEST_STRING = '1008611'
const RANDOM_ARR = [START_NUMBER, START_NUMBER, END_NUMBER, END_NUMBER, TEST_STRING]

describe('test function', () => {
  it('generateRandom', () => {
    const values = utils.generateRandom(new Date().getTime())(START_NUMBER, END_NUMBER)
    expect(values > START_NUMBER && values < END_NUMBER).toBe(true)
  })

  it('randomArray', () => {
    const values = utils.randomArray(RANDOM_ARR, new Date().getTime())
    expect(values.length).toBe(RANDOM_ARR.length)
    // TODO: 这个断言测试就大致测试下了,只能测试结果
  })

  it('getRandomWorld', () => {
    const values = utils.getRandomWorld(utils.getRandomSeed())
    expect(values.length).toBe(RANDOM_WORLD)
  })
})

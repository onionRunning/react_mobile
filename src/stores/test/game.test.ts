import gameStore from '../game'
const game = new gameStore()

jest.mock('api', () => {
  return {
    getIdioms: jest.fn(() => {
      return { success: true, data: { chengyu: [{ name: 'xkas' }] } }
    }),
  }
})
// hwo to test store
// 1. 准备数据 2. 按照顺序从上网下进行测试
// describe 描述你要测试的文件内容
// it 测试你的函数，函数可能有多个分支，可以自己决定 写多少个 it， 但是每个分支都要有自己的断言，如果没有断言则需要看你函数内嵌套的函数是否执行
describe('game store test', () => {
  it('didmount', async() => {
    await game.didMount()
  })
})

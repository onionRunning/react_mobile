/* eslint-disable @typescript-eslint/no-var-requires */
// git 最近一次提交记录 修改的测试
const fs = require('fs')
const { table } = require('table')

;(async () => {
  try {
    const rep = await fs.readFileSync('./lastgitcommit.text')
    const nstr = rep.toString().split('\n')
    const fin = nstr.slice(6, nstr.length - 1)
    const tems = []
    for (let i = 0; i < fin.length - 1; i++) {
      if (!fin[i].includes('.test.')) {
        const src = './coverage/lcov-report/' + fin[i] + '.html'
        const content = (await fs.readFileSync(src)).toString().split('\n')[27]
        const branchRadio = content.match(/<span class="strong">(.+)<\/span>/)[1]
        tems.push([fin[i], branchRadio])
      }
    }
    console.log(table([['本次commit 修改的文件', '修改文件的分支覆盖率'], ...tems]))
    for (let j = 0; j < tems.length - 1; j++) {
      if (tems[j][1].replace('%', '') < 80) {
        // eslint-disable-next-line no-throw-literal
        fs.writeFile('./temp.txt', 'error', function(error) {
          if (error) return console.log('写入文件失败,原因是' + error.message)
          console.log('写入成功')
        })
        return
      }
    }
  } catch (error) {
    console.log(error, 'x')
  }
})()

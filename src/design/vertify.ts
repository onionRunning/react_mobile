export class Vertify {
  obj: any[]
  constructor(props: any[]) {
    this.obj = [...props]
  }
  startAuth = () => {
    for (var k = 0; k < this.obj.length; k++) {
      var item = this.obj[k]
      if (item.func && !item.func(item.value)) {
        return item.text
      }
    }
  }
}
// 策略 将执行环境与执行内容隔离
// xxxxx

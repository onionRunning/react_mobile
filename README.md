### react 移动端项目

react + typescript + mobx

> husky + prettier : 控制代码风格统一

> react hook

> mobx

> cssModule + vw + pxToVw 适配移动端( px 单位自动转vw)

> antd-mobile 规范ui组件

### 概要设计

#### 前端页面
- 首页
- 游戏页

##### 首页
首页展示一个按钮, 点击跳转闯关

##### 游戏页




#### 需要考虑的规则
- no-invalid-this ： mobx状态中,子 stroe class 类中 无法在箭头函数中使用 this
- no-floating-promises: 我的异步任务已经在函数中处理，我调用的地方是否需要返回值
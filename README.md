### react mobile 端项目

react + typescript + mobx

> husky + prettier : 控制代码风格统一

> hook

> mobx + mobx-react-lite

> cssModule + vw + pxToVw 适配移动端

> antd-mobile 规范ui组件

### roadmap
1. 代码规范 
    - 代码提交检测
    - 代码扫描检测
    - 代码提交会跑单元测试(push) 如果跑不过就不让提交

2. 提升代码质量 (sudo npm i min-codeCheck -g)
    - 代码走读
    - 圈复杂度检测代码

3. 测试覆盖

   - 代码的可测性, 你的代码一定是可以测试的，如果测试很难写 需要你去优化代码
   - 测试代码的可读性
   - 单元测试覆盖率 50% 以上(分支/函数覆盖率),

4. 性能优化
    - lazy load (使用 Suspense + lazy 实现)
    - 首屏优化
    - webpack 打包体积优化
    - express 代理层优化 
    ...

5. web 端监控
    - 监控报错
    - 性能监控

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { override, fixBabelImports, addPostcssPlugins } = require('customize-cra')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const postcssPxToViewport = require('postcss-px-to-viewport')

module.exports = override(
  addPostcssPlugins([
    postcssPxToViewport({
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568
    })
  ]),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true
  })
)

// 可以设置主题色 (基于 antd)

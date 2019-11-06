const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A',
            '@link-color': '#1DA57A',
            '@border-radius-base': '4px',
            '@border-color-base': '#d9d9d9',
            '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)'
        },
    }),
);
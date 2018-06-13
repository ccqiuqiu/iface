const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.test(/\.svg$/)
      .include
        .add(resolve('src/assets/icons/svg'))
        .end()
      .use('svg-spritse-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 设置一些别名
    config.resolve.alias
      .set('@g', resolve('src/global'))
      .set('@bc', resolve('src/baseComponent'))
      .set('@common', resolve('src/module/common/view'))
      .set('@utils', resolve('src/assets/utils'))
  },
  devServer: {
    port: 9088,
    // proxy: {},
  },
}
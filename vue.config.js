const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    // 删除原有的svg rlue
    config.module.rules.delete('svg')
    // 使用新的rlue
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .include
        .add(resolve('src/assets/icons/svg'))
        .end()
      .use('svg-sprite-loader')
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
      .set('@base', resolve('src/baseComponent/base'))
  },
  devServer: {
    port: 9088,
    // proxy: {},
  },
}
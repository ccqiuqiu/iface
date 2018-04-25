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
  },
  devServer: {
    port: 9088,
    // proxy: {},
  },
}
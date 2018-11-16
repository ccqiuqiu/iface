const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true, // 包含编译器
  baseUrl: process.env.BASE_URL || '/',
  // lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: [
    'element-ui-verify/dist'
  ],
  chainWebpack: config => {
    // config.optimization.minimize(false)

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

    // 单独打包vue相关库
    // config.entry('lib')
    //   .add('vue')
    //   .add('vuex')
    //   .add('vue-router')
    //   .end()
    // config.optimization.splitChunks({
    //   cacheGroups: {
    //     lib: {
    //       name: `lib`,
    //       priority: 1,
    //       chunks: 'initial',
    //       test: 'lib',
    //     },
    //     vendors: {
    //       name: `chunk-vendors`,
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       chunks: 'initial'
    //     },
    //     common: {
    //       name: `chunk-common`,
    //       minChunks: 2,
    //       priority: -20,
    //       chunks: 'initial',
    //       reuseExistingChunk: true
    //     }
    //   }
    // })
    // 设置一些别名
    // config.resolve.alias
    //   .set('@g', resolve('src/global'))
    //   .set('@bc', resolve('src/baseComponent'))
    //   .set('@common', resolve('src/modules/common/view'))
    //   .set('@utils', resolve('src/assets/utils'))
  },
  devServer: {
    port: 9088,
    proxy: {
      '/v1': {
        target: 'https://demo.ccqiuqiu.win/iface-api',
        changeOrigin: true
      }
    }
  }
}

---
title: 项目配置
---

由于项目使用vue/cli3+webpack4生成，很多配置项不再可见，这篇文档仅仅列出iFace对默认配置做的一些修改，更详尽的配置说明见[vue-cli3文档](https://cli.vuejs.org/)
## 环境变量

在项目根目录下新建.env.\* 文件来配置环境变量，iFace默认增加了4种环境：开发、mock、record、生产

* .env.development 对应开发环境
* .env.mock 对应mock模式
* .env.record 对应录制模式
* .env.production 对应生成模式
* 使用`vue-cli-service serve 命令`启动项目的时候，默认是读取.env.development文件，但是可以通过--mode来修改默认的模式，例如`vue-cli-service serve --mode mock` 会读取.env.mock文件
* 使用 `vue-cli-service build`命令启动项目，默认读取.env.production文件

## **webpack配置修改**

* 通过在项目根目录下新建vue.config文件来修改项目的webpack的配置
* webpack配置主要通过chainWebpack节点和configureWebpack节点修改，其中configureWebpack节点返回的对象会直接合并到webpack的配置中，而chainWebpack节点主要用来修改webpack已经添加的属性、插件、loader的具体配置，下面的代码删除了默认了读取svg文件的loader，换成了svg-spritse-loader

```javascript
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
```

## 别名的配置

为了在import文件的时候简化文件路径，项目增加了一些别名，所有的别名以@开头，由于项目使用了typescript，仅仅在webpack里面配置别名，typescript不会识别，所以必须为typescript也配置同样的别名

* webpack的别名配置在vue.config.js
* typescript的别名配置在tsconfig.json

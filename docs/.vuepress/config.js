/**
 * Created by 熊超超 on 2018/7/30.
 */
module.exports = {
  title: 'iFace',
  description: '后台管理系统',
  base: '',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      {text: '指南', link: '/guide/'},
      {text: '组件', link: '/components/'},
      {text: '服务端', link: '/server/'},
      {text: 'API', link: '/api/'},
      {text: 'GitHub', link: 'https://github.com/ccqiuqiu/iface'},
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            '', 'start', 'layout', 'style', 'modules', 'menu', 'auth', 'network'
          ]
        }
      ]
    }
  }
}
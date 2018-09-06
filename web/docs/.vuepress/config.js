/**
 * Created by 熊超超 on 2018/7/30.
 */
module.exports = {
  title: 'iFace',
  description: '后台管理系统',
  base: '/iface-doc/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      {text: '指南', link: '/guide/'},
      {text: '组件', link: '/components/'},
      {text: '服务端', link: '/server/'},
      {text: 'API', link: '/api/'},
      {text: 'gitee', link: 'https://gitee.com/HTPMO/iface'},
    ],
    sidebar: {
      '/guide/': [
        {
          title: '入门',
          collapsable: false,
          children: [
            'start', 'layout', 'style', 'modules', 'menu', 'auth', 'network', 'error',
            'loading', 'utils'
          ]
        },
        {
          title: '进阶',
          collapsable: false,
          children: [
            'config', 'persisted', 'formVerify', 'dashboard', 'log'
          ]
        }
      ],
      '/components/': [
        {
          title: '组件',
          collapsable: false,
          children: [
            'icon', 'dialog', 'chart', 'table', 'crud'
          ]
        }
      ],
      '/server/': [
        {
          title: '服务端',
          collapsable: false,
          children: [
            'auth', 'crud'
          ]
        }
      ],
      '/api/': ['']
    }
  }
}
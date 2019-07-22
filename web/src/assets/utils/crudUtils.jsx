/**
 * Created by 熊超超 on 2018/6/5.
 * 这个文件是动态CRUD页面的时候，为自定义列提供一些格式化方法
 * 如果要增加方法，就在CrudUtils对象里面定义一个属性，属性名以Format或者Render结尾
 * 属性值是一个对象，包含label（显示在下拉列表中的名称）和format（实际格式化的方法）
 */

import constant from './constant'
import store from '../../global/store'

const CrudUtils = {
  sexFormat: {
    label: '格式化-性别',
    format: ({value}) => {
      return constant.SexK[value]
    }
  },
  statusFormat: {
    label: '格式化-状态',
    format: ({value}) => {
      return constant.StatusK[value]
    }
  },
  dashboardTypeFormat: {
    label: '格式化-Dashboard类型',
    format: ({value}) => {
      return constant.DashboardTypeK[value]
    }
  },
  statusRender: {
    label: 'JSX-状态',
    format: (h, {value}) => <el-tag size='small' type={value === constant.StatusV.禁用 ? 'info' : ''}>{constant.StatusK[value]}</el-tag>
  },
  colorRender: {
    label: 'JSX-颜色',
    format: (h, {value}) => <div style={{ width: '24px', height: '24px', backgroundColor: value }}></div>
  }
}

export async function initOptions (data) {
  const ps = data.items.map((item) => new Promise(async (resolve, reject) => {
    const formProps = item.formProps
    if (formProps.options && typeof !Array.isArray(formProps.options)) {
      let data = await getOptions(formProps)
      if (data) {
        formProps.options = data.data || data
      }
      resolve()
    } else {
      resolve()
    }
  }))
  return Promise.all(ps)
}

export async function getOptions (item) {
  let data = null
  if (item.options['actionName']) {
    item.optionsProps = item.options
    item.options = 'action'
  }
  // 先在常量表里面找有没有值
  if (constant.options[item.options]) {
    data = constant.options[item.options]
  } else {
    if (item.options.indexOf('/') === 0) {
      data = await store.dispatch('requestUrl', {url: item.options, params: item.optionsProps})
    } else {
      if (item.type === 'dialog') {
        data = await store.dispatch('getPageOptions', item.options)
      } else if (item.options.startsWith('action:')) {
        data = await store.dispatch(item.options.substr(7))
      } else if (item.options === 'action') {
        data = await store.dispatch(item.optionsProps.actionName, item.optionsProps.actionParams || {})
      } else {
        data = await store.dispatch('getOptions', 'options?code=' + item.options + '&type=' + item.type)
      }
    }
  }
  return data
}

export default CrudUtils

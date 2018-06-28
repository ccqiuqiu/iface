/**
 * Created by 熊超超 on 2018/6/28.
 */

export const optionsDefaultData = (type: string) => {
  if (['select', 'radio', 'radiobutton', 'checkbox', 'checkboxbutton'].includes(type)) {
    return [
      {label: '选项1', value: 1},
      {label: '选项2', value: 2},
    ]
  } else if (type === 'cascader') {
    return [
      {
        value: 1,
        label: '广东省',
        children: [{
          value: 2,
          label: '广州市',
          children: [
            {
              value: 1,
              label: '天河区',
            },
            {
              value: 2,
              label: '番禺区',
            },
          ],
        }],
      },
      {
        value: 2,
        label: '湖北省',
        children: [
          {
            value: 1,
            label: '武汉市',
          },
          {
            value: 2,
            label: '仙桃市',
          },
        ],
      },
    ]
  } else if (type === 'table') {
    return {
      columns: [
        {prop: 'id', label: '编号'},
        {prop: 'userName', label: '名称'},
      ],
      rows: [
        {id: 1, userName: '用户1'},
        {id: 2, userName: '用户2'},
      ],
    }
  } else if (type === 'tree') {
    return [
      {
        label: '一级1',
        id: 1,
        children: [
          {
            label: '二级1-1',
            id: 11,
          },
        ],
      },
      {
        label: '二级2',
        id: 2,
        children: [
          {
            label: '二级2-1',
            id: 21,
          },
        ],
      },
    ]
  }
}

---
title: 图标
---


## 使用方法

```markup
<cc-icon name="name" size="18"></cc-icon>
```

## 属性

| 属性名 | 类型 | 说明 | 是否必须 | 默认值 |
| :--- | :--- | :--- | :--- | :--- |
| name | String | 图标的名称，必须是项目/src/assets/icons/svg目录下的svg文件的文件名 | 是 | - |
| size | Number | 图标的大小，会将这个值设置为图标的font-size属性 | - | 24 |
| className | String | 在组件的根节点上设置的class | - | - |
| rotate | Number | 旋转角度 | - | 0 |

## 事件

| 事件名 | 参数 | 描述 |
| :--- | :--- | :--- |
| click | - | 图标被点击的时候发送 |
---
title: 表格
---

## 使用方法

```javascript
<cc-table
  :rows="data.table.rows"
  :columns="columns"
  :row-key="rowKey"
  :multiSelect="multi"
  @single-click="$emit('rowClick')"
  :selected-rows.sync="selectedRows"
  :current-row.sync="currentRow">
</cc-table>
```

## 表格属性

理论上支持所有elementUI表格的所有属性 [详情](https://element.faas.ele.me/#/zh-CN/component/table#table-attributes) 以下是额外增加的属性

| 属性名 | 类型 | 说明 | 是否必须 | 默认值 |
| :--- | :--- | :--- | :--- | :--- |
| colums | Array | 表格列的属性，详见下文 | 是 | - |
| rows | Array | 表格行的数据 | 是 |  |
| multiSelect | Boolean | 是否多选 | - | 否 |
| selectedRows | Array | 已选择的行数据，当multiSelect为true时有值 | - | 0 |
| currentRow | Object | 当前行的数据，当multiSelect为false时有值 |  |  |

## 表格方法和事件

理论上支持所有elementUI表格的所有事件和方法 详情

## 表格列的属性

colums默认理论上支持elementUI表格列的所有属性 [详情](https://element.faas.ele.me/#/zh-CN/component/table#table-column-attributes) 以下是额外增加的属性

| 属性名 | 类型 | 说明 | 是否必须 | 默认值 |
| :--- | :--- | :--- | :--- | :--- |
| renderCell | Function | 提供渲染JSX的方法，接收以下几个参数 h（渲染函数-必须且名字必须为h）、value（当前列的值）、row（当前行的数据）、index（当前行的索引）、column（当前类的配置）、store（表格内部的store） | - | - |
| renderFun | String | 提供renderCell的方法名，是renderCell的另一种使用方式 |  |  |
| formatFun | String | 提供格式化列的方法名，是elementUI表格列属性formatter的另一种使用方式 |  |  |
---
title: 图表
---

iFace默认内置了v-charts，v-charts是基于elementUI+echarts封装的图表组件，你可以直接按照v-charts的 [文档](https://v-charts.js.org) 使用图表。

iFace另外封装了一个统一的图表组件，使用iFace提供的组件，任意支持的图表类型您都可以用同一个组件，只需要传递一个表示图表类型参数给组件就行了。

## 使用方法

```markup
<cc-chart ref="chart" :data="data" :settings="settings"></cc-chart>
<!--或者-->
<cc-chart ref="chart" v-bind="chartData"></cc-chart>
```

:::tip Tip
* cc-chart组件支持v-charts组件的所有属性，所有在cc-chart组件上的属性都将直接透传给v-charts对应的组件。
* 默认情况，cc-chart会显示为折线图，您可以指定setting.type的值来显示不同的图表，但是图表类型和图表的数据一定要对应，因为v-charts有些图表的数据是需要返回固定的格式的。
:::
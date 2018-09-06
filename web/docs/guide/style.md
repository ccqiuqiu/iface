---
title: 样式
---

## CSS作用域
在样式开发过程中，有两个问题比较突出：

- 全局污染 —— CSS 文件中的选择器是全局生效的，不同文件中的同名选择器，根据 build 后生成文件中的先后顺序，后面的样式会将前面的覆盖；
- 选择器复杂 —— 为了避免上面的问题，我们在编写样式的时候不得不小心翼翼，类名里会带上限制范围的标示，变得越来越长，多人开发时还很容易导致命名风格混乱，一个元素上使用的选择器个数也可能越来越多，最终导致难以维护。
好在 vue 为我们提供了 scoped 可以很方便的解决上述问题。 它顾名思义给 css 加了一个域的概念

```css
 /* 编译前 */
.example {
  color: red;
}
​
/* 编译后 */
.example[_v-f3f3eg9] {
  color: red;
}
```


::: tip 提示
只要加上 ```<style scoped>``` 这样css就只会作用在当前组件内了。详细文档见[vue-loader](https://vue-loader-v14.vuejs.org/zh-cn/features/scoped-css.html)
:::

## 目录结构
iFace 所有全局样式都在 /src/assets/css 目录下设置

```
├── css
│   ├── base.scss           # 基础样式
│   ├── theme.scss          # 自定义 element-ui 样式和主题样式
│   └── vars.scss           # 全局变量
```

::: tip
常见的工作流程是，全局样式都写在 /src/assets/css 目录下，每个页面自己对应的样式都写在自己的 .vue 文件之中
:::

## 自定义 element-ui 样式

可以通过覆盖element-ui的变量来修改全局样式

```css
@import "./vars";
/* 改变element-ui默认主题变量 */
/*主色*/
$--color-primary: $color-primary;
$--color-success: $color-success;
$--color-warning: $color-warning;
$--color-danger: $color-danger;
$--color-info: $color-info;
$--input-border-color: $border-color;
/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';
@import "~element-ui/packages/theme-chalk/src/index";
```

如果想要在某个组件中单独覆盖element-ui的样式，你可在它的父级加一个class，用命名空间来解决问题
```css
.aritle-page{ /* 你的命名空间 */
  .el-tag { /* element-ui 元素*/
    margin-right: 0px;
  }
}
```

## 深度选择器
当你子组件使用了 scoped 但在父组件又想修改子组件的样式可以 通过 /deep/ 来实现：

```css
<style scoped>
.a /deep/ .b { /* ... */ }
</style>
```

将会编译成
```css
.a[data-v-f3f3eg9] .b { /* ... */ }
```

## 基础样式
bsse.scss文件里面定义了一些基础的样式，一般情况下，优先使用这些样式组合实现需要的效果，包含但不限于以下样式：
- 字体大小
- 颜色
- 背景色
- padding、margin
- 边框
- 圆角

## 布局
使用flex.css作为项目总体的布局框架，配合bass.scss里面的一些基础样式，很多情况下，组件里面只需要写很少的样式甚至完全不需要写样式。

::: warning 注意
- 不要在template里面写style，因为这些style不会经过posscss编译,可能会有兼容性问题。可以使用v-bing:style绑定样式
- 不要在css文件里面写固定的颜色值，所有的颜色必须是vars里面定义过的颜色
:::
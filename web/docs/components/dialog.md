---
title: 弹窗
---

## 使用方法

iFace的弹窗推荐在组件中，直接调用Vue原型上的方法，例如：

```javascript
// 显示弹窗
this.$utils.dialog(`选择要显示的内容`, DashboardSelector)

// 关闭弹窗
this.$utils.hideDialog()
```

## 方法签名

```javascript
/**
 * 显示弹窗的方法
 * @param {string} title 弹窗标题
 * @param content 弹窗内容
 * @param options // 其他选择，透传给element
 * @example
 * 简单方式：dialog('标题', '内容')
 * 弹出组件：dialog('标题', Component)
 * 弹出JSX：dialog('标题', (h: any) => <Component data={this.data}></Component>)
 */
public dialog(title: string, content: any, options: any = {})

// 关闭弹窗
public hideDialog()
```

:::tip Tip
* iFace的弹窗最多可以弹出2层，在弹出层里面再次调用打开方法，就会在上层再次弹出一个弹窗
:::
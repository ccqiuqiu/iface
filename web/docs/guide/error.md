---
title: 异常处理
---


## 服务端异常

iFace默认通过接口的响应拦截器处理服务端的异常，默认情况下，会通过弹窗提示所有的接口异常信息。

但是，如果接口不需要提示错误或者需要自行处理异常，可以通过传递参数`_hideGlobalError: true` 来隐藏全局的异常提示主要有3种传递方式

```javascript
// 1.在vue文件中
this.action('test', {_hideGlobalError: true})
// 2.在action里面
api.test({_hideGlobalError: true})
// 3.或者在action里面
api.test({}, {_hideGlobalError: true})
```

以上3种方式，实际上都是将_hideGlobalError作为参数传递给请求的data，在请求拦截器中，会取出这个参数，放到请求头里面，等响应的异常的时候，从请求头中取出这个参数，来判断是否需要显示异常信息的弹窗。

## 客户端异常

客户端的异常一般是运行时js的异常信息，iFace暂未处理，此类异常。如果需要处理，可以通过重写window.onerror方法来捕获js的异常
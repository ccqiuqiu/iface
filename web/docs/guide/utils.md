---
title: 工具类和常量
---

## 工具类

* iFace的工具类主要包含ui类工具\(uiUtils\)、存储类工具\(lsUtils\)、和一些基本工具\(utils\)，其中uiUtils和utils统一加载Vue原型的$utils上，在vue文件中，直接通过  this.$utils可以访问所有的方法。
* uiUtils继承自utils
* 工具类的说明见[API文档 -工具类](/api/utils.md)

## 常量和枚举

* iFace的常量定义在constant.ts，并加载Vue原型的$c上，在vue文件中，直接通过this.$c访问
* iFace在enum.ts中定义了一些枚举，主要用于规范一些数据

:::tip Tip
请使用常量或枚举管理项目中所有的标识字段，如状态、类型这些
:::

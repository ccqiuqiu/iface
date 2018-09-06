---
title: 接口文档
---

## 公共请求 <Badge text="beta" type="warn"/>
```
/版本号/模块/接口名[query|/params]
```
> 这是所有请求的公共参数，所有的接口都遵循这个规律，
> 所以后面的接口将只列出接口独有的入参和请求成功返回的业务数据（data里面的属性）
### 请求
| 参数名 | 数据类型 | 必须 | 默认 | 描述 |
|:---- |:-------:|:-----:|:--:|:--|
|token|String|是(除登录接口外)|-|用户token，放在headers里面|
### 响应
| 参数名 | 数据类型  | 描述 |
|:---- |:-------:|:--|
|success|Boolean|请求是否成功|
|data|Any|success为true的时有值，返回的业务数据|
|error|<Badge text="Object" type="warn"/>|success为false时有值，返回的异常信息|
|error.code|string|异常代码，其中401表示未登录，402表示越权|
|error.message|string|异常信息|


:::tip Tip
以下5个接口是CRUD页面使用的接口，实际后端应该每一个实体后分别有这5个接口，将接口名里面的Modle替换成具体的实体名称，给前端调用。
:::

## 查询实体列表 <Badge text="post"/>
```
/v1/page/search{Model}
```
> 用于查询动态CURD页面的数据列表的接口，这个接口的入参会包含页面上搜索表单中所有非空的字段和下面列表的参数
### 请求
| 参数名 | 数据类型 | 必须 | 默认 | 描述 |
|:---- |:-------:|:-----:|:--:|:--|
|pageNum|Number|-|1|当前页码|
|pageSize|Number|-|10|每页显示条数|
### 响应 <Badge text="Object" type="warn"/>
| 参数名 | 数据类型  | 描述 |
|:---- |:-------:|:--|
|rows|Array|数据列表|
|total|number|总条数|


## 查询单个实体 <Badge text="post"/>
```
/v1/page/get{Model}/:id
```
> 查询单个实体，用于CRUD页面编辑表单的数据初始化
### 请求
| 参数名 | 数据类型 | 必须 | 默认 | 描述 |
|:---- |:-------:|:-----:|:--:|:--|
|id|String|是|-|数据的ID，放在URL后面|
### 响应 <Badge text="Object" type="warn"/>
| 参数名 | 数据类型  | 描述 |
|:---- |:-------:|:--|
|-|-|返回具体的实体里面属性|


## 保存一条数据 <Badge text="post"/>
```
/v1/page/save{Model}
```
> CRUD页面的新增和更新实体的操作， id为空表示新增，否则是更新
### 请求
| 参数名 | 数据类型 | 必须 | 默认 | 描述 |
|:---- |:-------:|:-----:|:--:|:--|
|-|-|-|-|表单的数据|
### 响应 <Badge text="{}" type="warn"/>


## 查看详情 <Badge text="post"/>
```
/v1/page/view{Model}/:id
```
> CRUD页面查看数据详情的接口
### 请求
| 参数名 | 数据类型 | 必须 | 默认 | 描述 |
|:---- |:-------:|:-----:|:--:|:--|
|id|String|是|-|数据的ID，放在URL后面|
### 响应 <Badge text="Object" type="warn"/>
| 参数名 | 数据类型  | 描述 |
|:---- |:-------:|:--|
|-|-|返回具体的实体里面属性|

## 删除一条数据 <Badge text="post"/>
```
/v1/page/del{Model}/:id
```
> CRUD页面通过id删除一条数据的接口
### 请求
| 参数名 | 数据类型 | 必须 | 默认 | 描述 |
|:---- |:-------:|:-----:|:--:|:--|
|id|String|是|-|数据的ID，放在URL后面|
### 响应 <Badge text="{}" type="warn"/>

## 获取选项 <Badge text="get"/>
```
/v1/base/getOptions
```
> 获取选择型组件的选项数据
### 请求
| 参数名 | 数据类型 | 必须 | 默认 | 描述 |
|:---- |:-------:|:-----:|:--:|:--|
|code|String|是|-|数据源的标识，后端根据这个标识返回不同的数据|
|type|String|-|-|数据源类型，后端根据这个类型返回不同的数据结构，如树、表格等|
### 响应 <Badge text="Any" type="warn"/>
| 参数名 | 数据类型  | 描述 |
|:---- |:-------:|:--|
|-|-|这里返回的数据根据入参type会有不同|

## 获取选项（dialog） <Badge text="post"/>
```
/v1/base/getPageOptions/:code
```
> 获取弹窗选择器的选择项数据
### 请求
| 参数名 | 数据类型 | 必须 | 默认 | 描述 |
|:---- |:-------:|:-----:|:--:|:--|
|code|String|是|-|CRUD页面的code|
### 响应 <Badge text="Page" type="warn"/>
| 参数名 | 数据类型  | 描述 |
|:---- |:-------:|:--|
|-|-|返回Page对象|


## 查找所有的Dashboard <Badge text="get"/>
```
/v1/base/getAllDashboard
```
> 获取选择型组件的选项数据
### 请求
-
### 响应 <Badge text="Array<DashBoard>" type="warn"/>
| 参数名 | 数据类型  | 描述 |
|:---- |:-------:|:--|
|-|-|DashBoard对象的数组|


## 查找用户的Dashboard布局 <Badge text="get"/>
```
/v1/base/getUserDashboard
```
> 查找用户已经添加到首页的仪表盘布局，如果用户没有配置过，则返回所有仪表盘的前8个
### 请求
-
### 响应 <Badge text="Array<Dashboard | UserDashboard>" type="warn"/>
| 参数名 | 数据类型  | 描述 |
|:---- |:-------:|:--|
|-|-|仪表盘数组或用户的仪表盘布局|


## 保存用户的Dashboard布局 <Badge text="post"/>
```
/v1/base/saveUserDashboard
```
> 查找用户已经添加到首页的仪表盘布局，如果用户没有配置过，则返回所有仪表盘的前8个
### 请求 <Badge text="Array<UserDashboards>" type="warn"/>
| 参数名 | 数据类型 | 必须 | 默认 | 描述 |
|:---- |:-------:|:-----:|:--:|:--|
|x|Number|是|-|x轴位置|
|y|Number|是|-|y轴位置|
|w|Number|是|-|宽度|
|h|Number|是|-|高度|
|i|String|是|-|顺序|
|dashboardId|String|是|-|dashboard的id|
### 响应 <Badge text="{}" type="warn"/>


## 用户登录 <Badge text="post"/>
```
/v1/public/login
```
>
### 请求
| 参数名 | 数据类型 | 必须 | 默认 | 描述 |
|:---- |:-------:|:-----:|:--:|:--|
|name|String|是|-|用户名|
|password|String|是|-|密码|
### 响应 <Badge text="{}" type="warn"/>

## 获取用户权限数据 <Badge text="get"/>
```
/v1/base/getAuth
```
> 获取用户的权限数据
### 请求
-
### 响应 <Badge text="Object" type="warn"/>
| 参数名 | 数据类型  | 描述 |
|:---- |:-------:|:--|
|user|User|用户数据|
|menus|Menu[]|有权限的菜单数组|
|resources|String[]|有权限的资源数组|


## 获取菜单树 <Badge text="get"/>
```
/v1/system/menuTree
```
> 获取用户的权限数据
### 请求
-
### 响应 <Badge text="Array<Menu>" type="warn"/>
| 参数名 | 数据类型  | 描述 |
|:---- |:-------:|:--|
|id|String|用户数据|
|name|String|有权限的菜单数组|
|icon?|String|有权限的资源数组|
|url?|String|有权限的资源数组|
|children?|Menu[]|有权限的资源数组|
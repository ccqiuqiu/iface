# iFace

## 介绍

> iFace旨在开发一套针对PC端管理后台的通用解决方案，包含管理后台需要的一些核心功能和组件，为类似管理后台系统提供一套基础开发框架。实现在此框架基础上能简单快速的进行具体的业务开发。


[演示](https://demo.ccqiuqiu.win/iface)

[文档](https://ccqiuqiu.gitbook.io/iface/)

## 主要功能
- 基础组件
- 权限管理
- 图表组件
- 动态表单
- dashboard
- 接口录制和mock功能
- 动态CRUD


## 项目结构
- web -  iFace前端项目
- service - 配套的node.js后端
- iFace并不限制后端的语言，只需要按照文档约定开发后端就可以了。

## 使用说明

### 后端
- 以下命令要在/service目录下运行
- 需要mysql数据库，数据库配置文件在  /service/data/db.ts
- 需要redis数据库，配置文件在 /service/utils/redis.ts
- 项目初次运行，执行 npm i 安装依赖
- 可以全局安装pm2，用于生产模式启动，执行：npm i pm2 -g
- 使用npm run dev命令用开发模式启动， 关闭cmd窗口即停止
- 使用npm start用生产模式启动（必须先），执行npm stop停止服务

### 前端
- 以下命令要在/web目录下运行
- 项目初次运行，执行 npm i 安装依赖
- 使用npm run dev启动开发模式
- 使用npm run build编译前端项目
- /web/dist目录是编译生成的文件，放到任意web服务器上就可以访问
/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : localhost:3306
 Source Schema         : base-api

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : 65001

 Date: 04/07/2019 13:42:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dashboard
-- ----------------------------
DROP TABLE IF EXISTS `dashboard`;
CREATE TABLE `dashboard` (
  `id` varchar(255) NOT NULL,
  `name` varchar(32) NOT NULL,
  `type` varchar(16) NOT NULL,
  `color` varchar(32) DEFAULT NULL,
  `icon` varchar(32) DEFAULT NULL,
  `url` varchar(128) NOT NULL,
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dashboard
-- ----------------------------
BEGIN;
INSERT INTO `dashboard` VALUES ('210a5a5a-0e20-4871-8809-956d824a6395', '新用户', 'info', '#53BEEA', 'user', '/v1/base/userNum', '2018-07-24 16:18:43.029491', '2018-08-01 14:28:06.000000');
INSERT INTO `dashboard` VALUES ('4ace586e-104f-484c-a73e-afc4f8b1b5c4', '图表2', 'funnel', '#CCB507', 'chart', '/v1/base/chartDemo', '2018-07-24 16:23:43.428023', '2018-08-01 14:28:43.000000');
INSERT INTO `dashboard` VALUES ('4b79eadd-bd7b-4c04-b14d-fc61a8459e49', '我的消息', 'table', NULL, 'table', '/v1/base/messageList', '2018-07-24 16:22:22.837350', '2018-08-01 14:28:33.000000');
INSERT INTO `dashboard` VALUES ('5c1b4798-781d-450e-a9f0-a6f9e6076a38', '订单数量', 'info', '#49A361', 'view', '/v1/base/newOrder', '2018-07-24 16:19:07.753772', '2018-08-01 14:28:10.000000');
INSERT INTO `dashboard` VALUES ('61e038bd-4957-44a5-b2f0-e2e87c6b7975', '图表1', 'histogram', '#CD0E8A', 'chart', '/v1/base/chartDemo', '2018-07-24 16:23:05.465372', '2018-08-01 14:28:38.000000');
INSERT INTO `dashboard` VALUES ('b001615c-91ca-4327-8f12-4c9b9d75dcad', '待办任务', 'list', '#15979C', 'menu', '/v1/base/todoList', '2018-07-24 16:22:02.328600', '2018-08-01 14:28:27.000000');
INSERT INTO `dashboard` VALUES ('b18e9edf-7673-4ce0-a6ba-e9da7dcbb42b', '我的工单', 'info', '#CD5542', 'drag', '/v1/base/workNum', '2018-07-24 16:21:24.566937', '2018-08-01 14:28:23.000000');
INSERT INTO `dashboard` VALUES ('fce95764-83a7-4b01-bf83-2308f8e8e035', '未读信息', 'info', '#E79F3C', 'cascader', '/v1/base/messageNum', '2018-07-24 16:19:50.205610', '2018-08-01 14:28:15.000000');
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` varchar(255) NOT NULL,
  `name` varchar(32) NOT NULL,
  `url` varchar(256) DEFAULT NULL,
  `icon` varchar(32) DEFAULT NULL,
  `sort` int(11) NOT NULL,
  `parentId` varchar(255) DEFAULT NULL,
  `_parentId` varchar(255) DEFAULT NULL,
  `mpath` varchar(255) DEFAULT '',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `openType` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_23ac1b81a7bfb85b14e86bd23a5` (`parentId`),
  CONSTRAINT `FK_23ac1b81a7bfb85b14e86bd23a5` FOREIGN KEY (`parentId`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` VALUES ('0043e434-ad00-4920-b2c6-417be5a98e77', 'Dashboard管理', '/baseData/page/dashboard', '', 10, 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', '', '2018-07-24 14:44:57.376540', '2019-06-30 21:27:33.000000', 1);
INSERT INTO `menu` VALUES ('1b198587-b9bf-4c2e-8fa7-fc00cacb8ffc', '3级菜单', NULL, NULL, 1, 'bff51be5-efe6-4453-840e-9dee3e815b35', 'bff51be5-efe6-4453-840e-9dee3e815b35', 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f.bff51be5-efe6-4453-840e-9dee3e815b35.1b198587-b9bf-4c2e-8fa7-fc00cacb8ffc.', '2019-07-03 16:13:25.659385', '2019-07-03 16:13:25.000000', 1);
INSERT INTO `menu` VALUES ('24f832d8-9da6-4715-ad25-f4f74a21ae36', '资源管理', '/baseData/page/resource', '', 4, 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', '', '2018-07-24 14:44:57.376540', '2019-06-30 21:27:19.000000', 1);
INSERT INTO `menu` VALUES ('2b437fe2-b053-4076-b4b2-d5ddd5289089', '菜单管理', '/baseData/page/menu', '', 3, 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', '', '2018-07-24 14:44:57.376540', '2019-06-30 21:27:16.000000', 1);
INSERT INTO `menu` VALUES ('2e4d1f07-d34a-4698-9b6b-9109febc927c', '基础数据', '', 'form', 3, NULL, NULL, '', '2018-07-24 14:44:57.376540', '2018-08-14 13:22:55.000000', 1);
INSERT INTO `menu` VALUES ('33801d9d-5b51-4faf-acca-bf1635c4a1c9', 'iframe菜单', 'http://www.baidu.com', NULL, 2, 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f', 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f', 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f.33801d9d-5b51-4faf-acca-bf1635c4a1c9.', '2019-07-03 10:50:56.612889', '2019-07-03 16:04:23.000000', 2);
INSERT INTO `menu` VALUES ('55d167cf-00be-4dbd-ba85-3475318269a0', '角色管理', '/baseData/page/role', '', 6, 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', '', '2018-07-24 14:44:57.376540', '2018-08-15 11:25:07.000000', 1);
INSERT INTO `menu` VALUES ('569f2455-f5e9-4502-a8ed-db2ae5d84c2e', '外链', 'https://github.com/ccqiuqiu', NULL, 1, 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f', 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f', 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f.569f2455-f5e9-4502-a8ed-db2ae5d84c2e.', '2019-07-03 10:50:33.318931', '2019-07-03 16:02:02.000000', 3);
INSERT INTO `menu` VALUES ('87e6454f-770e-476f-8bbe-da702ec81a96', '在线渲染页面', '/baseData/page/test', '', 11, '2e4d1f07-d34a-4698-9b6b-9109febc927c', '2e4d1f07-d34a-4698-9b6b-9109febc927c', '87e6454f-770e-476f-8bbe-da702ec81a96.', '2018-08-08 10:17:41.152700', '2019-06-30 21:27:46.000000', 1);
INSERT INTO `menu` VALUES ('bd4e1000-e934-44f1-be7e-ceac5f73f80e', '动态页面', '/baseData/pageList', '', 10, '2e4d1f07-d34a-4698-9b6b-9109febc927c', '2e4d1f07-d34a-4698-9b6b-9109febc927c', '', '2018-07-24 14:44:57.376540', '2018-08-15 10:23:39.000000', 1);
INSERT INTO `menu` VALUES ('bff51be5-efe6-4453-840e-9dee3e815b35', '2级菜单', NULL, NULL, 3, 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f', 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f', 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f.bff51be5-efe6-4453-840e-9dee3e815b35.', '2019-07-03 16:12:57.001369', '2019-07-03 16:12:57.000000', 1);
INSERT INTO `menu` VALUES ('d19c4517-37ad-4496-bce6-f62fdc5aeebd', '系统管理', '', 'system', 2, NULL, NULL, '', '2018-07-24 14:44:57.376540', '2018-08-14 13:22:55.000000', 1);
INSERT INTO `menu` VALUES ('d1f40cb0-d59d-47c2-ae24-b2bc4d1b344f', '测试菜单', NULL, NULL, 4, NULL, NULL, 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f.', '2019-07-03 10:49:38.841066', '2019-07-03 10:49:38.000000', 1);
INSERT INTO `menu` VALUES ('e096b9c3-2c21-4f1c-8af9-3ce55c49559c', '用户管理', '/baseData/page/user', 'user', 7, 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', '', '2018-07-24 14:44:57.376540', '2019-06-30 21:27:27.000000', 1);
COMMIT;

-- ----------------------------
-- Table structure for page
-- ----------------------------
DROP TABLE IF EXISTS `page`;
CREATE TABLE `page` (
  `id` varchar(255) NOT NULL,
  `name` varchar(32) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `code` varchar(255) NOT NULL,
  `resource` varchar(32) DEFAULT NULL,
  `value` text NOT NULL,
  `searchUrl` varchar(128) DEFAULT NULL,
  `getUrl` varchar(128) DEFAULT NULL,
  `delUrl` varchar(128) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `saveUrl` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fd5e6bf52f1f8d30e0df56c0e6` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of page
-- ----------------------------
BEGIN;
INSERT INTO `page` VALUES ('09bf1fd2-8254-4f61-b9b9-22c5b45f3a90', '资源管理', 1, 'resource', 'system/resource', '{\"title\":\"资源管理\",\"name\":\"system/resource\",\"items\":[{\"label\":\"名称\",\"prop\":\"name\",\"multiSelect\":false,\"placeholder\":\"请输入资源名称\",\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"verify\":{\"required\":true,\"maxLength\":32},\"formProps\":{\"type\":\"text\"}},{\"label\":\"请求方法\",\"prop\":\"method\",\"target\":[\"editForm\",\"searchForm\",\"table\",\"view\"],\"multiSelect\":false,\"formProps\":{\"type\":\"select\",\"options\":\"methods\"}},{\"label\":\"URL\",\"prop\":\"url\",\"multiSelect\":false,\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"placeholder\":\"请输入资源URL\",\"verify\":{\"required\":true,\"maxLength\":64},\"formProps\":{\"type\":\"text\"}}],\"searchForm\":{\"model\":{}},\"editForm\":{\"model\":{}},\"table\":{\"rows\":[]}}', '', '', '', '资源管理页面', '2018-07-24 14:44:57.797222', '2018-09-07 10:56:20.000000', '');
INSERT INTO `page` VALUES ('5faeacfb-81e1-4f8d-8534-802fb8b5e979', '测试', 10, 'test', NULL, '<template>\n  <div class=\"bb\">\n    <div>这是在线编辑的VUE渲染示例</div>\n    <div>{{b}}</div>\n  </div>\n</template>\n\n<script>\n  export default {\n    components: {},\n    data () {\n      return {\n        a: \'hello\'\n      }\n    },\n    computed: {\n      b() {\n        return this.a + \' word\'\n      }\n    }\n  }\n</script>\n\n<style scoped>\n  .bb{\n    color: #ff0000;\n  }\n</style>', NULL, NULL, NULL, '测试VUE渲染', '2018-08-08 10:09:08.384518', '2018-08-28 14:12:35.000000', NULL);
INSERT INTO `page` VALUES ('66ca46ad-fbf0-4594-8727-08e0345a21c4', '用户管理', 1, 'user', 'system/user', '{\"title\":\"用户管理\",\"name\":\"system/user\",\"items\":[{\"label\":\"名称\",\"prop\":\"name\",\"placeholder\":\"请输入用户名\",\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"verify\":{\"required\":true,\"maxLength\":64},\"formProps\":{\"type\":\"text\"},\"multiSelect\":false},{\"label\":\"密码\",\"prop\":\"password\",\"target\":[\"editForm\"],\"placeholder\":\"请输入密码\",\"verify\":{\"required\":true,\"maxLength\":32},\"formProps\":{\"type\":\"text\"},\"multiSelect\":false},{\"label\":\"电话\",\"prop\":\"tel\",\"multiSelect\":false,\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"placeholder\":\"请输入电话号码\",\"formProps\":{\"type\":\"text\"}},{\"label\":\"性别\",\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"prop\":\"sex\",\"formProps\":{\"type\":\"select\",\"options\":\"sex\"},\"multiSelect\":false,\"verify\":{\"required\":true}},{\"label\":\"角色\",\"prop\":\"roleIds\",\"target\":[\"table\",\"view\",\"editForm\"],\"multiSelect\":true,\"formProps\":{\"type\":\"tree\",\"props\":{\"check-strictly\":true},\"options\":\"roleTree\"}},{\"label\":\"状态\",\"prop\":\"status\",\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"formProps\":{\"type\":\"select\",\"options\":\"status\"},\"multiSelect\":false,\"verify\":{\"required\":true}}],\"searchForm\":{\"model\":{}},\"editForm\":{\"model\":{}},\"table\":{\"rows\":[]}}', NULL, NULL, NULL, '用户管理的页面', '2018-07-24 14:44:57.797222', '2019-07-03 15:48:26.000000', NULL);
INSERT INTO `page` VALUES ('95344dce-a30a-4a19-a126-d8279d42ed88', 'Dashboard管理', 1, 'dashboard', 'system/dashboard', '{\"title\":\"Dashboard管理\",\"name\":\"system/dashboard\",\"items\":[{\"label\":\"名称\",\"prop\":\"name\",\"target\":[\"editForm\",\"searchForm\",\"view\",\"table\"],\"multiSelect\":false,\"placeholder\":\"请输入名称\",\"verify\":{\"required\":true},\"formProps\":{\"type\":\"text\"}},{\"label\":\"类型\",\"prop\":\"type\",\"target\":[\"editForm\",\"view\",\"searchForm\",\"table\"],\"multiSelect\":false,\"formProps\":{\"type\":\"select\",\"options\":\"dashboardType\"},\"tableProps\":{\"formatFun\":\"dashboardTypeFormat\"}},{\"label\":\"图标\",\"prop\":\"icon\",\"target\":[\"editForm\",\"view\",\"table\"],\"multiSelect\":false,\"formProps\":{\"type\":\"icon\"}},{\"label\":\"颜色\",\"prop\":\"color\",\"target\":[\"editForm\",\"view\",\"table\"],\"multiSelect\":false,\"formProps\":{\"type\":\"color\"},\"tableProps\":{\"formatFun\":\"colorRender\"}},{\"label\":\"数据源\",\"prop\":\"url\",\"target\":[\"editForm\",\"view\",\"table\"],\"multiSelect\":false,\"placeholder\":\"请输入数据源的URL\",\"formProps\":{\"type\":\"text\"}}],\"searchForm\":{\"model\":{}},\"editForm\":{\"model\":{}},\"table\":{\"rows\":[]}}', NULL, NULL, NULL, 'Dashboard管理页面', '2018-07-24 14:44:57.797222', '2018-09-07 10:41:15.000000', NULL);
INSERT INTO `page` VALUES ('9945eb06-3f09-4b9a-b6b5-b9a45a30876b', '角色管理', 1, 'role', 'system/role', '{\"title\":\"角色管理\",\"name\":\"system/role\",\"items\":[{\"label\":\"角色名称\",\"prop\":\"name\",\"placeholder\":\"请输入角色名称\",\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"verify\":{\"required\":true,\"maxLength\":32},\"formProps\":{\"type\":\"text\"},\"multiSelect\":false},{\"label\":\"角色代码\",\"prop\":\"code\",\"multiSelect\":false,\"target\":[\"editForm\",\"searchForm\",\"table\",\"view\"],\"placeholder\":\"请输入角色代码\",\"verify\":{\"required\":true,\"maxLength\":32},\"formProps\":{\"type\":\"text\"}},{\"label\":\"是否角色组\",\"prop\":\"isGroup\",\"target\":[\"editForm\",\"searchForm\",\"table\",\"view\"],\"multiSelect\":false,\"formProps\":{\"type\":\"radio\",\"options\":\"yesOrNo\"}},{\"label\":\"所属角色组\",\"prop\":\"parentId\",\"target\":[\"editForm\"],\"multiSelect\":false,\"formProps\":{\"type\":\"select\",\"options\":{\"actionName\":\"getRoleGroup\"}}},{\"label\":\"菜单权限\",\"prop\":\"menuIds\",\"target\":[\"editForm\"],\"multiSelect\":true,\"formProps\":{\"type\":\"tree\",\"options\":\"menuTree\"}},{\"label\":\"资源权限\",\"prop\":\"resourceIds\",\"target\":[\"editForm\"],\"multiSelect\":true,\"formProps\":{\"type\":\"dialog\",\"options\":\"resource\"}},{\"label\":\"描述\",\"prop\":\"remark\",\"target\":[\"editForm\",\"table\",\"view\"],\"placeholder\":\"请输入觉得描述\",\"formProps\":{\"type\":\"textarea\"},\"multiSelect\":false,\"verify\":{\"maxLength\":32}}],\"searchForm\":{\"model\":{}},\"editForm\":{\"model\":{}},\"table\":{\"rows\":[]}}', NULL, NULL, NULL, '角色管理', '2018-07-24 14:44:57.797222', '2019-07-03 13:49:45.000000', NULL);
INSERT INTO `page` VALUES ('f4b5dc60-fa82-493a-be85-76f03e0e53d5', '菜单管理', 2, 'menu', 'system/menu', '{\"title\":\"菜单管理\",\"name\":\"system/menu\",\"items\":[{\"label\":\"菜单名称\",\"prop\":\"name\",\"placeholder\":\"请输入菜单名称\",\"verify\":{\"required\":true,\"maxLength\":32},\"multiSelect\":false,\"target\":[\"editForm\",\"view\"],\"formProps\":{\"type\":\"text\"}},{\"label\":\"菜单URL\",\"prop\":\"url\",\"placeholder\":\"请输入菜单URL\",\"multiSelect\":false,\"target\":[\"editForm\",\"view\"],\"formProps\":{\"type\":\"text\"},\"verify\":{\"maxLength\":256}},{\"label\":\"打开位置\",\"prop\":\"openType\",\"target\":[\"editForm\",\"searchForm\",\"table\",\"view\"],\"multiSelect\":false,\"formProps\":{\"type\":\"select\",\"options\":\"menuOpenType\"}},{\"label\":\"上级菜单\",\"prop\":\"parentId\",\"multiSelect\":false,\"placeholder\":\"无\",\"target\":[\"editForm\",\"view\"],\"formProps\":{\"type\":\"tree\",\"options\":\"menuTree\"}},{\"label\":\"菜单图标\",\"prop\":\"icon\",\"placeholder\":\"选择菜单图标\",\"multiSelect\":false,\"target\":[\"editForm\",\"view\"],\"formProps\":{\"type\":\"icon\"}}],\"searchForm\":{\"model\":{}},\"editForm\":{\"model\":{}},\"table\":{\"rows\":[]}}', NULL, NULL, NULL, '菜单管理的页面', '2018-07-24 14:44:57.797222', '2019-07-03 10:48:07.000000', NULL);
COMMIT;

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` varchar(255) NOT NULL,
  `name` varchar(32) NOT NULL,
  `method` varchar(64) NOT NULL,
  `url` varchar(64) NOT NULL,
  `edit` tinyint(4) NOT NULL DEFAULT '1',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource
-- ----------------------------
BEGIN;
INSERT INTO `resource` VALUES ('014c5825-a01a-443c-bb33-6e650e99d6c8', '234 保存', 'PUT', '2334534534', 2, '2019-07-02 16:18:28.457118', '2019-07-02 16:18:28.457118');
INSERT INTO `resource` VALUES ('05d4223f-3a4b-4b9a-be2b-d1718dbf426c', '用户管理 详情', 'GET', 'system/user/*', 2, '2019-07-03 15:48:26.559422', '2019-07-03 15:48:26.559422');
INSERT INTO `resource` VALUES ('09f6c053-ab79-4071-bcf5-9be3cd1a6160', '234 详情', 'GET', '2334534534/*', 2, '2019-07-02 16:18:28.457118', '2019-07-02 16:18:28.457118');
INSERT INTO `resource` VALUES ('24987aca-8e66-491c-a68a-19f3f4417fbf', '234 搜索', 'GET', '2334534534', 2, '2019-07-02 16:18:28.457118', '2019-07-02 16:18:28.457118');
INSERT INTO `resource` VALUES ('3884f35b-6469-40cb-bceb-b611d2d6a143', '角色管理 搜索', 'GET', 'system/role', 2, '2019-07-03 13:49:45.950404', '2019-07-03 13:49:45.950404');
INSERT INTO `resource` VALUES ('3f8f4190-819e-4902-bcf1-b0679c361527', '角色管理 删除', 'DELETE', 'system/role/*', 2, '2019-07-03 13:49:45.950404', '2019-07-03 13:49:45.950404');
INSERT INTO `resource` VALUES ('41b04ece-ec7c-4967-b6d3-dcc569714e87', '菜单管理 详情', 'GET', 'system/menu/*', 2, '2019-07-03 10:48:07.212487', '2019-07-03 10:48:07.212487');
INSERT INTO `resource` VALUES ('4ceb0281-370e-4ae0-bc77-238b31833948', '角色管理 详情', 'GET', 'system/role/*', 2, '2019-07-03 13:49:45.950404', '2019-07-03 13:49:45.950404');
INSERT INTO `resource` VALUES ('50e3f000-419a-4345-b155-e5a5416c22c0', '资源管理 删除', 'DELETE', 'system/resource/*', 2, '2018-09-07 14:07:04.263528', '2018-09-07 14:07:04.263528');
INSERT INTO `resource` VALUES ('5333d4f2-a353-4235-92f9-4a46ec869656', '用户管理 搜索', 'GET', 'system/user', 2, '2019-07-03 15:48:26.559422', '2019-07-03 15:48:26.559422');
INSERT INTO `resource` VALUES ('5c3ac4fc-46cc-4bd1-a891-ca8d98ea5d15', '234 删除', 'DELETE', '2334534534/*', 2, '2019-07-02 16:18:28.457118', '2019-07-02 16:18:28.457118');
INSERT INTO `resource` VALUES ('8308deef-d28b-4950-ae6c-902483d088d3', '用户管理 保存', 'PUT', 'system/user', 2, '2019-07-03 15:48:26.559422', '2019-07-03 15:48:26.559422');
INSERT INTO `resource` VALUES ('908f19a4-8f88-43a6-bec2-0a2134a4d923', '资源管理 保存', 'PUT', 'system/resource', 2, '2018-09-07 14:07:04.263528', '2018-09-07 14:07:04.263528');
INSERT INTO `resource` VALUES ('921b614f-466e-4716-a0c2-6502efbd9c8c', '菜单管理 保存', 'PUT', 'system/menu', 2, '2019-07-03 10:48:07.212487', '2019-07-03 10:48:07.212487');
INSERT INTO `resource` VALUES ('aa241679-1b05-491f-a808-bfbe6f14bf64', '菜单管理 搜索', 'GET', 'system/menu', 2, '2019-07-03 10:48:07.212487', '2019-07-03 10:48:07.212487');
INSERT INTO `resource` VALUES ('d25c77c5-3269-40a5-927c-6a85150fe2ef', '菜单管理 删除', 'DELETE', 'system/menu/*', 2, '2019-07-03 10:48:07.212487', '2019-07-03 10:48:07.212487');
INSERT INTO `resource` VALUES ('d4a729df-a6ca-4769-a6f6-f33fd0bb4f9c', '用户管理 删除', 'DELETE', 'system/user/*', 2, '2019-07-03 15:48:26.559422', '2019-07-03 15:48:26.559422');
INSERT INTO `resource` VALUES ('dc13197d-4832-4490-a970-2e2c8ab45e1b', '资源管理 详情', 'GET', 'system/resource/*', 2, '2018-09-07 14:07:04.263528', '2018-09-07 14:07:04.263528');
INSERT INTO `resource` VALUES ('f49c6e60-5113-40f2-9a3d-f8356c962eb8', '角色管理 保存', 'PUT', 'system/role', 2, '2019-07-03 13:49:45.950404', '2019-07-03 13:49:45.950404');
INSERT INTO `resource` VALUES ('fa0c6d8f-1739-4021-a589-12da2a511c22', '资源管理 搜索', 'GET', 'system/resource', 2, '2018-09-07 14:07:04.263528', '2018-09-07 14:07:04.263528');
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` varchar(255) NOT NULL,
  `name` varchar(32) NOT NULL,
  `code` varchar(32) NOT NULL,
  `remark` varchar(64) DEFAULT NULL,
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `isGroup` tinyint(4) NOT NULL DEFAULT '0',
  `parentId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ee999bb389d7ac0fd967172c41` (`code`),
  KEY `FK_e69cd3e2721eaa1e70958498a85` (`parentId`),
  CONSTRAINT `FK_e69cd3e2721eaa1e70958498a85` FOREIGN KEY (`parentId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES ('0eccf581-8415-4139-8647-f05426dff80a', '测试组', 'group', NULL, '2019-07-03 13:51:42.600322', '2019-07-03 13:51:42.600322', 1, NULL);
INSERT INTO `role` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', '运营', 'yy', '运营人员的角色', '2018-07-24 14:44:57.515909', '2018-07-24 14:44:57.561953', 0, NULL);
INSERT INTO `role` VALUES ('5634f861-7725-44f1-ba8b-976f772ef2d9', '测试', 'test', '测试人员的角色', '2018-07-24 14:44:57.515909', '2019-07-03 13:59:09.000000', 0, '0eccf581-8415-4139-8647-f05426dff80a');
INSERT INTO `role` VALUES ('9c0427c8-1a1b-4eb5-ae10-00da0872fea0', '超级管理员', 'admin', '超级管理员角色', '2018-07-23 14:57:10.000000', '2018-07-24 14:44:57.561953', 0, NULL);
COMMIT;

-- ----------------------------
-- Table structure for role-menu
-- ----------------------------
DROP TABLE IF EXISTS `role-menu`;
CREATE TABLE `role-menu` (
  `roleId` varchar(255) NOT NULL,
  `menuId` varchar(255) NOT NULL,
  PRIMARY KEY (`roleId`,`menuId`),
  KEY `FK_fc5db95812494b246385f3b77ac` (`menuId`),
  CONSTRAINT `FK_083e9a418170b2bdfea4962f014` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_fc5db95812494b246385f3b77ac` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role-menu
-- ----------------------------
BEGIN;
INSERT INTO `role-menu` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', '2e4d1f07-d34a-4698-9b6b-9109febc927c');
INSERT INTO `role-menu` VALUES ('0eccf581-8415-4139-8647-f05426dff80a', '33801d9d-5b51-4faf-acca-bf1635c4a1c9');
INSERT INTO `role-menu` VALUES ('0eccf581-8415-4139-8647-f05426dff80a', '569f2455-f5e9-4502-a8ed-db2ae5d84c2e');
INSERT INTO `role-menu` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', '87e6454f-770e-476f-8bbe-da702ec81a96');
INSERT INTO `role-menu` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', 'bd4e1000-e934-44f1-be7e-ceac5f73f80e');
INSERT INTO `role-menu` VALUES ('0eccf581-8415-4139-8647-f05426dff80a', 'd1f40cb0-d59d-47c2-ae24-b2bc4d1b344f');
COMMIT;

-- ----------------------------
-- Table structure for role-resource
-- ----------------------------
DROP TABLE IF EXISTS `role-resource`;
CREATE TABLE `role-resource` (
  `roleId` varchar(255) NOT NULL,
  `resourceId` varchar(255) NOT NULL,
  PRIMARY KEY (`roleId`,`resourceId`),
  KEY `FK_db2c13fbc22de29a7beff4de5a5` (`resourceId`),
  CONSTRAINT `FK_85437a7329b4214f2150b08be7a` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_db2c13fbc22de29a7beff4de5a5` FOREIGN KEY (`resourceId`) REFERENCES `resource` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role-resource
-- ----------------------------
BEGIN;
INSERT INTO `role-resource` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', '50e3f000-419a-4345-b155-e5a5416c22c0');
INSERT INTO `role-resource` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', '908f19a4-8f88-43a6-bec2-0a2134a4d923');
INSERT INTO `role-resource` VALUES ('5634f861-7725-44f1-ba8b-976f772ef2d9', 'dc13197d-4832-4490-a970-2e2c8ab45e1b');
INSERT INTO `role-resource` VALUES ('5634f861-7725-44f1-ba8b-976f772ef2d9', 'fa0c6d8f-1739-4021-a589-12da2a511c22');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `userName` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `tel` varchar(32) DEFAULT NULL,
  `sex` tinyint(4) NOT NULL DEFAULT '1',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `openId` varchar(256) DEFAULT NULL,
  `unionId` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_da5934070b5f2726ebfd3122c8` (`userName`),
  UNIQUE KEY `IDX_ff716f76b4bf8176aa40d0c87c` (`tel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('314e3e04-cb2f-46f7-83a1-013a728ef2db', 'admin', '123456', '18888888888', 1, 1, '2018-07-24 14:44:57.703238', '2018-07-24 14:44:57.752295', NULL, NULL);
INSERT INTO `user` VALUES ('8870a871-da7d-4bf7-bfe1-f0bd684905e4', 'test', '123456', '13333333333', 2, 1, '2018-07-24 14:44:57.703238', '2018-07-24 14:44:57.752295', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for user-dashboard
-- ----------------------------
DROP TABLE IF EXISTS `user-dashboard`;
CREATE TABLE `user-dashboard` (
  `id` varchar(255) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `w` int(11) NOT NULL,
  `h` int(11) NOT NULL,
  `i` varchar(32) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `dashboardId` varchar(255) DEFAULT NULL,
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_20bd46582e6e556bacf96d2b29c` (`userId`),
  KEY `FK_e5143f83abc44fc0fb93fad9c8e` (`dashboardId`),
  CONSTRAINT `FK_20bd46582e6e556bacf96d2b29c` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_e5143f83abc44fc0fb93fad9c8e` FOREIGN KEY (`dashboardId`) REFERENCES `dashboard` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user-role
-- ----------------------------
DROP TABLE IF EXISTS `user-role`;
CREATE TABLE `user-role` (
  `userId` varchar(255) NOT NULL,
  `roleId` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `FK_72fc8ca8521491cbf3c04e31752` (`roleId`),
  CONSTRAINT `FK_72fc8ca8521491cbf3c04e31752` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_c7c1bb73f89bbdd47b4afb1bab9` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user-role
-- ----------------------------
BEGIN;
INSERT INTO `user-role` VALUES ('8870a871-da7d-4bf7-bfe1-f0bd684905e4', '5634f861-7725-44f1-ba8b-976f772ef2d9');
INSERT INTO `user-role` VALUES ('314e3e04-cb2f-46f7-83a1-013a728ef2db', '9c0427c8-1a1b-4eb5-ae10-00da0872fea0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

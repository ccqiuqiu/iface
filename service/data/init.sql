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

 Date: 03/08/2018 14:00:52
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
  `url` varchar(64) NOT NULL,
  `icon` varchar(32) DEFAULT NULL,
  `sort` int(11) NOT NULL,
  `parentId` varchar(255) DEFAULT NULL,
  `_parentId` varchar(255) DEFAULT NULL,
  `mpath` varchar(255) DEFAULT '',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_23ac1b81a7bfb85b14e86bd23a5` (`parentId`),
  CONSTRAINT `FK_23ac1b81a7bfb85b14e86bd23a5` FOREIGN KEY (`parentId`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` VALUES ('0043e434-ad00-4920-b2c6-417be5a98e77', 'Dashboard管理', 'dashboard', '', 7, 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', '', '2018-07-24 14:44:57.376540', '2018-07-24 14:44:57.431608');
INSERT INTO `menu` VALUES ('24f832d8-9da6-4715-ad25-f4f74a21ae36', '资源管理', '/baseData/page/resource', '', 4, 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', '', '2018-07-24 14:44:57.376540', '2018-07-24 14:44:57.431608');
INSERT INTO `menu` VALUES ('2b437fe2-b053-4076-b4b2-d5ddd5289089', '菜单管理', '/system/menu', '', 3, 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', '', '2018-07-24 14:44:57.376540', '2018-07-24 14:44:57.431608');
INSERT INTO `menu` VALUES ('2e4d1f07-d34a-4698-9b6b-9109febc927c', '基础数据', '', 'form', 2, NULL, NULL, '', '2018-07-24 14:44:57.376540', '2018-07-24 14:44:57.431608');
INSERT INTO `menu` VALUES ('55d167cf-00be-4dbd-ba85-3475318269a0', '角色管理', '/baseData/page/role', '', 5, 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', '', '2018-07-24 14:44:57.376540', '2018-07-24 14:44:57.431608');
INSERT INTO `menu` VALUES ('bd4e1000-e934-44f1-be7e-ceac5f73f80e', '动态页面', '/baseData/pageList', '', 8, '2e4d1f07-d34a-4698-9b6b-9109febc927c', '2e4d1f07-d34a-4698-9b6b-9109febc927c', '', '2018-07-24 14:44:57.376540', '2018-07-24 14:44:57.431608');
INSERT INTO `menu` VALUES ('d19c4517-37ad-4496-bce6-f62fdc5aeebd', '系统管理', '', 'system', 1, NULL, NULL, '', '2018-07-24 14:44:57.376540', '2018-07-24 14:44:57.431608');
INSERT INTO `menu` VALUES ('e096b9c3-2c21-4f1c-8af9-3ce55c49559c', '用户管理', 'user', 'user', 6, 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd', '', '2018-07-24 14:44:57.376540', '2018-07-24 14:44:57.431608');
COMMIT;

-- ----------------------------
-- Table structure for page
-- ----------------------------
DROP TABLE IF EXISTS `page`;
CREATE TABLE `page` (
  `id` varchar(255) NOT NULL,
  `name` varchar(32) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `pageName` varchar(32) NOT NULL,
  `pageCode` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `pageDesc` varchar(255) DEFAULT NULL,
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_1dd1272727644cc47d8293b274` (`pageCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of page
-- ----------------------------
BEGIN;
INSERT INTO `page` VALUES ('09bf1fd2-8254-4f61-b9b9-22c5b45f3a90', 'Resource', 1, '资源管理', 'resource', '{\"title\":\"资源管理\",\"name\":\"Resource\",\"items\":[{\"label\":\"名称\",\"prop\":\"name\",\"multiSelect\":false,\"placeholder\":\"请输入资源名称\",\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"verify\":{\"required\":true,\"maxLength\":32},\"formProps\":{\"type\":\"text\"}},{\"label\":\"URL\",\"prop\":\"url\",\"multiSelect\":false,\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"placeholder\":\"请输入资源URL\",\"verify\":{\"required\":true,\"maxLength\":64},\"formProps\":{\"type\":\"text\"}}],\"searchForm\":{\"model\":{}},\"editForm\":{\"model\":{}},\"table\":{\"rows\":[]},\"needQuery\":true}', '资源管理页面', '2018-07-24 14:44:57.797222', '2018-07-26 15:07:09.000000');
INSERT INTO `page` VALUES ('66ca46ad-fbf0-4594-8727-08e0345a21c4', 'User', 1, '用户管理', 'user', '{\"title\":\"用户管理\",\"name\":\"User\",\"items\":[{\"label\":\"名称\",\"prop\":\"name\",\"placeholder\":\"请输入用户名\",\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"verify\":{\"required\":true,\"maxLength\":64},\"formProps\":{\"type\":\"text\"},\"multiSelect\":false},{\"label\":\"密码\",\"prop\":\"password\",\"target\":[\"editForm\"],\"placeholder\":\"请输入密码\",\"verify\":{\"required\":true,\"maxLength\":32},\"formProps\":{\"type\":\"text\"},\"multiSelect\":false},{\"label\":\"电话\",\"prop\":\"tel\",\"multiSelect\":false,\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"placeholder\":\"请输入电话号码\",\"formProps\":{\"type\":\"text\"}},{\"label\":\"性别\",\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"prop\":\"sex\",\"formProps\":{\"type\":\"select\",\"options\":\"sex\"},\"multiSelect\":false,\"verify\":{\"required\":true},\"tableProps\":{\"width\":\"\"}},{\"label\":\"角色\",\"prop\":\"roleIds\",\"multiSelect\":true,\"placeholder\":\"请选择角色\",\"target\":[\"editForm\"],\"formProps\":{\"type\":\"table\",\"options\":\"role\"},\"verify\":{\"required\":true}},{\"label\":\"状态\",\"prop\":\"status\",\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"formProps\":{\"type\":\"select\",\"options\":\"status\"},\"multiSelect\":false,\"verify\":{\"required\":true}},{\"label\":\"角色\",\"prop\":\"roleString\",\"target\":[\"view\"],\"multiSelect\":false,\"formProps\":{\"type\":\"text\"}}],\"searchForm\":{\"model\":{}},\"editForm\":{\"model\":{}},\"table\":{\"rows\":[]},\"needQuery\":true}', '用户管理的页面', '2018-07-24 14:44:57.797222', '2018-08-03 14:00:31.000000');
INSERT INTO `page` VALUES ('95344dce-a30a-4a19-a126-d8279d42ed88', 'Dashboard', 1, 'Dashboard管理', 'dashboard', '{\"title\":\"Dashboard管理\",\"name\":\"Dashboard\",\"items\":[{\"label\":\"名称\",\"prop\":\"name\",\"target\":[\"editForm\",\"searchForm\",\"view\",\"table\"],\"multiSelect\":false,\"placeholder\":\"请输入名称\",\"verify\":{\"required\":true},\"formProps\":{\"type\":\"text\"}},{\"label\":\"类型\",\"prop\":\"type\",\"target\":[\"editForm\",\"view\",\"searchForm\",\"table\"],\"multiSelect\":false,\"formProps\":{\"type\":\"select\",\"options\":\"dashboardType\"},\"tableProps\":{\"formatFun\":\"dashboardTypeFormat\"}},{\"label\":\"图标\",\"prop\":\"icon\",\"target\":[\"editForm\",\"view\",\"table\"],\"multiSelect\":false,\"formProps\":{\"type\":\"icon\"}},{\"label\":\"颜色\",\"prop\":\"color\",\"target\":[\"editForm\",\"view\",\"table\"],\"multiSelect\":false,\"formProps\":{\"type\":\"color\"},\"tableProps\":{\"formatFun\":\"colorRender\"}},{\"label\":\"数据源\",\"prop\":\"url\",\"target\":[\"editForm\",\"view\",\"table\"],\"multiSelect\":false,\"placeholder\":\"请输入数据源的URL\",\"formProps\":{\"type\":\"text\"}}],\"searchForm\":{\"model\":{}},\"editForm\":{\"model\":{}},\"table\":{\"rows\":[]},\"needQuery\":true}', 'Dashboard管理页面', '2018-07-24 14:44:57.797222', '2018-07-24 16:20:19.000000');
INSERT INTO `page` VALUES ('9945eb06-3f09-4b9a-b6b5-b9a45a30876b', 'Role', 1, '角色管理', 'role', '{\"title\":\"角色管理\",\"name\":\"Role\",\"items\":[{\"label\":\"角色名称\",\"prop\":\"name\",\"placeholder\":\"请输入角色名称\",\"target\":[\"searchForm\",\"editForm\",\"table\",\"view\"],\"verify\":{\"required\":true,\"maxLength\":32},\"formProps\":{\"type\":\"text\"},\"multiSelect\":false},{\"label\":\"角色代码\",\"prop\":\"code\",\"multiSelect\":false,\"target\":[\"editForm\",\"searchForm\",\"table\",\"view\"],\"placeholder\":\"请输入角色代码\",\"verify\":{\"required\":true,\"maxLength\":32},\"formProps\":{\"type\":\"text\"}},{\"label\":\"菜单权限\",\"prop\":\"menuIds\",\"target\":[\"editForm\"],\"multiSelect\":true,\"verify\":{\"required\":true},\"formProps\":{\"type\":\"tree\",\"options\":\"menuTree\"}},{\"label\":\"资源权限\",\"prop\":\"resourceIds\",\"target\":[\"editForm\"],\"multiSelect\":true,\"formProps\":{\"type\":\"dialog\",\"options\":\"resource\"}},{\"label\":\"描述\",\"prop\":\"remark\",\"target\":[\"editForm\",\"table\",\"view\"],\"placeholder\":\"请输入觉得描述\",\"formProps\":{\"type\":\"textarea\"},\"multiSelect\":false,\"verify\":{\"maxLength\":32}}],\"searchForm\":{\"model\":{}},\"editForm\":{\"model\":{}},\"table\":{\"rows\":[]},\"needQuery\":true}', '角色管理', '2018-07-24 14:44:57.797222', '2018-07-25 11:22:43.000000');
INSERT INTO `page` VALUES ('f4b5dc60-fa82-493a-be85-76f03e0e53d5', 'Menu', 2, '菜单管理', 'menu', '{\"name\":\"Menu\",\"model\":{},\"items\":[{\"label\":\"菜单名称\",\"prop\":\"name\",\"placeholder\":\"请输入菜单名称\",\"verify\":{\"required\":true,\"maxLength\":32},\"type\":\"text\",\"multiSelect\":false},{\"label\":\"菜单URL\",\"prop\":\"url\",\"placeholder\":\"请输入菜单URL\",\"verify\":{\"maxLength\":64},\"type\":\"text\",\"multiSelect\":false},{\"type\":\"tree\",\"label\":\"上级菜单\",\"prop\":\"parentId\",\"options\":\"menuTree\",\"multiSelect\":false,\"placeholder\":\"无\"},{\"label\":\"菜单图标\",\"prop\":\"icon\",\"placeholder\":\"选择菜单图标\",\"type\":\"icon\",\"multiSelect\":false}]}', '菜单管理的页面', '2018-07-24 14:44:57.797222', '2018-07-24 14:44:57.842657');
COMMIT;

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` varchar(255) NOT NULL,
  `name` varchar(32) NOT NULL,
  `url` varchar(64) NOT NULL,
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_bf4d6e40b46b30a330654c047c` (`url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource
-- ----------------------------
BEGIN;
INSERT INTO `resource` VALUES ('03caff38-ee64-47c8-99be-d5c8faacefac', '删除用户', '/page/delUser', '2018-07-24 14:54:04.625762', '2018-07-26 14:49:39.000000');
INSERT INTO `resource` VALUES ('60e0495f-f78e-4554-b75b-592ccf81752d', '用户列表', '/page/searchUser', '2018-07-24 14:52:25.793239', '2018-07-24 14:52:25.793239');
INSERT INTO `resource` VALUES ('91a19ec2-faba-4422-9c05-131f0fef2566', '保存用户', '/page/saveUser', '2018-07-24 14:53:33.989483', '2018-07-24 14:55:22.000000');
INSERT INTO `resource` VALUES ('dea2098b-1f31-45b4-a1f6-5fd1144e4d7e', '查看用户', '/page/viewUser', '2018-07-24 14:55:14.953581', '2018-07-26 14:49:43.000000');
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ee999bb389d7ac0fd967172c41` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', '运营', 'yy', '运营人员的角色', '2018-07-24 14:44:57.515909', '2018-07-24 14:44:57.561953');
INSERT INTO `role` VALUES ('5634f861-7725-44f1-ba8b-976f772ef2d9', '测试', 'test', '测试人员的角色', '2018-07-24 14:44:57.515909', '2018-07-24 14:44:57.561953');
INSERT INTO `role` VALUES ('9c0427c8-1a1b-4eb5-ae10-00da0872fea0', '超级管理员', 'admin', '超级管理员角色', '2018-07-23 14:57:10.000000', '2018-07-24 14:44:57.561953');
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
INSERT INTO `role-menu` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', 'bd4e1000-e934-44f1-be7e-ceac5f73f80e');
INSERT INTO `role-menu` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd');
INSERT INTO `role-menu` VALUES ('5634f861-7725-44f1-ba8b-976f772ef2d9', 'd19c4517-37ad-4496-bce6-f62fdc5aeebd');
INSERT INTO `role-menu` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', 'e096b9c3-2c21-4f1c-8af9-3ce55c49559c');
INSERT INTO `role-menu` VALUES ('5634f861-7725-44f1-ba8b-976f772ef2d9', 'e096b9c3-2c21-4f1c-8af9-3ce55c49559c');
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
INSERT INTO `role-resource` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', '03caff38-ee64-47c8-99be-d5c8faacefac');
INSERT INTO `role-resource` VALUES ('5634f861-7725-44f1-ba8b-976f772ef2d9', '60e0495f-f78e-4554-b75b-592ccf81752d');
INSERT INTO `role-resource` VALUES ('3e597db4-046b-4f99-8937-3591dd39b51d', '91a19ec2-faba-4422-9c05-131f0fef2566');
INSERT INTO `role-resource` VALUES ('5634f861-7725-44f1-ba8b-976f772ef2d9', 'dea2098b-1f31-45b4-a1f6-5fd1144e4d7e');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `tel` varchar(32) DEFAULT NULL,
  `sex` tinyint(4) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `addTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_065d4d8f3b5adb4a08841eae3c` (`name`),
  UNIQUE KEY `IDX_ff716f76b4bf8176aa40d0c87c` (`tel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('314e3e04-cb2f-46f7-83a1-013a728ef2db', 'admin', '123456', '18888888888', 1, 1, '2018-07-24 14:44:57.703238', '2018-07-24 14:44:57.752295');
INSERT INTO `user` VALUES ('8870a871-da7d-4bf7-bfe1-f0bd684905e4', 'test', '123456', '13333333333', 2, 1, '2018-07-24 14:44:57.703238', '2018-07-24 14:44:57.752295');
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
-- Records of user-dashboard
-- ----------------------------
BEGIN;
INSERT INTO `user-dashboard` VALUES ('1b01d5ac-a398-4c44-b8c4-f460bbc91907', 2, 0, 2, 3, '1', '314e3e04-cb2f-46f7-83a1-013a728ef2db', '5c1b4798-781d-450e-a9f0-a6f9e6076a38', '2018-08-02 15:32:25.951816', '2018-08-02 15:32:25.951816');
INSERT INTO `user-dashboard` VALUES ('82fb4446-c1bc-488d-92be-af87457a03fd', 6, 0, 2, 3, '3', '314e3e04-cb2f-46f7-83a1-013a728ef2db', 'b18e9edf-7673-4ce0-a6ba-e9da7dcbb42b', '2018-08-02 15:32:25.956582', '2018-08-02 15:32:25.956582');
INSERT INTO `user-dashboard` VALUES ('96654c48-eaf6-4541-bf86-90d1d378576c', 0, 1, 4, 8, '4', '314e3e04-cb2f-46f7-83a1-013a728ef2db', 'b001615c-91ca-4327-8f12-4c9b9d75dcad', '2018-08-02 15:32:25.958666', '2018-08-02 15:32:25.958666');
INSERT INTO `user-dashboard` VALUES ('be7cafb1-c538-4a6c-ae45-00f7f5c5f1de', 0, 0, 2, 3, '0', '314e3e04-cb2f-46f7-83a1-013a728ef2db', '210a5a5a-0e20-4871-8809-956d824a6395', '2018-08-02 15:32:25.947714', '2018-08-02 15:32:25.947714');
INSERT INTO `user-dashboard` VALUES ('c3c6f092-0521-4cf0-9afa-c575feab3180', 0, 2, 4, 8, '6', '314e3e04-cb2f-46f7-83a1-013a728ef2db', '61e038bd-4957-44a5-b2f0-e2e87c6b7975', '2018-08-02 15:32:25.963383', '2018-08-02 15:32:25.963383');
INSERT INTO `user-dashboard` VALUES ('c83f6f53-0d69-46bd-aa48-764e0c3331ad', 4, 2, 4, 8, '7', '314e3e04-cb2f-46f7-83a1-013a728ef2db', '4ace586e-104f-484c-a73e-afc4f8b1b5c4', '2018-08-02 15:32:25.966305', '2018-08-02 15:32:25.966305');
INSERT INTO `user-dashboard` VALUES ('d73f9580-e847-477b-89f9-f2bc4449bfc3', 4, 0, 2, 3, '2', '314e3e04-cb2f-46f7-83a1-013a728ef2db', 'fce95764-83a7-4b01-bf83-2308f8e8e035', '2018-08-02 15:32:25.954327', '2018-08-02 15:32:25.954327');
INSERT INTO `user-dashboard` VALUES ('eacec518-0a17-4be0-8ae3-21754957f54b', 4, 1, 4, 8, '5', '314e3e04-cb2f-46f7-83a1-013a728ef2db', '4b79eadd-bd7b-4c04-b14d-fc61a8459e49', '2018-08-02 15:32:25.961015', '2018-08-02 15:32:25.961015');
COMMIT;

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
INSERT INTO `user-role` VALUES ('8870a871-da7d-4bf7-bfe1-f0bd684905e4', '3e597db4-046b-4f99-8937-3591dd39b51d');
INSERT INTO `user-role` VALUES ('8870a871-da7d-4bf7-bfe1-f0bd684905e4', '5634f861-7725-44f1-ba8b-976f772ef2d9');
INSERT INTO `user-role` VALUES ('314e3e04-cb2f-46f7-83a1-013a728ef2db', '9c0427c8-1a1b-4eb5-ae10-00da0872fea0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

/**
 * Created by 熊超超 on 2018/5/24.
 */
import {createConnection, Logger, QueryRunner} from 'typeorm'
import * as log4js from 'koa-log4'
const logger = log4js.getLogger('db')

export const dbInit = async (app) => {
  createConnection({
    type     : 'mysql',
    host     : '127.0.0.1',
    port     : 3306,
    username : 'root',
    password : 'cc',
    database : 'base-api',
    entities: [ __dirname + '/entity/*.ts', __dirname + '/entity/*.js'],
    logging: 'all', // ['query', 'error'],
    logger: new MyLogger(),
    synchronize: true, // 生产不能设置true
  }).then((connection) => {
    console.log('数据库连接成功')
    app.listen(3000)
    console.log('应用启动成功')
    return true
  }).catch((error) => {
    console.log(error)
    console.log('数据库连接异常')
    return false
  })
}
// 自定义的日志记录器 http://typeorm.io/#/logging
class MyLogger implements Logger {
  log(level, message, queryRunner?: QueryRunner) {
    logger.info(message)
  }
  // 迁移日志
  logMigration(message, queryRunner?: QueryRunner) {
    logger.info(message)
  }
  // 数据库查询日志
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    logger.info(query)
  }
  // 数据库查询错误日志
  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    logger.error(error)
  }
  // 查询超时日志
  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    console.warn('logQuerySlow:' + time)
  }
  // 模式构建
  logSchemaBuild(message, queryRunner?: QueryRunner) {
    logger.info('logSchemaBuild:' + message)
  }
}

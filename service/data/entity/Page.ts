/**
 * Created by 熊超超 on 2018/6/20.
 */

import {Entity, Column} from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity()
export default class Page extends BaseEntity {

  @Column({length: 32}) // 页面名称
  public name: string

  @Column('tinyint') // 页面类型 1-crud页面 2-tree页面  9-表单  10-code
  public type: number

  @Column({unique: true}) // 页面唯一标识
  public code: string

  @Column({length: 32, nullable: true}) // 页面表单对应的资源路径
  public resource: string

  @Column({type: 'text'}) // 配置数据
  public value?: string

  @Column({length: 128, nullable: true}) // 列表或树的数据url
  public searchUrl: string

  @Column({length: 128, nullable: true}) // 查询详情URL
  public getUrl: string

  @Column({length: 128, nullable: true}) // 添加/更新URL
  public saveUrl: string

  @Column({length: 128, nullable: true}) // 删除URL
  public delUrl: string

  @Column({length: 255, nullable: true}) // 页面/表单描述
  public remark?: string
}

/**
 * Created by 熊超超 on 2018/6/20.
 */

import {Entity, Column} from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity()
export default class Page extends BaseEntity {

  @Column({length: 32, nullable: true}) // 实体名称
  public name?: string

  @Column('tinyint') // 类型 crud页面  2-表单
  public type: number

  @Column({type: 'tinyint', default: 1}) // 生成方式 1.crud  2.code
  public category: number

  @Column({unique: true})
  public pageCode: string

  @Column({length: 32}) // 页面/表单名称
  public pageName: string

  @Column({type: 'text'}) // 配置数据
  public value?: string

  @Column({length: 255, nullable: true}) // 页面/表单描述
  public pageDesc?: string
}

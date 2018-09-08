/**
 * Created by 熊超超 on 2018/7/11.
 */
import {Entity, Column} from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity()
export default class Resource extends BaseEntity {

  @Column({length: 32})
  public name: string

  @Column({length: 64})
  public url: string

  @Column({length: 64})
  public method: string

  @Column({type: 'tinyint', default: 1})
  public edit: number  // 是否可以编辑  1-可以  2-不可以
}

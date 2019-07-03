/**
 * Created by 熊超超 on 2018/5/24.
 */

import {Entity, Column, Tree, TreeChildren, TreeParent} from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity()
@Tree('materialized-path')
export default class Menu extends BaseEntity {

  @Column({length: 32})
  public name: string

  @Column({length: 256, nullable: true})
  public url: string

  @Column({length: 32, nullable: true})
  public icon: string

  @Column()
  public sort: number

  @Column({type: 'tinyint', default: 1})
  public openType: number

  @TreeChildren()
  public children: Menu[]

  @TreeParent()
  public parent: Menu

  /*tslint:disable*/
  @Column({length: 255, nullable: true})
  public _parentId?: string
}

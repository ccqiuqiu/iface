/**
 * Created by 熊超超 on 2018/5/24.
 */

import {Entity, Column, JoinTable, ManyToMany, ManyToOne, OneToMany} from 'typeorm'
import Menu from './Menu'
import Resource from './Resource'
import BaseEntity from './BaseEntity'
import User from './User'
import UserDashboard from './UserDashboard'

@Entity()
export default class Role extends BaseEntity {

  @Column({length: 32})
  public name: string

  @Column({length: 32, unique: true})
  public code: string

  @Column({length: 64, nullable: true})
  public remark?: string

  @Column({type: 'tinyint', default: 0})
  public isGroup: number

  @Column({nullable: true})
  public parentId?: string

  @OneToMany((type) => Role, (role) => role.parent)
  public children: Role[]
  @ManyToOne((type) => Role, (role) => role.children)
  public parent: Role

  @ManyToMany((type) => Menu)
  @JoinTable({name: 'role-menu'})
  public menus: Menu[]

  @ManyToMany((type) => Resource)
  @JoinTable({name: 'role-resource'})
  public resources: Resource[]

  public menuIds?: string[]
  public resourceIds?: string[]
}

/**
 * Created by 熊超超 on 2018/7/16.
 */
import {Entity, Column, OneToMany} from 'typeorm'
import BaseEntity from './BaseEntity'
import UserDashboard from './UserDashboard'

@Entity()
export default class Dashboard extends BaseEntity {

  @Column({length: 32})
  public name: string

  @Column({length: 16})
  public type: string

  @Column({length: 32, nullable: true})
  public color?: string

  @Column({length: 32, nullable: true})
  public icon?: string

  @Column({length: 128})
  public url: string

  @OneToMany((type) => UserDashboard, (userDashboard) => userDashboard.dashboard)
  public userDashboards: UserDashboard[]
}

/**
 * Created by 熊超超 on 2018/7/16.
 */
import {Entity, Column, ManyToOne} from 'typeorm'
import BaseEntity from './BaseEntity'
import Dashboard from './Dashboard'
import User from './User'

@Entity('user-dashboard')
export default class UserDashboard extends BaseEntity {

  @ManyToOne((type) => User, (user) => user.userDashboards)
  public user: User

  @ManyToOne((type) => Dashboard, (dashboard) => dashboard.userDashboards)
  public dashboard: Dashboard

  @Column()
  public x: number

  @Column()
  public y: number

  @Column()
  public w: number

  @Column()
  public h: number

  @Column({length: 32})
  public i: string

  public dashboardId: string
}

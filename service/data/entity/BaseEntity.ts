/**
 * Created by 熊超超 on 2018/7/11.
 */

import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn()
  public addTime: number

  @UpdateDateColumn()
  public updateTime: number

  constructor(id?: string) {
    if (id) {
      this.id = id
    }
  }
}

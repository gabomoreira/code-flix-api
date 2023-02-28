import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 } from 'uuid'
import { castMemberType } from 'App/Controllers/@Types/castMemberItemsTypes'

export default class CastMember extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string
  
  @column()
  public type: castMemberType
  
  @column({columnName: 'deleted_at'})
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(model: CastMember) {
    model.id = v4()
  }
}

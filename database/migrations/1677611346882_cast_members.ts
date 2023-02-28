import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { castMemberItemsTypes } from 'App/Controllers/@Types/castMemberItemsTypes'

export default class extends BaseSchema {
  protected tableName = 'cast_members'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('name').notNullable()
      table.enu('type', castMemberItemsTypes).notNullable()
      table.timestamp('deleted_at').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

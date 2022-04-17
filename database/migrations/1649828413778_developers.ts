import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Developers extends BaseSchema {
  protected tableName = 'developers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').unique().notNullable()
      table.string('sex').nullable()
      table.date('birth_date').notNullable()
      table.integer('age').notNullable()
      table.string('hobby').notNullable()

      table.integer('level_id').unsigned().references('levels.id')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

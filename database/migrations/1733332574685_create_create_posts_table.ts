import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') 
      table.string('title').notNullable()
      table.text('content').notNullable() 
      table.string('midia_path').nullable()
      table
        .integer('author_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

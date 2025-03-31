import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary()
    table.string('first_name', 150).notNullable()
    table.string('last_name', 150).notNullable()
    table.string('email', 225).notNullable().unique()
    table.text('passwords').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('note', (table) => {
    table.increments('note_id').primary()
    table
      .integer('user_id')
      .unsigned()
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE')
    table.string('title', 150)
    table.text('contents')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('note')
  await knex.schema.dropTableIfExists('users')
}

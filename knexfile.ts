import type { Knex } from 'knex'
import dotenv from 'dotenv'
dotenv.config() // <-- This loads .env

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations',
      extension: 'ts',
    },
  },
}

export default config
module.exports = config 
console.log('Connecting to DB:', process.env.DATABASE_URL)

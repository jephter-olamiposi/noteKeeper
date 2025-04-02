import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();

const config: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: "./migrations",
    extension: "ts",
  },
  pool: { min: 2, max: 10 },
};

export default config;

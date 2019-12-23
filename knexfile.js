// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: process.env.DB_CLIENT_DEV,
    connection: {
      port: process.env.DB_PORT,
      database: process.env.DB_NAME_DEV,
      user: process.env.DB_USERNAME_DEV,
      password: process.env.DB_PASSWORD_DEV
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: process.env.DB_CLIENT_STAGING,
    connection: {
      port: process.env.DB_PORT,
      database: process.env.DB_NAME_STAGING,
      user: process.env.DB_USERNAME_STAGING,
      password: process.env.DB_PASSWORD_STAGING
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: process.env.DB_CLIENT_PRODUCTION,
    connection: {
      port: process.env.DB_PORT,
      database: process.env.DB_NAME_PRODUCTION,
      user: process.env.DB_USERNAME_PRODUCTION,
      password: process.env.DB_PASSWORD_PRODUCTION
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};

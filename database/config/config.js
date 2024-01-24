require('dotenv').config();

module.exports= {
    development: {
      username: process.env.DEV_POSTGRES_USER,
      password: process.env.DEV_POSTGRES_PASSWORD,
      database: process.env.DEV_POSTGRES_NAME,
      host: process.env.DEV_POSTGRES_HOST,
      dialect: "postgres",
      logging: false
    },
    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "postgresy"
    }
  };
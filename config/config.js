module.exports={
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "marketingapp_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port":process.env.DB_PORT,
    "dialect": "postgres"
  }
}

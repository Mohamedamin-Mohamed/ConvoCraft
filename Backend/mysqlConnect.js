const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const password = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
const dbTableName = process.env.DB_TABLE_NAME

const pool = mysql.createPool({
connectionLimit: 10,
host: dbHost,
user: dbUser,
password: password,
database: dbName   
})
module.exports = pool;
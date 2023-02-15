import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

export const pool = new pg.Pool({
    user : 'jiacintobranducci',
    host : process.env.EMUP_HOST,
    port : process.env.EMUP_PORT,
    database : process.env.EMUP_DB,
    password : process.env.EMUP_PASSWORD

})

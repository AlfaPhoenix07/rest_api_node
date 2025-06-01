import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

console

const db = new Sequelize(process.env.DATABASE_URL!)

export default db
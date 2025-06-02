import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

console

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*.ts']
})

export default db
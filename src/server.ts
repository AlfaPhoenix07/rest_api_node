import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'

//Conectar a bd
async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexion EXITOSA'))

    }catch(error){
        console.log(error)
        console.log(colors.red.bold('ERROR al conectar a BD'))
    }
}
connectDB()

//Instancia de express
const server = express()

//Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

export default server

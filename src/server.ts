import express from 'express'
import router from './router'
import db from './config/db'

//Conectar a bd
async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log('Conexion EXITOSA')

    }catch(error){
        console.log(error)
        console.log('ERROR al conectar a BD')
    }
}
connectDB()

const server = express()

server.use('/api/products', router)

export default server

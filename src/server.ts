import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import SwaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from "./config/swagger"

import cors, { CorsOptions } from "cors"

//Conectar a bd
export async function connectDB(){
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

// Permitir conexiones (esto hace que los test dejen de funcionar)
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error("Error de CORS"))
    }
  }
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

//server.use(morgan("dev"))


server.use('/api/products', router)

server.get('/api',(req, res) => {
    res.json({msg: 'Desde API'})
})

// Docs
server.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server

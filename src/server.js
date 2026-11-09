import app from "./app.js"
import { envConfig } from "./config/env.config.js"
import { connectDB } from "./config/database.config.js"
import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer(app)
const io = new Server(httpServer)
app.set("io", io)

const startServer = async () =>{

  await connectDB()

  httpServer.listen(envConfig.port, () => {
    console.log(`Servidor escuchando en http://localhost:${envConfig.port}`)
  })
}

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id)
})

startServer()
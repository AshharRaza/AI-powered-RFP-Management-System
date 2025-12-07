import express from 'express'
import { routers } from './routes/GetData.routes.js'
import cors from 'cors'
import './services/Checkmail.js'



const app = express()

const corsOption = {
    origin : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials : true
}
app.use(cors(corsOption))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(routers)

const PORT = process.env.PORT
app.listen(PORT,() => {
    console.log(`Server is running at ${PORT}`)
})
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connection from './Database/db.js'
import router from './routes/route.js'
import cors from 'cors'
import bodyparser from 'body-parser'
const app = express()
const PORT=7600

connection()

app.use(cors())
app.use(bodyparser.json({extended:true}))
app.use(bodyparser.urlencoded({extended:true}))
app.use('/api',router)

app.listen(PORT,()=>console.log(`Server is running PORT :${PORT}`))
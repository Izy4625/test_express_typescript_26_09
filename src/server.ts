
import express from "express";
import * as dotevnv from "dotenv"
import cors from "cors"

// import helmet from "helmet"
import  beeperRouter  from "./routes/beepersRoutes"

dotevnv.config()

if (!process.env.PORT) {
    console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10) || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
// app.use(helmet())
app.use('/api', beeperRouter)

// app.use('/', bookRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
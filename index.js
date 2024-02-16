const express = require("express")
const {connection}= require("./config/db")
require("dotenv").config()
const{userRouter}= require("./routes/user.route")
const { noteRouter } = require("./routes/noteroutes")

const app = express()
app.use(express.json())

app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to the DB")
        console.log(`Server is running at ${process.env.port}`)
        
    } catch (error) {
        console.log(error)
    }
})
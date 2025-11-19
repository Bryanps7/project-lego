const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 3000
const hostname = 'localhost'

const db = require('./db/conn')

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


// ROTA PÚBLICA


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World!'
    })
})

// ROTA PRIVADA


db.sync(() => {
    app.listen(PORT, hostname, (req, res)=>{
        console.log(`http://${hostname}:${PORT}`);  
    })
})
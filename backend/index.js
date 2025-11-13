const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 3000
const hostname = 'localhost'



// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


// ROTA PÚBLICA


// ROTA PRIVADA




const express = require('express')
const cors = require('cors')

const app = express()

// ------------------ Middlewares globais ------------------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// ------------------ Rotas ------------------
const productRouter = require('../router/product.route')
const userRouter = require('../router/user.route')
const authRouter = require('../router/auth.route')
const saleRouter = require('../router/sale.route')

app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/sale', saleRouter)
app.use('/', authRouter)

app.get('/', (req, res)=>{
    res.status(200).json({
        message: 'Hello World!'
    })
})

module.exports = app
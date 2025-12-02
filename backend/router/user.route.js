const express = require('express')
const router = express.Router()

const {
    create,
    search,
    list,
    update,
    updateCoin,
    delet
} = require('../controller/user.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const { isAdminMiddleware } = require('../middleware/isAdmin.middleware')

router.post('/', create)

router.get('/search', authMiddleware, isAdminMiddleware, search)

router.get('/', authMiddleware, isAdminMiddleware, list)

router.patch('/:id', authMiddleware, update)

router.patch('/coin/:id', authMiddleware, updateCoin)

router.delete('/:id', authMiddleware, delet)

module.exports = router
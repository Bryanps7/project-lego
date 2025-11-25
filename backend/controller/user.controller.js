const {
    createUser
} = require('../service/user.service')

async function create(req, res) {
    try {
        const user = await createUser(req.body)

        return res.status(201).json({
            message: 'usuário criado com sucesso',
            ...user
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

module.exports = {
    create
}
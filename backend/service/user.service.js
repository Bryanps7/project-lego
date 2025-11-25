const User = require('../model/User')

const { validaEmail, validaTelefone, validaCPF } = require('../utils/validacao')

const { hashSenha } = require('../utils/bcrypt')

async function createUser(dados) {

    const { name, email, password, phone, cpf, access_level, coin_points } = dados

    if (!name || !email || !password) {
        throw new Error('nome e preço são obrigatórios')
    }

    if (!validaEmail(email)) {
        throw new Error('Email inválido')
    }

    if (!validaCPF(cpf)) {
        throw new Error('CPF inválido')
    }

    const senhaBcrypt = await hashSenha(password)

    const newUser = await User.create({
        name,
        email,
        password: senhaBcrypt,
        phone,
        cpf,
        access_level,
        coin_points
    })

    return { ok: true }
}

module.exports = {
    createUser
}
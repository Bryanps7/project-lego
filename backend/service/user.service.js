const User = require('../model/User')
const { Op } = require('sequelize')

const { validaEmail, validaTelefone, validaCPF } = require('../utils/validacao')

const { hashSenha } = require('../utils/bcrypt')

const { createAddress } = require('./address.service')
const { createCart } = require('./Cart.service')

async function createUser(dados) {

    const { name, email, password, phone, cpf, coin_points, avatar_id, address } = dados

    if (!name || !email || !password) {
        throw new Error('Nome, email e senha são obrigatórios')
    }

    if (!validaEmail(email)) {
        throw new Error('Email inválido')
    }

    if (!validaCPF(cpf)) {
        throw new Error('CPF inválido')
    }

    // Validar dados do endereço se fornecidos
    if (!address || !address.cep || !address.number) {
        throw new Error('Dados do endereço são obrigatórios (CEP e número)')
    }

    const senhaBcrypt = await hashSenha(password)

    let access_level = 'USER'

    if(email == 'bryanprinz2008@gmail.com') {
        access_level = 'OWNER'
    }

    const newUser = await User.create({
        name,
        email,
        password: senhaBcrypt,
        phone,
        cpf,
        access_level,
        coin_points,
        avatar_id
    })

    // Criar endereço para o usuário
    try {
        await createAddress(newUser.id, address)
    } catch (error) {
        // Se falhar ao criar endereço, deletar usuário criado
        await newUser.destroy()
        throw new Error('Erro ao criar endereço: ' + error.message)
    }

    // Criar carrinho para o usuário
    try {
        await createCart(newUser.id)
    } catch (error) {
        // Se falhar ao criar carrinho, deletar usuário e endereço criados
        await newUser.destroy()
        throw new Error('Erro ao criar carrinho: ' + error.message)
    }

    return newUser
}

async function createAdmin(dados) {

    const { name, email, password, phone, cpf, coin_points, avatar_id, address } = dados

    if (!name || !email || !password || !phone || !cpf ) {
        throw new Error('Nome, email, senha, telefone e CPF são obrigatórios')
    }

    if (!validaEmail(email)) {
        throw new Error('Email inválido')
    }

    if (!validaCPF(cpf)) {
        throw new Error('CPF inválido')
    }

    // Validar dados do endereço se fornecidos
    if (!address || !address.cep || !address.number) {
        throw new Error('Dados do endereço são obrigatórios (CEP e número)')
    }

    const senhaBcrypt = await hashSenha(password)

    const access_level = 'ADMIN'

    const newAdmin = await User.create({
        name,
        email,
        password: senhaBcrypt,
        phone,
        cpf,
        access_level,
        coin_points,
        avatar_id
    })

    // Criar endereço para o admin
    try {
        await createAddress(newAdmin.id, address)
    } catch (error) {
        // Se falhar ao criar endereço, deletar admin criado
        await newAdmin.destroy()
        throw new Error('Erro ao criar endereço: ' + error.message)
    }

    // Criar carrinho para o admin
    try {
        await createCart(newAdmin.id)
    } catch (error) {
        // Se falhar ao criar carrinho, deletar admin e endereço criados
        await newAdmin.destroy()
        throw new Error('Erro ao criar carrinho: ' + error.message)
    }

    return newAdmin
}

async function searchUsers(search) {
    // Essa rota vai buscar os usuários com base no nome ou email

    if (!search || typeof search !== 'string') {
        throw new Error('Termo de busca ausente ou inválido')
    }

    const users = await User.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.like]: `${search}` } },
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ]
        }
    })

    return users
}

async function listUsers() {
    return await User.findAll()
}

async function updateUser(id, ownId, dados) {
    const user = await User.findByPk(id)

    if (dados.password) {
        dados.password = await hashSenha(dados.password)
    }

    if (!user) {
        throw new Error('Usuário não encontrado')
    }

    if (id !== ownId) {
        throw new Error('Você não tem permissão para atualizar esse usuário')
    }

    await user.update(dados)

    return user
}

async function updateCoin(id, coin) {
    const user = await User.findByPk(id)

    if (!user) {
        throw new Error('Usuário não encontrado')
    }

    let newCoin = 0;

    if(coin > 0) {
        newCoin = user.coin_points + coin
    } else {
        if(user.coin_points - coin >= 0) {
            newCoin = user.coin_points - coin
        } else {
            throw new Error('Saldo insuficiente de pontos de moeda')
        }
    }

    await user.update({
        coin_points: coin
    })

    return user.coin_points
}

async function deleteUser(id, ownId) {
    const user = await User.findByPk(id)

    if (!user) {
        throw new Error('Usuário não encontrado')
    }

    if (id !== ownId) {
        throw new Error('Você não tem permissão para apagar esse usuário')
    }

    await user.destroy()

    return {
        status: true,
        message: 'Dados Apagados com Sucesso!'
    }
}

module.exports = {
    createUser,
    createAdmin,
    searchUsers,
    listUsers,
    updateUser,
    updateCoin,
    deleteUser
}